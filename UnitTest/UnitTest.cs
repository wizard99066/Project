using Domain.Models.Books;
using Domain.Services;

namespace UnitTest
{
    [TestClass]
    public class UnitTest: Context
    {
        [TestMethod]
        public void AddGenre()
        {
            var service = new CRUDService<Genre>(AppDbContext);
            Assert.IsTrue(service.Add(new Genre { Name = "����� ����" }));
        }

        [TestMethod]
        public void UpdateGenre()
        {
            var service = new CRUDService<Genre>(AppDbContext);
            var genre = service.Read(14);
            genre.Name = "�������� ������";
            Assert.IsTrue(service.Update(genre));
        }

        [TestMethod]
        public void CheckGenre()
        {
            var service = new CRUDService<Genre>(AppDbContext);
            var genre = service.Read(15);
            Assert.IsTrue(genre.Name == "����� ����");
        }

        [TestMethod]
        public void DeleteGenre()
        {
            var service = new CRUDService<Genre>(AppDbContext);
            Assert.IsTrue(service.Delete(15));
        }
    }
}