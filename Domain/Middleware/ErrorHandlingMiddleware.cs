using Domain.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;

namespace Domain.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                context.Request.EnableBuffering();
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            object code = null;
            object errors = null;
            object dataObject = null;
            object innerException = null;
            object message = null;
            switch (ex)
            {
                case RestException re:
                    _logger.LogError(re, re.Message);
                    code = re.Code;
                    errors = re.Errors;
                    message = re.Message;
                    dataObject = re.DataObject;
                    context.Response.StatusCode = (int)re.Code;
                    break;
                case Exception e:
                    _logger.LogError(e, e.Message);
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    message = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    code = HttpStatusCode.InternalServerError;
                    innerException = e.InnerException;
                    break;
            }

            context.Response.ContentType = "application/json";
            if (errors != null)
            {
                var result = JsonConvert.SerializeObject(new
                {
                    code,
                    message,
                    errors,
                    dataObject,
                    innerException
                });
                await context.Response.WriteAsync(result);
            }
        }
    }
}
