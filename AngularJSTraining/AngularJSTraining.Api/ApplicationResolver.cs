using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSTraining.Api
{
    public class ApplicationResolver : IDependencyResolver
    {
        IContainer _container;

        public ApplicationResolver(IContainer container)
        {
            _container = container;
        }
        public object GetService(Type serviceType)
        {
            object instance = _container.TryGetInstance(serviceType);

            if (instance == null && !serviceType.IsAbstract)
            {
                _container.Configure(c => c.AddType(serviceType, serviceType));
                instance = _container.TryGetInstance(serviceType);
            }

            return instance;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _container.GetAllInstances(serviceType).Cast<object>();
        }
    }
}