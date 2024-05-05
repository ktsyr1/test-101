"use server"
import axios from "axios"

export default async function GetFatch(url: string, token?: string) {
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API}${url}`, { headers })
        .then(({ data }) => data)
        .catch(error => console.error(error))

}
export const createFatch = async (url: string, body: any, token?: string) => {
    let headers: any = {
        "Content-Type": "application/json"
    }
    if (token) headers["Authorization"] = `Bearer ${token}`

    return axios.post(`${process.env.NEXT_PUBLIC_API}${url}`, body, { headers })
        .then(({ data }) => data)
        .catch(error => console.error(error))

}

