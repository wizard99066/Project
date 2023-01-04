using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application
{
    public abstract class BaseService<G> where G : class
    {
        public static async Task<PageItems<G>> ToPageAsync(IQueryable<G> query, int page = 1, int pageSize = 10)
        {
            if (page == 0)
            {
                page = 1;
            }
            if (pageSize == 0)
            {
                pageSize = 10;
            }
            var count = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return new PageItems<G>()
            {
                Count = count,
                Page = page,
                PageSize = pageSize,
                PageCount = count / pageSize + ((count % pageSize > 0) ? 1 : 0),
                Items = items
            };
        }
    }

    /// <summary>
    /// Страница документов.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PageItems<T> where T : class
    {
        /// <summary>
        /// Всего строк с учетом фильтра, если он есть.
        /// </summary>
        public long Count { get; set; }

        /// <summary>
        /// Номер возвращаемой страницы
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// Число строк в странице
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Всего страниц с учетом фильтра, если он есть.
        /// </summary>
        public long PageCount { get; set; }

        /// <summary>
        /// Документы на странице
        /// </summary>
        public List<T> Items { get; set; }
    }
}
