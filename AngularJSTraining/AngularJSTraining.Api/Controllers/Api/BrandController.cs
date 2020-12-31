using AngularJSTraining.Core;
using AngularJSTraining.Services.Services.Brands;
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
    public class BrandController : ApiController
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        private IBrandService _brandService = new BrandService();
        #endregion

        public BrandController()
        {

        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var brands = _brandService.GetAllBrands();
                return Ok(new { result = brands });
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
        public IHttpActionResult Get(int brandId)
        {
            try
            {
                var brand = _brandService.GetBrandById(brandId);
                return Ok(new { result = brand });
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
