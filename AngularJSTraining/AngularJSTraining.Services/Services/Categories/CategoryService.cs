using AngularJSTraining.Core;
using System.Collections.Generic;
using System.Linq;

namespace AngularJSTraining.Services.Services.Categories
{
    public partial class CategoryService : ICategoryService
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        #endregion

        public List<vCategory> GetAllCategories()
        {
            return _dbContext.vCategories.ToList();
        }
        public vCategory GetCategoryById(int categoryId)
        {
            return _dbContext.vCategories.Where(row => row.Id == categoryId).FirstOrDefault();
        }
    }
}
