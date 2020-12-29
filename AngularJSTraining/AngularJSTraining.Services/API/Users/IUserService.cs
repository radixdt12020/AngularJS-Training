using AngularJSTraining.Core;
using System.Collections.Generic;

namespace AngularJSTraining.Services.API.Users
{
    public partial interface IUserService
    {
        List<vUser> GetAllUsers();
        vUser GetUserById(int userId);
        bool IsAuthenticatedUser(int userId, string password);
    }
}
