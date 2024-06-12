"use server"

import axios from "axios"
import { cookies } from 'next/headers'
async function GetData(token?: string): Promise<any> {

    const cookieStore = cookies()
    const all = cookieStore.getAll()
    console.log(all);
    let Cookie = `${all.map(a => `${a.name}=${a.value}; `)}`.replaceAll(" ,", " ")
    let headers: any = { "Content-Type": "application/json", "Accept-Language": "ar-SA", "Cookie": Cookie }
    console.log(headers);

    return axios.get(`${process.env.NEXT_PUBLIC_API}/Guest/Counters`, { headers })
        .then(({ data }) => data)
        .catch((error: Function) => console.log(error))
}
export default async function AllCounters() {
    let data = await GetData()
    data = data?.data

    return (
        <div className=" max-w-[1000px] w-full">
            <div className="flex flex-row lap:max-w-[1000px] w-[80%] justify-between my-20 select-none px-3 m-auto">
                <Counter name="عميل" conter={data?.clientsCounter} />
                <Counter name="تقرير" conter={data?.assessmentsCounter} />
                <Counter name="زائر" conter={data?.visitsCounter} />
            </div>
        </div>
    )
}

export async function Counter({ name, conter }: any) {
    return (
        <div className="lap:border-8 tap:border-6 border-4 border-safety-700 rounded-full">
            <div className="flex flex-col rounded-full bg-gradient-to-r from-[#013035] to-[#0694A2] lap:w-44 tap:w-28 w-16 lap:h-44 tap:h-28  h-16 items-center justify-center text-center lap:*:text-4xl tap:*:text-xl *:text-sm text-white font-bold m-1" >
                <p className="">{conter}</p>
                <p className="">{name}</p>
            </div>
        </div>
    )
}