"use server"

import axios from "axios"
import GetFatch from "../froms/get"
// import { useEffect, useState } from "react"

export default async function AllCounters() {
    let views = 0
    let {data} = await GetFatch("/Guest/Counters")

    return (
        <div className=" max-w-[1000px] w-full">
            <div className="flex flex-row lap:max-w-[1000px] w-[80%] justify-between my-20 select-none px-3 m-auto">
                <Counter name="عميل" conter={data.clientsCounter} />
                <Counter name="تقرير" conter={data.assessmentsCounter} />
                <Counter name="زائر" conter={data.visitsCounter} />
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