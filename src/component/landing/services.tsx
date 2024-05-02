"use client"
import Link from "next/link"
import { IconArrow } from "../icons"
import { useState } from "react"
import dataServices from '@/data/services.json'
import OpenServiceOne from "../services/serviceOne"
import Image from "next/image"
import { loaderProp } from "../lib"

export default function Services() {
    // end functions

    return (
        <div className=" min-h-[300px] py-10 w-full bg-[#F0F0F0] px-4 tap:px-20">

            <h1 className="w-full text-start font-black text-safety-700 m-auto max-w-[1360px] text-3xl lap:text-6xl ">خدمــــــــاتنا</h1>
            <GroupServices data={dataServices} type="landing" />
            <Btn2 />
        </div>
    )
}

function Btn2() {
    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)

    return (
        <Link className={`flex flex-row items-center shadow-lg my-3 p-3 max-w-[500px] m-auto rounded-full bg-white mt-[30px] justify-between px-7 hover:bg-safety-700 *:hover:!text-white`}
            href={"/services"}
            onMouseEnter={enter}
            onMouseLeave={leave}
        >
            <div></div>
            <b className="  flex items-end justify-center shrink-0 px-4 text-[#032DA6]">  المزيد</b>

            <IconArrow color={btnHover ? "#fff" : "#032DA6"} />
        </Link>
    )
}

export function GroupServices({ data, type }: any) {
    let [All, setO] = useState(() => dataServices.map((service, i) => { return { ...service, i } }))
    let [ServiceOne, setServiceOneData] = useState({})
    // start functions
    let Select = (i: number) => {

        let length = dataServices.length - 1
        let back: number = i - 1
        let next: number = i + 1
        if (i === 0) back = length
        if (i == length) next = 0
        return { next, back }
    }
    const setServiceOne = (One: any) => navigation(One.i)

    const navigation = (i: number) => {
        let select = Select(i)
        let One: any = { ...All[i], back: All[select.back], next: All[select.next], }
        setServiceOneData(One)
    }
    // end functions

    return (
        <>
            <div className=" min-h-[300px] px-20 py-10 w-full z-10">
                <OpenServiceOne data={ServiceOne} set={setServiceOne} navigation={navigation} />
                <div className="flex flex-wrap  max-w-[1360px] m-auto justify-center" >
                    {dataServices.map((service, i) => <CardService type={type} data={{ ...service, i }} key={service.ar} set={setServiceOne} />)}
                </div>
            </div>
            {type === "page" ? <div className="h-[200px] bg-prussian-800  mt-[-120px]" /> : <></>}
        </>
    )
}
type CardType = {
    data: {
        icon: string
        ar: string
        en: string
        i: any
        description: string
        report: string[]
        ReportingObjectives: string[]
    }
    type: string
    set: Function
}
// color en 
export function CardService({ data, set, type }: CardType) {

    return (
        <div className="group flex flex-col items-center *:hover:!fill-[#fff]  shadow-sm hover:shadow-xl hover:border-2 hover:border-[#00A5A5] bg-white text-[#002D9C] justify-center rounded-3xl m-1 py-8 p-6 border-2 w-[240px] h-[240px] lap:w-[330px] " >

            <div onClick={() => set(data)} className="flex flex-col  items-center   group-hover:hidden justify-center rounded-3xl m-1 py-8 p-6 w-[240px]  lap:w-[330px]" >
                <Image src={`/icons/gif/${data.icon}`} alt={data.ar} width={90} height={90} className="m-4 mt-0" loading="lazy" loader={loaderProp} />
                <p className="text-center font-bold leading-tight tracking-normal text-base lap:text-xl ">{data.ar}</p>
                <p className={`text-center font-bold    leading-tight tracking-normal   ${type === "page" ? "text-[#00A5A5]" : " "} text-base lap:text-xl`}>{data.en}</p>

            </div>
            <Link href={`/services?name=${data.ar}`} className="  flex-col group items-center  hidden group-hover:flex group-hover:m-0 justify-center rounded-3xl py-8 p-6 h-[260px] text-center  text-sm  w-[240px] lap:w-[330px]"  >
                {data.report.map((a: any) => <p key={a}>{a}</p>)}
                {/* {data.report.join("  ,  ")} */}
            </Link>
        </div>
    )
}
