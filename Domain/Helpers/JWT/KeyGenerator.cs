using System.Security.Cryptography;
using System.Text;

namespace Domain.Helpers.JWT
{
    public static class KeyGenerator
    {
        public static string GenerateAccessKey()
        {
            RandomNumberGenerator rng = RandomNumberGenerator.Create();

            byte[] data = new byte[32];
            rng.GetBytes(data);

            return Convert.ToBase64String(data);
        }

        /// <summary>
        /// Генерирует подпись
        /// </summary>
        /// <param name="timestamp">Дата и время формирования запроса</param>
        /// <param name="clientId">Id клиента</param>
        /// <param name="key">Закрытый ключ</param>
        /// <returns></returns>
        public static byte[] GenerateSignature(string timestamp, string clientId, string key)
        {
            // делаем конкатенацию id клиента и времени формирования запроса в одну строку для создания хэша
            // важен порядок: сначала в итоговый массив копируем timestamp, затем - clientId
            string clientIdAndTimestampCombined = $"{timestamp}{clientId}";

            // переводим закрытый ключ в набор байтов
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            // высчитываем хэш
            var hasher = new HMACSHA1(keyBytes);
            return hasher.ComputeHash(Encoding.UTF8.GetBytes(clientIdAndTimestampCombined));
        }
    }
}
