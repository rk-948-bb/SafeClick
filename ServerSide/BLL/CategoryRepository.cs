using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using AutoMapper;
using BLL.cast;

namespace BLL
{
    public class CategoryRepository :ICategoryRepository
    {
        private ComputerRoomSubscription comp;
        private IMapper mapper;
        public CategoryRepository(ComputerRoomSubscription comp,IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }

        public void AddCategory(CategoryDTO cat)
        {
            comp.Category.Add(mapper.Map<Category>(cat));
            comp.SaveChanges();
        }

        public void DeleteCategoryById(int id)
        {
            Category c = comp.Category.Find(id);
            comp.Category.Remove(c);
            comp.SaveChanges();
        }

        public List<CategoryDTO> GetAllCategory()
        {
            List<Category> cat = comp.Category.ToList<Category>();
            return mapper.Map<List<CategoryDTO>>(cat);
        }

        public CategoryDTO GetCategory(int id)
        {
            Category cat = comp.Category.Find(id);
            return mapper.Map<CategoryDTO>(cat);
        }

        public void UpdateCategory(CategoryDTO cat)
        {
            comp.Category.Update(mapper.Map<Category>(cat));
            comp.SaveChanges();
        }

        public void UpdateCategoryById(int id)
        {
            Category c = comp.Category.Find(id);
            comp.Category.Update(c);
            comp.SaveChanges();
        }
    }
}
