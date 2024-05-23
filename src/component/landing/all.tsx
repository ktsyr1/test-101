"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function AllCounters() {
    let [views, setViews] = useState(0)
    useEffect(() => {
        async function data() {
            // let { data } = await axios.get('/api/ga')
            // setViews(data?.rows[0]?.metricValues[0]?.value);

        }
        data()
    })
    return (
        <div className=" max-w-[1000px] w-full">
            <div className="flex flex-row lap:max-w-[1000px] w-[80%] justify-between my-20 select-none px-3 m-auto">
                <Counter name="عميل" conter="0" />
                <Counter name="تقرير" conter="0" />
                <Counter name="زائر" conter={views ? views : 0} />
            </div>
        </div>
    )
}

export function Counter({ name, conter }: any) {
    return (
        <div className="lap:border-8 tap:border-6 border-4 border-safety-700 rounded-full">
            <div className="flex flex-col rounded-full bg-gradient-to-r from-[#013035] to-[#0694A2] lap:w-44 tap:w-28 w-16 lap:h-44 tap:h-28  h-16 items-center justify-center text-center lap:*:text-4xl tap:*:text-xl *:text-sm text-white font-bold m-1" >
                <p className="">{conter}</p>
                <p className="">{name}</p>
            </div>
        </div>
    )
}