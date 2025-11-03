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
    public interface ICategoryRepository
    {
        void AddCategory(CategoryDTO cat);
        List<CategoryDTO> GetAllCategory();
        CategoryDTO GetCategory(int id);
        void UpdateCategoryById(int id);
        void UpdateCategory(CategoryDTO cat);
        void DeleteCategoryById(int id);
    }
}
