using AngularJSTraining.Core;
using AngularJSTraining.Services.Services.Categories;
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
    public class CategoryController : ApiController
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        private ICategoryService _categoryService = new CategoryService();
        #endregion

        public CategoryController()
        {

        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var categories = _categoryService.GetAllCategories();
                return Ok(new { result = categories });
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
        public IHttpActionResult Get(int categoryId)
        {
            try
            {
                var category = _categoryService.GetCategoryById(categoryId);
                return Ok(new { result = category });
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
