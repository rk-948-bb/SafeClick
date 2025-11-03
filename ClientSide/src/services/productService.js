import axios from "axios";

axios.defaults.baseURL = "https://localhost:7154/api"

export const fetchProduct = () => axios.get("/Product/getAll")

export const fetchProductByCity = (id) => axios.get(`/Product/getAllByCity/${id}`)


export const fetchProductById = (productId) => {
    axios.get(`/Product/getById/${productId}`)
}

export const postProduct = (newProduct) => {
    axios.post(`/Product/add`, newProduct)
}