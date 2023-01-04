using System.Net;

namespace Domain.Errors
{
    public class RestException: Exception
    {
        public RestException(HttpStatusCode code, object errors = null, object dataObject = null)
        {
            Code = code;
            Errors = errors;
            if ((errors is string) && (errors != null))
                Message = errors.ToString();
            DataObject = dataObject;
        }

        public RestException(HttpStatusCode code, Exception e)
        {
            Code = code;
            Errors = new { Exception = e.Message, InnerException = e.InnerException?.Message };
            Message = e.Message;
        }

        public override string Message { get; }
        public HttpStatusCode Code { get; }
        public object Errors { get; }
        public object DataObject { get; set; }
    }
}
