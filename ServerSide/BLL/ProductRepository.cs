using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using BLL.cast;
using AutoMapper;
using DTO;
namespace BLL
{
    public class ProductRepository : IProductRepository
    {

        private ComputerRoomSubscription comp;
        private IMapper mapper;

        public ProductRepository(ComputerRoomSubscription comp, IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }


        public void AddProduct(ProductDTO product)
        {
                comp.Product.Add(mapper.Map<Product>(product));
                comp.SaveChanges();  
        }

        public void DeleteProduct(int id)
        {
            Product p = comp.Product.Find(id);
            comp.Remove(p);
            comp.SaveChanges();
        }

        public List<ProductDTO> GetAllProduct()
        {
            List<Product> product = comp.Product.ToList<Product>();
            return mapper.Map<List<ProductDTO>>(product);
        }

        public List<ProductDTO> GetAllProductByCity(int categoryId)
        {
            List<Product> product = comp.Product.Where(prod=>prod.CategoryId==categoryId).ToList<Product>();
            return mapper.Map<List<ProductDTO>>(product);
        }

        public ProductDTO GetProductById(int id)
        {
            Product product = comp.Product.Find(id);
            return mapper.Map<ProductDTO>(product);
        }

        public void UpdateProduct(ProductDTO product)
        {
            
                comp.Product.Update(mapper.Map<Product>(product));
                comp.SaveChanges();
           
        }

        public void UpdateProductById(int id)
        {
            Product p = comp.Product.Find(id);
            comp.Update(p);
            comp.SaveChanges();
        }
    }
}
