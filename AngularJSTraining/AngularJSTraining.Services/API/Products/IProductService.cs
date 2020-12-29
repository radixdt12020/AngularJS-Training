using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.API.Products
{
    public partial interface IProductService
    {
        List<vProduct> GetAllProducts();
        vProduct GetProductById(int userId);
        bool AddProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(int productId);
    }
}
