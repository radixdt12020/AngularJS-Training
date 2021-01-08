using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebApiAngularWithPushNotification.Hubs
{
    [HubName("myHub")]
    public class MyHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
        //Subscribe() method is to be called from JavaScript on client browser when user searches a certain customer id so that user starts to get real time notifications about the customer
        public void Subscribe(string customerId)
        {
            Groups.Add(Context.ConnectionId, customerId);
        }

        //Unsubscribe() method is to stop getting notifications from the given customer.
        public void Unsubscribe(string customerId)
        {
            Groups.Remove(Context.ConnectionId, customerId);
        }        
        
    }
}
