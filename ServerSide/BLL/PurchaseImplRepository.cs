using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DTO;
using BLL.cast;
using BLL;

namespace BLL
{
    public class PurchaseImplRepository :  IPurchasesImplRepository
    {
        private ComputerRoomSubscription comp;
        private IMapper mapper;

        public PurchaseImplRepository(ComputerRoomSubscription comp, IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }
        public Purchase AddPurchaseImpl(PurchaseImplDTO purchaseImpl)
        {
            PurchasesImpl p = mapper.Map<PurchasesImpl>(purchaseImpl);
            List<Purchase> list = comp.Purchase.Where(p => p.UsersID == purchaseImpl.UserId).ToList();
            Console.WriteLine(list);
            if(list.Count > 0)
            {
                int l=list.ToArray().Length;
                Purchase purchase = list.ToArray()[l - 1];
                p.PurchaseId = purchase.Id;
                comp.PurchasesImpl.Add(p);
                purchase.Minute -= p.UseMinute;
                purchase.Print -= p.UsePrint;
                purchase.PurchasesImpl.Add(p);
                comp.SaveChanges();
                return purchase;
            }
            return null;
        }

        public void DeletePurchaseImpl(int id)
        {
            PurchasesImpl p = comp.PurchasesImpl.Find(id);
            comp.Remove(p);
            comp.SaveChanges();
        }

        public PurchaseImplDTO GetPurchaseImpl(int id)
        {
            PurchasesImpl p = comp.PurchasesImpl.Find(id);
            return mapper.Map<PurchaseImplDTO>(p);
        }
      

        public void UpdatePurchaseImpl(PurchaseImplDTO purchase)
        {
            comp.PurchasesImpl.Update(mapper.Map<PurchasesImpl>(purchase));
            comp.SaveChanges();
        }

        public void UpdatePurchaseByIdImpl(int id)
        {
            PurchasesImpl p = comp.PurchasesImpl.Find(id);
            comp.PurchasesImpl.Update(p);
            comp.SaveChanges();
        }

        public List<PurchaseImplDTO> GetAllPurchaseImpl()
        {
            List<PurchasesImpl> p = comp.PurchasesImpl.ToList<PurchasesImpl>();
            return mapper.Map<List<PurchaseImplDTO>>(p);
        }

        public List<PurchaseImplDTO> GetPurchaseImplByPurchaseId(int purId)
        {
            List<PurchasesImpl> purchasesImpls = comp.PurchasesImpl.Where(p=>p.PurchaseId==purId).ToList<PurchasesImpl>();
            return mapper.Map< List<PurchaseImplDTO>> (purchasesImpls);
        }

        public List<PurchaseImplDTO2> GetPurchaseImplByUserId(List<Purchase> l)
        {
            List<PurchasesImpl> purchaseImplDTOs = l.SelectMany(p => 
                comp.PurchasesImpl.Where(x => x.PurchaseId == p.Id).ToList()).ToList();
            return mapper.Map< List<PurchaseImplDTO2>> (purchaseImplDTOs);
        }
    }
    }

