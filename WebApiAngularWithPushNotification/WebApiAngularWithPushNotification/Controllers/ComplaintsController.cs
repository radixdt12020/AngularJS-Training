using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAngularWithPushNotification.Hubs;

namespace WebApiAngularWithPushNotification.Controllers
{
    public class ComplaintsController : ApiControllerWithHub<MyHub>
    {
        private SignalRDemoDBEntities db = new SignalRDemoDBEntities();       

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
            List<Customer_Complaint> customer_Complaint = db.Customer_Complaint.Where(y => y.CustomerId.ToString() == id.ToString()).ToList();
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
                dynamic subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
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
            dynamic subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
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
            dynamic subscribed = Hub.Clients.Group(customer_Complaint.CustomerId);
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

        [Route("api/Complaints/UploadFiles")]
        [HttpPost]
        public HttpResponseMessage UploadFiles()
        {
            var json = (new
            {
                FileName = "",
                FilePath = "",
                IsFileSave = false,
                FileBase64 = ""                
            });

            //Create the Directory.
            string path = HttpContext.Current.Server.MapPath("~/Uploads/");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            //Save the Files.
            if (HttpContext.Current.Request.Files != null && HttpContext.Current.Request.Files.Count > 0)
            {
                foreach (string key in HttpContext.Current.Request.Files)
                {
                    HttpPostedFile postedFile = HttpContext.Current.Request.Files[key];
                    postedFile.SaveAs(path + postedFile.FileName);

                    //Convert img to byte array & byte array to base 64
                    byte[] imageByteArray = System.IO.File.ReadAllBytes(path + postedFile.FileName);
                    string base64Image = Convert.ToBase64String(imageByteArray);

                    
                    ////thubnail image
                    //string ext = Path.GetExtension(postedFile.FileName);
                    //string uploadFilePath = DateTime.Now.ToString("ddMMyyyyhhmmsstt");
                    //string imageFile = uploadFilePath + ext;

                    //Image img = Image.FromStream(postedFile.InputStream);

                    //var ratio = (double)100 / img.Height;
                    //int imageHeight = (int)(img.Height * ratio);
                    //int imageWidth = (int)(img.Width * ratio);

                    //Image.GetThumbnailImageAbort dCallback = new Image.GetThumbnailImageAbort(ThumbnailCallback);
                    //Image thumbnailImg = img.GetThumbnailImage(imageWidth, imageHeight, dCallback, IntPtr.Zero);

                    //thumbnailImg.Save(Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/"), imageFile), ImageFormat.Png);
                    //thumbnailImg.Dispose();

                    json = (new
                    {
                        FileName = postedFile.FileName,
                        FilePath = "Uploads/" + postedFile.FileName,
                        IsFileSave = true,
                        FileBase64 = base64Image,
                    });

                }

                //Send OK Response to Client.
                return Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                //Send OK Response to Client.
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        //public bool ThumbnailCallback()
        //{
        //    return false;
        //}
    }
}