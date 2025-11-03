using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DTO;
using DAL;
using BLL;

namespace BLL.cast
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Users, LogInUserDTO>().ReverseMap();
            CreateMap<Users, UserDTO>().ReverseMap();
            CreateMap<Purchase, PurchaseDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<PurchasesImpl, PurchaseImplDTO>().ReverseMap();
            CreateMap<PurchasesImpl, PurchaseImplDTO2>().ReverseMap();
            CreateMap<Package, PackageDTO>().ForMember(dest => dest.Image
            , src => src.MapFrom(s => Convert.ToBase64String(ConvertToByte(s.Image))));
            CreateMap<PackageDTO, Package>();
            CreateMap<Package, PackageImageUpdateDTO>().ForMember(dest => dest.Image
           , src => src.MapFrom(s => Convert.ToBase64String(ConvertToByte(s.Image))));
            CreateMap<PackageImageUpdateDTO, Package>();

        }
        public byte[] ConvertToByte(string path)
        {
            return File.ReadAllBytes(path);
        }


    } 
    }

