using Domain.Models.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Domain.Helpers.JWT
{
    public class JwtGenerator
    {
        private readonly SymmetricSecurityKey _key;
        private readonly int _expirationTime;

        public JwtGenerator(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("Tokens")["TokenKey"]));
            _expirationTime = short.Parse(config.GetSection("Tokens")["ExpirationTime"]);
        }

        public string CreateTokenWithRoles(User user, List<string> roles)
        {
            var notBefore = DateTime.UtcNow;
            var expirationTime = DateTime.UtcNow.AddMinutes(_expirationTime);
            var issuedAt = DateTime.UtcNow;
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = notBefore,
                IssuedAt = issuedAt,
                Expires = expirationTime,
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken() => KeyGenerator.GenerateAccessKey();

        public void ValidateToken(string token)
        {
            try
            {
                var validationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                var handler = new JwtSecurityTokenHandler();
                ClaimsPrincipal principal;

                principal = handler.ValidateToken(token, validationParameters, out SecurityToken validToken);
                JwtSecurityToken validJwt = validToken as JwtSecurityToken;

                if (validJwt == null || !validJwt.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase))
                    throw new Exception("Invalid JWT");
            }
            catch (SecurityTokenExpiredException)
            {
                throw new Exception("Token expired");
            }
        }

        public string GetUserameFromExpiredToken(string token)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false
            };

            var handler = new JwtSecurityTokenHandler();

            var principal = handler.ValidateToken(token, validationParameters, out SecurityToken validToken);
            return principal.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}
