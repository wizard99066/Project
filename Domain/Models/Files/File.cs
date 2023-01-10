namespace Domain.Models.Files
{
    public class File : IId
    {
        /// <summary>
        /// Название файла
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Содержимое файла
        /// </summary>
        public byte[] Content { get; set; }

        /// <summary>
        /// Тип контента
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Расширение файла
        /// </summary>
        public string FileExtension { get; set; }

        /// <summary>
        /// Объём файла
        /// </summary>
        public long FileLength { get; set; }

        /// <summary>
        /// Дата загрузки файла
        /// </summary>
        public DateTime UploadDate { get; set; }
    }
}
