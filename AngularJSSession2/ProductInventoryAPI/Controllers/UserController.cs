﻿using ProductInventoryAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProductInventoryAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        public UserController() { }

        [System.Web.Http.Route("api/User/CheckUserExist")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage CheckUserExist(User user)
        {
            var errorReponseObject = (new
            {
                isSuccess = false,
                message = "This user is not exists!"
            });

            using (ProductInventoryDBEntities ctx = new ProductInventoryDBEntities())
            {
                TblUser ObjUser = ctx.TblUsers.Where(x => x.UserName.ToLower() == user.UserName.ToLower() && x.Password.Trim() == user.Password.Trim()).FirstOrDefault();
                if (ObjUser == null)
                {
                    //return NotFound();
                    return Request.CreateResponse(HttpStatusCode.OK, errorReponseObject);
                }
                else
                {
                    var json = (new
                    {
                        isSuccess = true,
                        message = "User exists!",
                        json = ObjUser
                    });
                    return Request.CreateResponse(HttpStatusCode.OK, json);
                }
            }

        }
    }
}
