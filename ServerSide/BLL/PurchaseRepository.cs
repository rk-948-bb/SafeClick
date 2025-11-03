
using DAL;
using AutoMapper;
using DTO;

namespace BLL
{

    public class PurchaseRepository : IPurchaseRepository
    {
        private ComputerRoomSubscription comp;
        private IMapper mapper;

        public PurchaseRepository(ComputerRoomSubscription comp, IMapper mapper)
        {
            this.comp = comp;
            this.mapper = mapper;
        }

        public void AddPurchase(PurchaseDTO purchase)
        {
            Purchase newP = mapper.Map<Purchase>(purchase);
            newP.Print = comp.Packege.Find(newP.PackagesID).Print;
            newP.Minute = comp.Packege.Find(newP.PackagesID).Minute;
            Users u = comp.Users.Find(purchase.UsersID);
            if (u != null)
            {
                List<Purchase> purchaseList = u.Purchase;
                int l = purchaseList.ToArray().Length;
                if (purchaseList != null && l > 0)
                {

                    Purchase lastP = purchaseList.ToArray()[l - 1];
                    newP.Print += lastP.Print;
                    newP.Minute += lastP.Minute;
                    lastP.Minute = 0;
                    lastP.Print = 0;
                    UpdatePurchase(lastP);
                }
            }
            comp.Purchase.Add(newP);
            comp.SaveChanges();
        }

        public void DeletePurchase(int id)
        {
            Purchase p = comp.Purchase.Find(id);
            comp.Remove(p);
            comp.SaveChanges();
        }

        public List<Purchase> GetAllPurchaseByUserId(int id)
        {
            List<Purchase> p = comp.Purchase.Where(pur => pur.UsersID == id).ToList<Purchase>();
            return p;
        }

        public Purchase GetPurchase(int id)
        {
            Purchase p = comp.Purchase.Find(id);
            return p;
        }

        public void UpdatePurchase(Purchase purchase)
        {
            comp.Purchase.Update(purchase);
            comp.SaveChanges();
        }

        public void UpdatePurchaseById(int id)
        {
            Purchase p = comp.Purchase.Find(id);
            comp.Purchase.Update(p);
            comp.SaveChanges();
        }
    }
}
