using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.Services.Products
{
    public partial interface IProductService
    {
        List<vProduct> GetAllProducts();
        vProduct GetProductViewById(int productId);
        Product GetProductById(int productId);
        Product AddProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(int productId);
    }
}
