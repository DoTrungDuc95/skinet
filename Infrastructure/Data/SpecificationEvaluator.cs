using System.Linq;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : class
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> query, 
            ISpecification<TEntity> spec)
        {
            var q = query;
            if(spec.Criteria != null){
                q = q.Where(spec.Criteria);
            }

             if (spec.OrderBy != null)
            {
                q = q.OrderBy(spec.OrderBy);
            }

            if (spec.OrderByDescending != null)
            {
                q = q.OrderByDescending(spec.OrderByDescending);
            }

            if (spec.IsPagingEnabled)
            {
                q = q.Skip(spec.Skip).Take(spec.Take);
            }

            q = spec.Includes.Aggregate(q, (c, i) => c.Include(i));

            return q;
        }        
    }
}