using AngularJSTraining.Core;
using System.Collections.Generic;
using System.Linq;

namespace AngularJSTraining.Services.Services.Brands
{
    public partial class BrandService : IBrandService
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        #endregion

        public List<vBrand> GetAllBrands()
        {
            return _dbContext.vBrands.ToList();
        }
        public vBrand GetBrandById(int brandId)
        {
            return _dbContext.vBrands.Where(row => row.Id == brandId).FirstOrDefault();
        }
        
    }
}
