using ProductInventoryAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace ProductInventoryAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        public ProductController() { }

        //[System.Web.Http.Route("api/Product")]
        public HttpResponseMessage GetAllProduct()
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "Product not found"
            });

            IList<Product> prod = null;
            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                prod = ctx.TblProducts
                            .Select(e => new Product()
                            {
                                ProdId = e.ProdId,
                                ProdCode = e.ProdCode,
                                ProdName = e.ProdName,
                                ProdCategory = e.ProdCategory,
                                ProdBrand = e.ProdBrand,
                                ProdColor = e.ProdColor,
                                ProdPrice = e.ProdPrice,
                                ProdInStock = e.ProdInStock,
                                CreatedBy = e.CreatedBy,
                                CreatedDate = e.CreatedDate,
                                ModifiedBy = e.ModifiedBy,
                                ModifiedDate = e.ModifiedDate,
                                IsActive = e.IsActive

                            }).ToList<Product>();
            }

            if (prod.Count == 0)
            {
                //return NotFound();
                return Request.CreateResponse(HttpStatusCode.OK, errorReponseObject);
            }
            var json = (new
            {
                isSuccess = true,
                json = prod
            });

            return Request.CreateResponse(HttpStatusCode.OK, json);

        }


        [System.Web.Http.Route("api/Product/GetProductById/{id}")]
        public HttpResponseMessage GetProductById(int id)
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "Product not found"
            });

            Product prod = null;
            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                prod = ctx.TblProducts
                            .Select(e => new Product()
                            {
                                ProdId = e.ProdId,
                                ProdCode = e.ProdCode,
                                ProdName = e.ProdName,
                                ProdCategory = e.ProdCategory,
                                ProdBrand = e.ProdBrand,
                                ProdColor = e.ProdColor,
                                ProdPrice = e.ProdPrice,
                                ProdInStock = e.ProdInStock,
                                CreatedBy = e.CreatedBy,
                                CreatedDate = e.CreatedDate,
                                ModifiedBy = e.ModifiedBy,
                                ModifiedDate = e.ModifiedDate,
                                IsActive = e.IsActive

                            }).Where(x => x.ProdId == id).FirstOrDefault();
            }

            if (prod == null)
            {
                //return NotFound();
                return Request.CreateResponse(HttpStatusCode.OK, errorReponseObject);
            }
            var json = (new
            {
                isSuccess = true,
                json = prod
            });

            return Request.CreateResponse(HttpStatusCode.OK, json);

        }

        [System.Web.Http.Route("api/Product/AddProduct")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage AddProduct(Product prod)
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "Failed to add product.!"
            });
            if (!ModelState.IsValid)
            {
                //return BadRequest("Invalid data.");
                errorReponseObject = (new
                {
                    isSuccess = false,
                    message = "Invalid data.!"
                });
                return Request.CreateResponse(HttpStatusCode.BadRequest, errorReponseObject);
            }
            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                ctx.TblProducts.Add(new TblProduct()
                {
                    //ProdId = prod.ProdId,
                    //ProdCode = prod.ProdCode,
                    ProdName = prod.ProdName,
                    ProdCategory = prod.ProdCategory,
                    ProdBrand = prod.ProdBrand,
                    ProdColor = prod.ProdColor,
                    ProdPrice = prod.ProdPrice,
                    ProdInStock = prod.ProdInStock,
                    CreatedBy = prod.CreatedBy,
                    CreatedDate = System.DateTime.Now,
                    IsActive = true
                });

                ctx.SaveChanges();
            }

            //return Ok();
            var json = (new
            {
                isSuccess = true,
                message = "Product Added Successfully.!"
            });

            return Request.CreateResponse(HttpStatusCode.OK, json);

        }

        [System.Web.Http.Route("api/Product/UpdateProduct")]
        [System.Web.Http.HttpPut]
        public HttpResponseMessage UpdateProduct(Product prod)
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "Failed to update product.!"
            });
            if (!ModelState.IsValid)
            {
                //return BadRequest("Invalid data.");
                errorReponseObject = (new
                {
                    isSuccess = false,
                    message = "Invalid data.!"
                });
                return Request.CreateResponse(HttpStatusCode.BadRequest, errorReponseObject);
            }

            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                TblProduct existingProd = ctx.TblProducts.Where(e => e.ProdId == prod.ProdId)
                                                        .FirstOrDefault<TblProduct>();
                if (existingProd != null)
                {
                    existingProd.ProdName = prod.ProdName;
                    existingProd.ProdCategory = prod.ProdCategory;
                    existingProd.ProdBrand = prod.ProdBrand;
                    existingProd.ProdColor = prod.ProdColor;
                    existingProd.ProdPrice = prod.ProdPrice;
                    existingProd.ProdInStock = prod.ProdInStock;
                    existingProd.ModifiedBy = prod.ModifiedBy;
                    existingProd.ModifiedDate = System.DateTime.Now;

                    ctx.SaveChanges();
                }
                else
                {
                    errorReponseObject = (new
                    {
                        isSuccess = false,
                        message = "No data found for this product.!"
                    });
                    return Request.CreateResponse(HttpStatusCode.OK, errorReponseObject);
                }
            }
            //return Ok();
            var json = (new
            {
                isSuccess = true,
                message = "Product Updated Successfully.!"
            });

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        [System.Web.Http.Route("api/Product/DeleteProduct/{id}")]
        [System.Web.Http.HttpDelete]
        public HttpResponseMessage DeleteProduct(int id)
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "Failed to delete product.!"
            });

            if (id <= 0)
            {
                //return BadRequest("Not a valid product id");
                errorReponseObject = (new
                {
                    isSuccess = false,
                    message = "Not a valid product id.!"
                });
                return Request.CreateResponse(HttpStatusCode.BadRequest, errorReponseObject);
            }
            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                TblProduct prod = ctx.TblProducts
                    .Where(e => e.ProdId == id)
                    .FirstOrDefault();

                ctx.Entry(prod).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            //return Ok();
            var json = (new
            {
                isSuccess = true,
                message = "Product Deleted Successfully.!"
            });

            return Request.CreateResponse(HttpStatusCode.OK, json);
        }
    }
}