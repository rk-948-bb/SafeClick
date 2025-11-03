
using DAL;
using AutoMapper;
using DTO;
namespace BLL
{
    public interface IUsersRepository
    {
        void AddUsers(UserDTO user);
        void DeleteUsers(int id);
        Users GetUser(string name,string password);
        UserDTO GetUser(int id);
        void UpdateUsers(UserDTO user);
        void UpdateUsersById(int id);
       
    }
}
