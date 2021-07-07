import axios from "axios"

export const getRestaurants = () => {
    return axios.get("https://api.npoint.io/93bed93a99df4c91044e")
}