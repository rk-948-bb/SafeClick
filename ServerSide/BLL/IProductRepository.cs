using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using AutoMapper;
using DTO;
namespace BLL
{
    public interface IProductRepository
    {
        void AddProduct(ProductDTO product);
        List<ProductDTO> GetAllProduct();
        List<ProductDTO> GetAllProductByCity(int city);
        ProductDTO GetProductById(int id);
        void UpdateProductById(int id);
        void UpdateProduct(ProductDTO product);
        void DeleteProduct(int id);
    }
}
