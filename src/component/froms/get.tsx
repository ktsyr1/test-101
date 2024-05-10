"use server"
import axios from "axios"
import { cookies } from "next/headers"

export default async function GetFatch(url: string, token?: string): Promise<any> {
    let headers: any = { "Content-Type": "application/json" }
    if (token) headers["Authorization"] = `Bearer ${token}`
    // console.log({ url, token });

    return axios.get(`${process.env.NEXT_PUBLIC_API}${url}`, { headers })
        .then(({ data }) => {
            // console.log(data);
            return data
        })
        // .catch((error: Function) => refreshToken(GetFatch(url, token)))
}
export const createFatch = async (url: string, body: any, token?: string): Promise<any> => {
    let headers: any = { "Content-Type": "application/json" }
    if (token) headers["Authorization"] = `Bearer ${token}`
    return axios.post(`${process.env.NEXT_PUBLIC_API}${url}`, body, { headers })
        .then(({ data }) => {
            console.log(data);
            return data
        })
        // .catch((error: Function) => refreshToken(createFatch(url, body, token)))

}

export const createInvester = async ({ data }: any): Promise<any> => {
    return axios.post(`${process.env.NEXT_PUBLIC_API}/Inspector/InspectorJoinRequest`, data.formData)
        .then(({ data }) => {
            console.log(data);
            return data
        })
        .catch((error: Function) => console.log({ error }))
}


function refreshToken(fun: any) {
    try {
        return axios.post(`${process.env.NEXT_PUBLIC_API}/Authorization/RefreshToken`, { refreshToken: cookies().get("refreshToken")?.value })
            .then(res => {
                if (res?.data.status) {
                    cookies().set("userToken", res.data.data.userToken)
                    // fun()
                }
            })
    } catch (error) {
        console.log(error);

    }

}
