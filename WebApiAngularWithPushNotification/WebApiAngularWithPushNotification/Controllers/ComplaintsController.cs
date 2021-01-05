using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAngularWithPushNotification;
using WebApiAngularWithPushNotification.Hubs;

namespace WebApiAngularWithPushNotification.Controllers
{
    public class ComplaintsController : ApiControllerWithHub<MyHub>
    {
        private SignalRDemoDBEntities db = new SignalRDemoDBEntities();
        //private readonly IHubContext<MyHub> Hub;

        //public ComplaintsController(IHubContext<MyHub> _hub)
        //{
        //    Hub = _hub;
        //}

        // GET: api/Complaints
        public IQueryable<Customer_Complaint> GetCustomer_Complaint()
        {
            return db.Customer_Complaint;
        }

        // GET: api/Complaints/5
        [ResponseType(typeof(Customer_Complaint))]
        public IHttpActionResult GetCustomer_Complaint(int id) //get all by customer id
        {
            //Customer_Complaint customer_Complaint = db.Customer_Complaint.Find(id);
            //Customer_Complaint customer_Complaint = db.Customer_Complaint.Where(y=>y.CustomerId.ToString() == id.ToString()).FirstOrDefault();
            List<Customer_Complaint> customer_Complaint = db.Customer_Complaint.Where(y=>y.CustomerId.ToString() == id.ToString()).ToList();
            if (customer_Complaint == null)
            {
                return NotFound();
            }

            return Ok(customer_Complaint);
        }

        // PUT: api/Complaints/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer_Complaint(int id, Customer_Complaint customer_Complaint)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer_Complaint.ComplaintId)
            {
                return BadRequest();
            }

            db.Entry(customer_Complaint).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                //push notifications to all clients subscribed to the same customer.......
                var subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
                subscribed.updateItem(customer_Complaint);

                //Hub.Clients.Group(customer_Complaint.CustomerId).updateItem(customer_Complaint);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Customer_ComplaintExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Complaints
        [ResponseType(typeof(Customer_Complaint))]
        public IHttpActionResult PostCustomer_Complaint(Customer_Complaint customer_Complaint)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customer_Complaint.Add(customer_Complaint);
            db.SaveChanges();
            //push notifications to all clients subscribed to the same customer.......
            var subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
            subscribed.addItem(customer_Complaint);

            return CreatedAtRoute("DefaultApi", new { id = customer_Complaint.ComplaintId }, customer_Complaint);
        }

        // DELETE: api/Complaints/5
        [ResponseType(typeof(Customer_Complaint))]
        public IHttpActionResult DeleteCustomer_Complaint(int id)
        {
            Customer_Complaint customer_Complaint = db.Customer_Complaint.Find(id);
            if (customer_Complaint == null)
            {
                return NotFound();
            }

            db.Customer_Complaint.Remove(customer_Complaint);
            db.SaveChanges();
            //push notifications to all clients subscribed to the same customer.......
            var subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
            subscribed.deleteItem(customer_Complaint);

            return Ok(customer_Complaint);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Customer_ComplaintExists(int id)
        {
            return db.Customer_Complaint.Count(e => e.ComplaintId == id) > 0;
        }
    }
}