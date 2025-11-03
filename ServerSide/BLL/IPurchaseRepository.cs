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
    public interface IPurchaseRepository
    {
        void AddPurchase(PurchaseDTO purchase);
        List<Purchase> GetAllPurchaseByUserId(int id);
        Purchase GetPurchase(int id);
        void DeletePurchase(int id);
        void UpdatePurchase(Purchase purchase);
        void UpdatePurchaseById(int id);
    }
}
