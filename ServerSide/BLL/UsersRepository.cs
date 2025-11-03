using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using AutoMapper;
using DTO;
using BLL.cast;
namespace BLL
{
    public class UsersRepository : IUsersRepository
    {
        private ComputerRoomSubscription comp;
        private IMapper mapper;

        public UsersRepository(ComputerRoomSubscription comp, IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }
        public void AddUsers(UserDTO user)
        {
            comp.Users.Add(mapper.Map<Users>(user));
            comp.SaveChanges();
        }

        public void DeleteUsers(int id)
        {
            Users user = comp.Users.Find(id);
            comp.Users.Remove(user);
            comp.SaveChanges();
        }

        public Users GetUser(string name, string password)
        {
           Users users = comp.Users.Where(user=>user.Password==password && user.Name==name).FirstOrDefault();
           return users;
        }

        public UserDTO GetUser(int id)
        {
            Users u = comp.Users.Find(id);
            return mapper.Map<UserDTO>(u);
        }

        public void UpdateUsers(UserDTO user)
        {
            comp.Users.Update(mapper.Map<Users>(user));
            comp.SaveChanges();
        }

        public void UpdateUsersById(int id)
        {
            Users user=comp.Users.Find(id);
            comp.Users.Update(user);
            comp.SaveChanges();
        }
    }
}
