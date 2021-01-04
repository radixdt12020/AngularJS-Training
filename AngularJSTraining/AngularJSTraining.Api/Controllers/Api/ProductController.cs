using AngularJSTraining.Core;
using AngularJSTraining.Services.Services.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AngularJSTraining.Api.Controllers.Api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        private IProductService _productService = new ProductService();
        #endregion

        public ProductController()
        {
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var products = _productService.GetAllProducts();
                return Ok(new { result = products });
            }
            catch (Exception ex)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(ex.Message, System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.BadRequest
                };
                throw new HttpResponseException(response);
            }

        }
        [HttpGet]
        public IHttpActionResult Get(int productId)
        {
            try
            {
                var product = _productService.GetProductViewById(productId);
                return Ok(new { result = product });
            }
            catch (Exception ex)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(ex.Message, System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.BadRequest
                };
                throw new HttpResponseException(response);
            }
        }
        [HttpPost]
        public IHttpActionResult Post(vProduct product)
        {
            try
            {
                Product addProduct = new Product()
                {
                    BrandId = product.BrandId,
                    CategoryId = product.CategoryId,
                    Color = product.Color,
                    ProductName = product.ProductName,
                    Price = product.Price,
                    IsInStock = product.IsInStock,
                    CreatedBy = product.CreatedBy,
                    CreatedDate = DateTime.Now
            };
                var resultProduct = _productService.AddProduct(addProduct);
                return Ok(new { result = resultProduct });
            }
            catch (Exception ex)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(ex.Message, System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.BadRequest
                };
                throw new HttpResponseException(response);
            }
        }
        [HttpPut]
        public IHttpActionResult Put(vProduct vProduct)
        {
            try
            {
                Product product = _productService.GetProductById(vProduct.ProductId);

                if (product != null)
                {
                    product.BrandId = vProduct.BrandId;
                    product.CategoryId = vProduct.CategoryId;
                    product.Color = vProduct.Color;
                    product.ProductName = vProduct.ProductName;
                    product.Price = vProduct.Price;
                    product.IsInStock = vProduct.IsInStock;
                    product.CreatedBy = (product.CreatedBy == null) ? vProduct.CreatedBy : product.CreatedBy;
                    product.CreatedDate = (product.CreatedDate == null) ? DateTime.Now : product.CreatedDate;
                    product.LastModifiedBy = vProduct.LastModifiedBy;
                    product.LastModifiedDate = DateTime.Now;
                    var resultData = _productService.UpdateProduct(product);
                    return Ok(new { result = resultData });
                }
                else
                {
                    return Ok(new { result = false });
                }
            }
            catch (Exception ex)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(ex.Message, System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.BadRequest
                };
                throw new HttpResponseException(response);
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete(int productId)
        {
            try
            {
                var resultData = _productService.DeleteProduct(productId);
                return Ok(new { result = resultData });
            }
            catch (Exception ex)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(ex.Message, System.Text.Encoding.UTF8, "text/plain"),
                    StatusCode = HttpStatusCode.BadRequest
                };
                throw new HttpResponseException(response);
            }
        }
    }
}
