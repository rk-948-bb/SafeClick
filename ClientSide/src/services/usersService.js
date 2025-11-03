import axios from "axios";

axios.defaults.baseURL = "https://localhost:7154/api"


export const fetchUserById = (userName) => axios.get(`/Users/getById/${userName}`)

export const signUp = (newUser) => axios.post(`/Users/add`, newUser)

export const logIn = (user) => axios.post(`/Users/loginUser`, user)

