using AngularSignalRDemo.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngularSignalRDemo.Services.CustomerComplaints
{
    public partial class CustomerComplaintService : ICustomerComplaintService
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        #endregion

        public List<vCustomerComplaint> GetAllComplaints()
        {
            return _dbContext.vCustomerComplaints.ToList();
        }
        public List<vCustomerComplaint> GetComplaintsByCustomerId(int userId)
        {
            return _dbContext.vCustomerComplaints.Where(row => row.CustomerId == userId).ToList();
        }
        public CustomerComplaint GetComplaintsById(int id)
        {
            return _dbContext.CustomerComplaints.Where(row => row.ComplaintId == id).FirstOrDefault();
        }
        public vCustomerComplaint AddComplaint(CustomerComplaint customerComplaint)
        {
            if (customerComplaint != null)
            {
                _dbContext.CustomerComplaints.Add(customerComplaint);
                _dbContext.SaveChanges();
                return _dbContext.vCustomerComplaints.Where(row => row.ComplaintId == customerComplaint.ComplaintId).FirstOrDefault();
            }
            return null;
        }
        public bool UpdateComplaint(CustomerComplaint customerComplaint)
        {
            if (customerComplaint != null)
            {
                _dbContext.Entry(customerComplaint).State = System.Data.Entity.EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }
        public vCustomerComplaint DeleteComplaint(int complaintId)
        {
            if (complaintId > 0)
            {
                vCustomerComplaint customerComplaintReturn = _dbContext.vCustomerComplaints.Where(row => row.ComplaintId == complaintId).SingleOrDefault();
                CustomerComplaint customerComplaint = _dbContext.CustomerComplaints.Where(row => row.ComplaintId == complaintId).SingleOrDefault();
                if (customerComplaint != null)
                {
                    _dbContext.Entry(customerComplaint).State = System.Data.Entity.EntityState.Deleted;
                    _dbContext.SaveChanges();
                    return customerComplaintReturn;
                }
                else { return null; }
            }
            return null;
        }
    }
}
