using AngularJSTraining.Core;
using System.Collections.Generic;
using System.Linq;

namespace AngularJSTraining.Services.API.Users
{
    public partial class UserService : IUserService
    {
        #region Fields       
        ProductMgtContext _dbContext = new ProductMgtContext();
        #endregion

        public List<vUser> GetAllUsers()
        {
            return _dbContext.vUsers.ToList();
        }
        public vUser GetUserById(int userId)
        {
            return _dbContext.vUsers.Where(row => row.Id == userId).FirstOrDefault();
        }
        public bool IsAuthenticatedUser(int userId, string password)
        {
            if (_dbContext.Users.Where(r => r.Id == userId && r.Password == password).SingleOrDefault() != null)
            {
                return true;
            }
            return false;
        }
        public void InsertUser(User user)
        {
            if (user != null)
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
        }
    }
}
