import axios from "axios";

axios.defaults.baseURL = "https://localhost:7154/api"

export const fetchPackages =() =>axios.get("/Package/getAll")


export const fetchPackagesById = (packageId) => {
   axios.get(`/Package/getById/${packageId}`)
}

export const addPackage=(newPackage)=>{
axios.post(`/Package/add`,newPackage)
}
