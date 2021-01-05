using AngularSignalRDemo.Core;
using AngularSignalRDemo.Hubs;
using AngularSignalRDemo.Services.CustomerComplaints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularSignalRDemo.Controllers
{
    public class CustomerComplaintsController : ApiControllerWithHub<SignalRHub>
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        private ICustomerComplaintService _customerService = new CustomerComplaintService();
        #endregion

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var complaints = _customerService.GetAllComplaints();
                return Ok(new { result = complaints });
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
        public IHttpActionResult Get(int id)
        {
            try
            {
                var complaints = _customerService.GetComplaintsByCustomerId(id);
                return Ok(new { result = complaints });
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
        [HttpPost]
        public IHttpActionResult Post(vCustomerComplaint customerComplaint)
        {
            try
            {
                CustomerComplaint addComplaint = new CustomerComplaint()
                {
                    CustomerId = customerComplaint.CustomerId,
                    Description = customerComplaint.Description
                };
                var resultComplaint = _customerService.AddComplaint(addComplaint);
                var subscribed = Hub.Clients.Group(resultComplaint.CustomerId.ToString());
                subscribed.addItem(resultComplaint);
                return Ok(new { result = resultComplaint });
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
        [HttpPut]
        public IHttpActionResult PutCustomerComplaint(int id, vCustomerComplaint customerComplaint)
        {
            try
            {
                CustomerComplaint complaint = _customerService.GetComplaintsById(customerComplaint.ComplaintId);

                if (complaint != null)
                {
                    complaint.CustomerId = customerComplaint.CustomerId;
                    complaint.Description = customerComplaint.Description;
                    var resultData = _customerService.UpdateComplaint(complaint);
                    var subscribed = Hub.Clients.Group(customerComplaint.CustomerId.ToString());
                    subscribed.updateItem(customerComplaint);
                    return Ok(new { result = resultData });
                }
                else
                {
                    return Ok(new { result = false });
                }
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
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var resultData = _customerService.DeleteComplaint(id);
                var subscribed = Hub.Clients.Group(resultData.ComplaintId.ToString());
                subscribed.deleteItem(resultData);
                return Ok(new { result = resultData });
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
