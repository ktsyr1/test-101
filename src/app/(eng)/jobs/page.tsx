"use client"
import Btn from "@/component/btns";
import GetFatch from "@/component/froms/get";
import Icon, { IconArrow } from "@/component/icons";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = any | null

const AppContext = createContext<ThemeContextType>({});

export default function Jobs() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] bg-slate-100" />
            <div className="  items-center   max-w-[1360px]   tap:w-full flex flex-col">
                <ListJobs />
            </div>
        </div>
    )
}

function ListJobs() {

    let [dataD, setDataD] = useState([])
    let [data, setData] = useState(dataD)
    let [t, setT] = useState("جاري التحميل ..")

    let search = (e: any) => {
        let { value } = e.target
        let all = data.filter((a: any) => a?.jobTitle.search(value) >= 0)
        setData(all)
    }
    useEffect(() => {
        GetFatch("/Guest/Careers").then((data: any) => {
            setData(data.data)
            setT("لا يتوفر حاليا أي فرص عمل، و سيتم نشرها على هذه الصفحة فور توافرها.")
        })

    }, [])
    return (
        <AppContext.Provider value={{ data, setData, }} >
            <div className="my-10 bg-white">
                <div className=" items-center w-full max-w-[1360px]    m-auto flex flex-col">
                    <form className="flex flex-row justify-center   tap:w-[80%] lap:w-full  ">
                        <Icon.search className={"ml-[-30px] z-10 m-4"} />
                        <input type="text" className="border-2  rounded-l-none  rounded-r-lg pr-10 w-full" placeholder="بحث" onChange={search} />
                        <input type="submit" value={"أبحث"} className="bg-safety-700 py-4 px-6 text-white rounded-l-lg " />
                    </form>
                    <div className="flex flex-col items-center m-auto w-[90%] tap:my-20 my-6" >
                        <h2 className="w-full text-start lap:text-5xl tap:text-3xl text-xl  font-bold text-safety-700 tap:mr-10 tap:mb-8 ">إنضم إلى فريقنا </h2>
                        <p className="text-slate-700 m-4 w-full lap:text-xl tap:text-base text-sm ">
                            استكشف العديد من فرص العمل في Inspectex
                            انضم إلى فريقنا و كن جزءًا من تشكيل مستقبل مشرق في المجال الهندسي.
                        </p>
                    </div>
                    <div className="w-full tap:w-[80%] lap:w-full">
                        {data.length == 0 && <p className="w-full text-center m-4 min-h-[200px]">{t}</p>}
                        {data?.map((job: any) => <CardJob data={job} key={job?.id} />)}
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    )
}

type CardJobType = {
    jobTitle: string
    workAreaName: string
    departmentName: string
    description: string
    careersQualifications: string[]
}
function CardJob({ data: One }: { data: CardJobType; }) {
    let [open, setOpen] = useState(false)

    return (
        <div className="p-2 lap:p-4 w-full ">
            <div className={` w-full flex flex-col  rounded-3xl p-4 tap:p-6 lap:!m-10 cursor-pointer  ${open ? " bg-white shadow-lg " : " bg-prussian-800  hover:px-5 hover:tap:px-7 "}  `} onClick={() => setOpen(!open)}  >
                <p className={`${open ? "text-safety-700" : " text-white"} lap:text-2xl tap:text-lg text-lg flex items-center`}>{One.jobTitle} </p>
                <div className={`flex flex-row ${open ? "*:text-white *:rounded-full *:bg-prussian-800" : " *:bg-white *:rounded-full *:text-prussian-800 "} `}>
                    <p className="p-4 py-2 my-4 w-full  lap:text-2xl tap:text-lg text-sx flex items-center">{One.departmentName} </p>
                    <p className="  p-4 py-2 m-4 w-max text-nowrap">{One.workAreaName} </p>
                </div>
                {open ? <>
                    <p className="text-safety-700  lap:text-3xl tap:text-xl text-base mt-8 mb-6">عن الوظيفة</p>
                    <p className="max-w-[1000px] lap:text-lg tap:text-lg text-sx mt-8 mb-6">{One.description} </p>
                    <p className="text-safety-700 text-3xl  mt-8 mb-6">المتطلبات والمؤهلات</p>
                    {One.careersQualifications.map((queueMicrotask: any) => (
                        <div className="flex flex-row" key={queueMicrotask?.qualificationName}>
                            <Icon.Bag size={20} className={'m-4'} />
                            <p className={'my-4'} >{queueMicrotask?.qualificationName}</p>
                        </div>
                    ))}
                    <Btn title={"تقدم بالطلب"} childSort="end" className="bg-white m-20 rounded-full hover:bg-safety-700 hover:text-white *:hover:fill-white group border-2 border-safety-700 justify-between text-prussian-800"  >
                        <IconArrow color={"#032DA6"} className={'  *:group-hover:fill-white'} />
                    </Btn>
                </> : <></>}
            </div>
        </div >
    );
} 