import axios from "axios";

axios.defaults.baseURL = "https://localhost:7154/api"

export const fetchPurchase = (userid) => axios.get(`/Purchase/getAll/?id=${userid}`)
export const fetchPurchaseImpl = (userid) => axios.get(`/PurchasesImpl/getByUserId/${userid}`)


export const fetchPurchaseById = (parchaseId) => {
   axios.get(`/Purchase/getById/${parchaseId}`)
}

export const postPurchase=(newPurchase)=>axios.post(`/Purchase/add`,newPurchase)
export const postPurchaseImpl=(newPurchaseImpl)=>axios.post(`/PurchasesImpl/add`,newPurchaseImpl)
