using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Domain.Helpers
{
    public abstract class BaseService<G, O> where G : class
        where O : class
    {
        public static async Task<PageItems<O>> ToPageAsync(IMapper _mapper, IQueryable<G> query, int page = 1, int pageSize = 10)
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
            return new PageItems<O>()
            {
                Count = count,
                Page = page,
                PageSize = pageSize,
                PageCount = count / pageSize + ((count % pageSize > 0) ? 1 : 0),
                Items = _mapper.Map<List<G>, List<O>>(items)
            };
        }

        public static PageItems<O> ToPageItems(IMapper _mapper, IQueryable<G> query, int page = 1, int pageSize = 10)
        {
            if (page == 0)
            {
                page = 1;
            }
            if (pageSize == 0)
            {
                pageSize = 10;
            }
            var count = query.Count();
            var items = query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PageItems<O>()
            {
                Count = count,
                Page = page,
                PageSize = pageSize,
                PageCount = count / pageSize + ((count % pageSize > 0) ? 1 : 0),
                Items = _mapper.Map<List<G>, List<O>>(items)
            };
        }

        public static async Task<PageItems<O>> ToPageAllItemsAsync(IMapper _mapper, IQueryable<G> query)
        {
            var count = await query.CountAsync();
            var items = await query.ToListAsync();
            return new PageItems<O>()
            {
                Count = count,
                Page = 1,
                PageSize = 0,
                PageCount = 1,
                Items = _mapper.Map<List<G>, List<O>>(items)
            };
        }

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

        public static PageItems<G> ToPage(IQueryable<G> query, int page = 1, int pageSize = 10)
        {
            if (page == 0)
            {
                page = 1;
            }
            if (pageSize == 0)
            {
                pageSize = 10;
            }
            var count = query.Count();
            var items = query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PageItems<G>()
            {
                Count = count,
                Page = page,
                PageSize = pageSize,
                PageCount = count / pageSize + ((count % pageSize > 0) ? 1 : 0),
                Items = items
            };
        }

        public static async Task<List<O>> ToListAllItemsAsync(IMapper _mapper, IQueryable<G> query)
        {
            var items = await query.ToListAsync();
            return _mapper.Map<List<G>, List<O>>(items);
        }
    }

    /// <summary>
    /// Страницы моделей.
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
