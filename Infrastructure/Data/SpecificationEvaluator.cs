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

            q = spec.Includes.Aggregate(q, (c, i) => c.Include(i));

            return q;
        }        
    }
}