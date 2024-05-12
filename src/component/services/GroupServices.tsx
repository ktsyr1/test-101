"use client"
import { Suspense, useState } from "react"
import dataServices from '@/data/services.json'
import OpenServiceOne from "./serviceOne"
import CardService from "./CardService"
import { useRouter, useSearchParams } from "next/navigation"

export default function GroupServices({ data, type }: any) {
    let route = useRouter()
    const searchParams: any = useSearchParams()
    let [All, setO] = useState(() => dataServices.map((service, i) => { return { ...service, i } }))
    let Select = (i: number) => {

        let length = dataServices.length - 1
        let back: number = i - 1
        let next: number = i + 1
        if (i === 0) back = length
        if (i == length) next = 0
        return { next, back }
    }
    let One = () => {
        let fitter = All.filter(a => a.ar === searchParams.get("name"))
        if (fitter.length > 0) {
            let select = Select(fitter[0].i)
            return { ...All[fitter[0].i], back: All[select.back], next: All[select.next], }
        } else return {}

    }
    let [ServiceOne, setServiceOneData] = useState(One)

    // start functions
    const setServiceOne = (One: any) => navigation(One.i)

    const navigation = (i: number) => {
        let select = Select(i)
        let One: any = { ...All[i], back: All[select.back], next: All[select.next], }
        setServiceOneData(One)
    }
    // end functions

    return (
        <Suspense>
            <div className=" min-h-[300px] tap:px-20 py-10 w-full z-10">
                <OpenServiceOne data={ServiceOne} set={setServiceOne} navigation={navigation} />
                <div className="flex flex-wrap  max-w-[1360px] m-auto justify-center" >
                    {dataServices.map((service, i) => <CardService type={type} data={{ ...service, i }} key={service.ar} set={setServiceOne} />)}
                </div>
            </div>
        </Suspense>
    )
}
