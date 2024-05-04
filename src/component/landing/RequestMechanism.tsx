"use client"
import Link from "next/link"
import Icon, { IconArrow } from "../icons"
import { useContext, useState } from "react"
import Btn from "../btns"
import { createContext } from "react";
import Image from "next/image"
import SizeBox from "../size-box"

type ThemeContextType = any | null

const ThemeContext = createContext<ThemeContextType>({});

export default function RequestMechanism() {
    let [data, setData] = useState(list)
    let [One, setOne] = useState(list[0])


    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)

    return (
        <div className=" min-h-[300px] tap:px-20 py-10  p-4 w-full bg-white ">
            <h1 className="w-full text-start font-black text-safety-700 m-auto p-10 max-w-[1360px] text-3xl lap:text-6xl">آلية العمل</h1>
            <ThemeContext.Provider value={{ data, setOne, One }}>
                <SizeBox>

                    <div className="flex flex-col m-auto max-w-[1360px] rounded-[50px] shadow-xl bg-no-repeat bg-none lg:bg-[url(/images/bg-1.webp)] w-full"  >
                        <div className="flex flex-row justify-between" >
                            <div className="p-6 lg:!w-[50%] w-full select-none"  >
                                <Header />
                                <Navigation />
                                <ListLine />
                                <div onMouseEnter={enter} onMouseLeave={leave} > 
                                    <Btn to={"#"} title=" أطلب الخدمة الآن" childSort="end" className="mt-12 border-2 border-safety-700 hover:bg-safety-700 hover:text-white hover:*:!fill-white  rounded-2xl bg-white text-prussian-800 " >
                                        <IconArrow className={'mr-16'} color={btnHover ? "#fff" : "#032DA6"} />
                                    </Btn>
                                </div>
                            </div>
                            {/* images */}
                            {/* <img src={`/images/${One.icon}`} alt={One.title} className="w-[40%] lg:flex hidden" /> */}
                        </div>
                        <div className="h-24  bg-blue-900 rounded-br-[40px]" ></div>
                    </div>
                </SizeBox>
            </ThemeContext.Provider>
        </div>
    )
}

function ListLine() {
    const { setOne, One, data } = useContext(ThemeContext);
    return (
        <div  >
            <div className="flex flex-row w-full justify-between" >
                {/* 4 staps  */}
                {[1, 2, 3, 4].map(i => <p key={i} onClick={() => setOne(data[i - 1])} className={`rounded-full border-2 cursor-pointer  border-safety-700 p-[10px] w-12 h-12 text-center hover:bg-safety-700 hover:text-white ${One.id == i ? "bg-safety-700 text-white text-2xl font-normal  !p-2" : "bg-white"}`}>{i}</p>)}
            </div>
            <hr className="border-2 border-safety-700 mt-[-27px] mb-[27px] w-[95%]" />
        </div>
    )
}
// navigation
function Navigation() {
    const { setOne, One, data } = useContext(ThemeContext);
    function handler(type: string) {

        let id: number = One.id
        let init: any = {
            back: id - 1,
            next: id + 1,
        }
        setOne(data[init[type] - 1]);
    }
    return (
        <div className="flex flex-row justify-between my-12 ">
            <div onClick={() => handler("back")} >
                {One.id !== 1 ? <Icon.nextArrow className={"hover:p-1 cursor-pointer "} /> : <></>}
            </div>
            <div onClick={() => handler("next")} >
                {One.id !== 4 ? <Icon.nextArrow className={'rotate-180 hover:p-1 cursor-pointer '} /> : <></>}

            </div>
        </div>
    )
}

function Header() {
    const { One: data } = useContext(ThemeContext);
    return (
        <>
            <p className="text-safety-700 py-4 tap:text-2xl  text-xl font-semibold">{data.stap}</p>
            <b className="text-blue-800 tap:text-3xl py-8   text-2xl  font-extrabold ">{data.title} </b>
            <p className="min-h-36  py-8 tap:text-xl font-medium  text-lg  ">{data.bio} </p>
        </>
    )
}
let list = [
    {
        id: 1,
        stap: "الخطوة الاولى",
        title: "الزيارة الميدانية",
        bio: "  يتم عمل زيارة معاينة لموقع المشروع وإعداد استبيان بالطلبات والخدمات المُحتاجة.",
        icon: "bg-a2.webp",
        link: "",
    }, {
        id: 2,
        stap: "الخطوة الثانية",
        title: "إعداد العرض الفني والمالي",
        bio: " يتم إعداد العرض المالي موضحاً به جميع الخدمات المقدمة.",
        icon: "Location 1.webp",
        link: "",
    }, {
        id: 3,
        stap: " الخطوة الثالثة",
        title: "عملية الفحص",
        bio: "يتم إعداد عملية الفحص وفقاً لخطة العمل المرفقة مع العرض الفني والمالي. ",
        icon: "bUILDING 1.webp",
        link: "",
    }, {
        id: 4,
        stap: "الخطوة الرابعة",
        title: " إصدار التقرير",
        bio: "وهي المرحلة النهائية التي تعكس نتائج الفحوصات وتحليلها وتشمل التوصيات الواجب العمل بها، ويرتبط عادة بها قيم الإصلاحات الواجب تنفيذها، والتي ينبثق عنها تقرير حالة الصيانة PCR (Property Condition Report)",
        icon: "lIST 1.webp",
        link: "",
    },
]