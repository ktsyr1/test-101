"use client"
import Image from "next/image"
import Icon from "../icons"
import Btn from "../btns"
import { createContext, useContext, useState } from "react"
import { loaderProp } from "../lib"
const AppContext = createContext<any | null>({});

export default function OpenServiceOne({ data, set, navigation }: any) {
    let [select, setSelect] = useState("description") // description , report , ReportingObjectives

    if (!data?.ar) return <></>
    else return (
        <AppContext.Provider value={{ data, setSelect, select }}>
            <div className="*:hover:!fill-[#fff] bg-white border-2 border-white fixed flex flex-col items-center hover:shadow-xl md:my-4 p-6 rounded-3xl shadow-sm max-w-[1000px] w-full z-50  max-[697px]:m-2  max-[697px]:top-[140px] top-[80px] left-0 right-0 m-auto">

                <div className="flex flex-row items-center w-full justify-end" onClick={() => set({})} ><Icon.close /></div>
                <Header data={data} />
                <div className="min-h-[300px] text-start w-full m-4 px-4">
                    {typeof data[select] === 'string' ?
                        data[select] :
                        <div className="flex flex-wrap">
                            {data[select].map((item: any, index: number) => {
                                return <div className="m-4 p-4 border-2 border-[#00A5A5AB] rounded-md w-[46%]" key={index}>{item}</div>
                            })}
                        </div>
                    }
                </div>
                <Footer data={data} navigation={navigation} />

            </div>
        </AppContext.Provider>
    )
}

function Header({ data }: any) {
    let { setSelect: set, select } = useContext(AppContext)
    return (
        <>
            <div className="flex flex-row items-center w-full *:font-bold">
                <Image src={`/icons/gif/${data.icon}`} alt={data.ar} width={90} height={90} className="m-4 mt-0" loading="lazy" loader={loaderProp} />
                <div>
                    <p className="text-xl">{data.ar}</p>
                    <p className="text-[#00A5A5]">{data.en}</p>
                </div>
            </div>

            <div className="flex flex-row w-full" >
                <Btn title="وصف الخدمة" className={`rounded-xl border-2 border-[#F25B06] text-[#F25B06] p-4 ${select == "description" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("description")} />
                <Btn title="لمن التقرير  " className={`rounded-xl border-2 border-[#F25B06] text-[#F25B06] p-4 ${select == "report" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("report")} />
                <Btn title="أهداف التقارير" className={`rounded-xl border-2 border-[#F25B06] text-[#F25B06] p-4 ${select == "ReportingObjectives" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("ReportingObjectives")} />
            </div>
        </>
    )
}

function Footer({ data, navigation }: any) {
    return (
        <div className="flex flex-wrap w-full  rounded-lg justify-between" >
            <NextService data={{ ...data.back }} navigation={navigation} />
            <NextService className="*:text-end justify-between" data={{ ...data.next }} navigation={navigation} />
        </div>
    )
}

function NextService({ data, className, navigation }: any) {

    return (
        <div onClick={() => navigation(data.i)} className={`flex items-center min-w-[300]   ${className ? "flex-row-reverse" : "flex-row "}  ${className}`}>
            <div className={`${className ? "rotate-180" : " "} m-4`}> <Icon.next /> </div>
            <Image src={`/icons/gif/${data.icon}`} alt={data.ar} loading="lazy" width={60} height={60} className="mx-4 p-2 rounded-full border-[1px] border-prussian-600  " loader={loaderProp} />
            <div>
                <p className="text-sm  font-semibold">{data.ar}</p>
                <p className="text-[#00A5A5] text-sm font-semibold">{data.en}</p>
            </div>
        </div>
    )
}