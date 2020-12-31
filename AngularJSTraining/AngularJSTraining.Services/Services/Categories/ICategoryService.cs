using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.Services.Categories
{
    public partial interface ICategoryService
    {
        List<vCategory> GetAllCategories();
        vCategory GetCategoryById(int categoryId);
    }
}
