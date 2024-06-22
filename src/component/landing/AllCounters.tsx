"use server"

import axios from "axios"
import { cookies } from 'next/headers'
import { Counter } from "./AllCountersClient"

async function GetData(): Promise<any> {

    const cookieStore = cookies()
    const all = cookieStore.getAll()
    let Cookie = `${all.map(a => `${a.name}=${a.value}; `)}`.replaceAll(" ,", " ")
    let headers: any = { "Content-Type": "application/json", "Accept-Language": "ar-SA", "Cookie": Cookie }
    return axios.get(`${process.env.NEXT_PUBLIC_API}/Guest/Counters`, { headers })
        .then(({ data }) => { return data })
        .catch((error: Function) => console.log(error))
}
export default async function AllCounters() {
    let data = await GetData()
    data = data?.data

    return (
        <div className="  w-full bg-[#F0F0F0] flex justify-center ">
            <div className=" max-w-[1000px] w-full bg-[#F0F0F0]  ">
                <div className="flex flex-row items-center lap:max-w-[1000px] tap:w-[80%] justify-between my-20 select-none px-3 m-auto">
                    <Counter names="عميل" name="client" conter={data?.clientsCounter || 2221} Default={"0000"} />
                    <Counter names="تقرير" name="report" conter={data?.assessmentsCounter || 23321} Default={"0000"} />
                    <Counter names="زائر" name="visit" conter={data?.visitsCounter || 122611} Default={"00000000"} />
                </div>
            </div>
        </div>
    )
}
