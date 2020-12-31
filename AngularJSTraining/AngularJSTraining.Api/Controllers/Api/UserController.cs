using AngularJSTraining.Core;
using AngularJSTraining.Services.Services.Users;
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
    public class UserController : ApiController
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        private IUserService _userService = new UserService();
        #endregion

        public UserController()
        {

        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return Ok(new { result = users });
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
        public IHttpActionResult Get(int userId)
        {
            try
            {
                var user = _userService.GetUserById(userId);
                return Ok(new { result = user });
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
        public IHttpActionResult IsAuthenticated(string userName, string password)
        {
            try
            {
                var isAuthenticated = _userService.IsAuthenticatedUser(userName, password);
                return Ok(new { result = isAuthenticated });
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
