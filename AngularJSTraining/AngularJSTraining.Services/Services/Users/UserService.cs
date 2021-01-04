using AngularJSTraining.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngularJSTraining.Services.Services.Users
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
        public vUser GetUserByUserName(string userName)
        {
            return _dbContext.vUsers.Where(row => row.UserName == userName).FirstOrDefault();
        }
        public vUser IsAuthenticatedUser(string userName, string password)
        {
            var getUser = _dbContext.vUsers.FirstOrDefault(t => t.UserName == userName);
            if (getUser != null)
            {
                password = Encryptdata(password);
                if (getUser.PasswordSalt == password)
                {
                    return getUser;
                }
            }
            return null;
        }
        public void InsertUser(User user)
        {
            if (user != null)
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
        }

        public static string Encryptdata(string password)
        {
            string strmsg = string.Empty;
            byte[] encode = new byte[password.Length];
            encode = Encoding.UTF8.GetBytes(password);
            strmsg = Convert.ToBase64String(encode);
            return strmsg;
        }
        public static string Decryptdata(string encryptpwd)
        {
            string decryptpwd = string.Empty;
            UTF8Encoding encodepwd = new UTF8Encoding();
            Decoder Decode = encodepwd.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encryptpwd);
            int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            decryptpwd = new String(decoded_char);
            return decryptpwd;
        }
    }
}
