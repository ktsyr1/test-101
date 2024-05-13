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
            <div className="absolute tap:p-4  max-w-[1000px] w-full z-50 left-0 m-auto max-[697px]:top-[140px] top-[80px] select-none right-0">
                <div className="*:hover:!fill-[#fff] bg-white border-2 border-white   flex flex-col items-center hover:shadow-xl md:my-4 p-6 rounded-3xl shadow-sm max-w-[1000px] w-full z-50  max-[697px]:m-2  ">

                    <div className="flex flex-row items-center w-full justify-end cursor-pointer" onClick={() => set({})} ><Icon.close /></div>
                    <Header data={data} />
                    <div className=" min-h-[100px] text-start w-full m-4 px-4">
                        {typeof data[select] === 'object' &&
                            <div className="flex flex-wrap">
                                {data[select].map((item: any, index: number) => {
                                    return <div className="m-4 p-4 border-2 border-[#00A5A5AB] rounded-md w-[46%]" key={index}>{item}</div>
                                })}
                            </div>
                        }
                        {select === 'description' && <div className="flex flex-col" dangerouslySetInnerHTML={{ __html: data[select] }} />}
                    </div>
                    <Footer data={data} navigation={navigation} />

                </div>
            </div>
        </AppContext.Provider>
    )
}

function Header({ data }: any) {
    let { setSelect: set, select } = useContext(AppContext)
    return (
        <>
            <div className="flex flex-row items-center w-full *:font-bold">
                <Image src={`/icons/gif/${data.icon}`} alt={data.ar} width={90} height={90} className="m-4 mt-0 " loading="lazy" loader={loaderProp} />
                <div>
                    <p className="lap:text-xl tap:text-base text-sm ">{data.ar}</p>
                    <p className="text-[#00A5A5] lap:text-xl tap:text-base text-sm">{data.en}</p>
                </div>
            </div>

            <div className="flex flex-row w-full" >
                <Btn title={data.icon != "planet-earth.png" ? "وصف الخدمة" : "الفحوصات الإنشائية والبيئية"} className={`${data.icon == "planet-earth.png" && "!min-w-[200px]"} lap:text-xl tap:text-base *:text-xs  rounded-xl border-2 border-[#F25B06] text-[#F25B06] tap:p-4 p-2  hover:bg-safety-700 hover:text-white   cursor-pointer ${select == "description" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("description")} />
                <Btn title={data.icon != "planet-earth.png" ? "لمن التقرير  " : "الفحوصات الكهربائية"} className={` lap:text-xl tap:text-base *:text-xs  rounded-xl border-2 border-[#F25B06] text-[#F25B06] tap:p-4 p-2  hover:bg-safety-700 hover:text-white   cursor-pointer ${select == "report" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("report")} />
                <Btn title={data.icon != "planet-earth.png" ? "أهداف التقارير" : "الفحوصات الميكانيكية"} className={` lap:text-xl tap:text-base *:text-xs  rounded-xl border-2 border-[#F25B06] text-[#F25B06] tap:p-4 p-2 hover:bg-safety-700 hover:text-white   cursor-pointer  ${select == "ReportingObjectives" ? "bg-safety-700 text-white w-full" : ""}`} onClick={() => set("ReportingObjectives")} />
            </div>
        </>
    )
}

function Footer({ data, navigation }: any) {
    return (
        <div className="flex flex-wrap w-full  rounded-lg justify-between" >
            <NextService data={{ ...data.back }} navigation={navigation} />
            <div className="w-full tap:w-max ">
                <NextService className="*:text-end justify-between max-w-max" data={{ ...data.next }} navigation={navigation} />
            </div>
        </div>
    )
}

function NextService({ data, className, navigation }: any) {

    return (
        <div onClick={() => navigation(data.i)} className={`flex items-center tap:min-w-[300]  cursor-pointer hover:mx-1 my-4 ${className ? "flex-row-reverse  right-0 " : "flex-row right-0"}  ${className}`}>
            <div className={`${className ? "rotate-180 " : " "} m-4`}> <Icon.next /> </div>
            <Image src={`/icons/gif/${data.icon}`} alt={data.ar} loading="lazy" width={60} height={60} className="mx-4 tap:p-2 p-4    rounded-full border-[1px] border-prussian-600  " loader={loaderProp} />
            <div>
                <p className="tap:text-sm text-xs  font-semibold">{data.ar}</p>
                <p className="text-[#00A5A5] tap:text-sm text-xs font-semibold">{data.en}</p>
            </div>
        </div>
    )
}