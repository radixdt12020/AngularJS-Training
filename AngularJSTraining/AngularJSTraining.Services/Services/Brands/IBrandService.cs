using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.Services.Brands
{
    public partial interface IBrandService
    {
        List<vBrand> GetAllBrands();
        vBrand GetBrandById(int brandId);
    }
}
