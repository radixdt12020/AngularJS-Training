using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StructureMap;
using System.Web.Mvc;
using AngularJSTraining.Services.Services.Users;
using AngularJSTraining.Services.Services.Products;

namespace AngularJSTraining.Api
{
    public class BootStrapper
    {
        public static void SetUp()
        {
            IContainer container = new Container(
                x =>
                {
                    x.For<IUserService>().Use<UserService>();
                    x.For<IProductService>().Use<ProductService>();
                });

            DependencyResolver.SetResolver(new ApplicationResolver(container));
        }
    }
}