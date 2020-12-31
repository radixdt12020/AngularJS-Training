using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.Services.Users
{
    public partial interface IUserService
    {
        List<vUser> GetAllUsers();
        vUser GetUserById(int userId);
        bool IsAuthenticatedUser(string userName, string password);
    }
}
