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
    public interface IPurchasesImplRepository
    {
        Purchase AddPurchaseImpl(PurchaseImplDTO purchase);
        List<PurchaseImplDTO> GetAllPurchaseImpl();
        PurchaseImplDTO GetPurchaseImpl(int id);
        void DeletePurchaseImpl(int id );
        void UpdatePurchaseImpl(PurchaseImplDTO purchase);
        void UpdatePurchaseByIdImpl(int id);

        List<PurchaseImplDTO> GetPurchaseImplByPurchaseId(int id);         
        List<PurchaseImplDTO2> GetPurchaseImplByUserId(List<Purchase> l);
    }
}
