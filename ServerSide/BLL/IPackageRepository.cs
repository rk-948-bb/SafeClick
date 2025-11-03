using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
using AutoMapper;
using DTO;
namespace BLL
{
    public interface IPackageRepository
    {
        void AddPackage(Package pack);
        List<PackageDTO> GetAllPackage();
        PackageDTO GetPackage(int id);
        PackageImageUpdateDTO GetPackageUp(int id);
        void UpdatePackageById(int id);
        //void UpdatePackage(PackageDTO pack);
        void DeletePackageById(int id);
        void UpdatePackage(PackageImageUpdateDTO upImage);
        void UpdatePackage(Package package);
    }
}
