﻿using AngularJSTraining.Core;
using System.Collections.Generic;
using System.Linq;

namespace AngularJSTraining.Services.API.Products
{
    public partial class ProductService : IProductService
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        #endregion

        public List<vProduct> GetAllProducts()
        {
            return _dbContext.vProducts.ToList();
        }
        public vProduct GetProductById(int userId)
        {
            return _dbContext.vProducts.Where(row => row.ProductId == userId).FirstOrDefault();
        }
        public bool AddProduct(Product product)
        {
            if (product != null)
            {
                _dbContext.Products.Add(product);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }
        public bool UpdateProduct(Product product)
        {
            if (product != null)
            {
                _dbContext.Entry(product).State = System.Data.Entity.EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }
        public bool DeleteProduct(int productId)
        {
            if (productId > 0)
            {
                Product product = _dbContext.Products.Where(row => row.Id == productId).FirstOrDefault();
                if (product != null)
                {
                    _dbContext.Entry(product).State = System.Data.Entity.EntityState.Deleted;
                    _dbContext.SaveChanges();
                    return true;
                }
                else { return false; }
            }
            return false;
        }
    }
}
