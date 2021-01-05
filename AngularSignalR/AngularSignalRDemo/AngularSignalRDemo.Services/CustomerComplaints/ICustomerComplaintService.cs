using AngularSignalRDemo.Core;
using System.Collections.Generic;

namespace AngularSignalRDemo.Services.CustomerComplaints
{
    public partial interface ICustomerComplaintService
    {
        List<vCustomerComplaint> GetAllComplaints();
        CustomerComplaint GetComplaintsById(int id);
        List<vCustomerComplaint> GetComplaintsByCustomerId(int userId);
        vCustomerComplaint AddComplaint(CustomerComplaint customerComplaint);
        bool UpdateComplaint(CustomerComplaint customerComplaint);
        vCustomerComplaint DeleteComplaint(int complaintId);
    }
}
