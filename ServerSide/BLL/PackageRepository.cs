
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.cast;
using DAL;
using DTO;
using DTO;
using static System.Net.Mime.MediaTypeNames;
namespace BLL
{

    public class PackageRepository : IPackageRepository
    {
        private ComputerRoomSubscription comp;
        private IMapper mapper;

        public PackageRepository(ComputerRoomSubscription comp, IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }
        public void AddPackage(Package pack)
        {
            comp.Packege.Add(mapper.Map<Package>(pack));
            comp.SaveChanges();
        }

        public void DeletePackageById(int id)
        {
            Package p = comp.Packege.Find(id);
            comp.Remove(p);
            comp.SaveChanges();
        }

        public List<PackageDTO> GetAllPackage()
        {
            List<Package> p = comp.Packege.ToList<Package>();
            return mapper.Map<List<PackageDTO>>(p);
        }

        public PackageDTO GetPackage(int id)
        {
            Package p = comp.Packege.Find(id);
            return mapper.Map<PackageDTO>(p);
        }

        public PackageImageUpdateDTO GetPackageUp(int id)
        {
            Package p = comp.Packege.Find(id);
            return mapper.Map<PackageImageUpdateDTO>(p);
        }

        public void UpdatePackage(PackageDTO pack)
        {
            comp.Packege.Update(mapper.Map<Package>(pack));
            comp.SaveChanges();
        }

        public void UpdatePackage(PackageImageUpdateDTO upImage)
        {
            comp.Packege.Update(mapper.Map<Package>(upImage));
            comp.SaveChanges();
        }

        public void UpdatePackage(Package package)
        {
            comp.Packege.Update(package);
            comp.SaveChanges();
        }

        public void UpdatePackageById(int id)
        {
            Package p = comp.Packege.Find(id);
            comp.Update(p);
            comp.SaveChanges();
        }
    }
}
