"use client"
import Btn from "@/component/btns";
import _init_Hero from "@/component/hero";
import Icon from "@/component/icons";
import SizeBox from "@/component/size-box";
import Logo from "@/component/theme/logo1";
import data from "@/data/about.json"
import FeatureData from "@/data/about-app.json"
import { createContext, useContext, useState } from "react";

type ThemeContextType = any | null

const AppContext = createContext<ThemeContextType>({});

export default function Aobut_us() {
    return (
        <div className="flex flex-col">
            <Hero />
            <SizeBox className="   w-full flex flex-col">
                <Feature />
                <SaveAndGet />
            </SizeBox>
        </div>
    )
}

function Hero() {
    return (
        <_init_Hero className=" text-start !h-max " >
            <div className="m-auto my-10 *:rounded-3xl w-full flex justify-center">
                <iframe className="w-full max-w-[560px] sm:h-72" src="https://www.youtube-nocookie.com/embed/2yuIByK7BSw?si=YmTGkrS1nwy-hg6v&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>            </div>
        </_init_Hero>
    )
}

function Feature() {
    let [data, setData] = useState(FeatureData.map((a, i) => {
        return { id: i + 1, title: a, active: i === 0 ? true : false, }
    }))
    let [cover, setCover] = useState("/images/about-app-1.png")
    let len = data.length
    return (
        <AppContext.Provider value={{ data, setData, setCover }} >
            <div className="my-10 bg-white">
                <SizeBox className="   w-full flex flex-col">
                    <div className="flex flex-col items-center m-auto w-[90%] my-10 " >
                        <h2 className="w-full text-start text-5xl font-bold text-safety-700 mr-10 mb-8 ">ميزات تطبيق إنسبكتكس </h2>
                        <p className="text-slate-700 m-4">تطبيق إانسبكتكس هو أحدث نموذج لخدمات فحص المباني، حيث يتم الفحص عن طريق مهندسين متخصصين في مجالاتهم. يعمل كل مهندس بإختصاصه لضمان تقديم خدمة ذات جودة عالية بإستخدام أفضل الأجهزة والتقنيات لضمان دقة الفحص وراحة عملائنا</p>
                    </div>
                    <div className="flex flex-wrap justify-between items-center mb-6 w-full ">
                        <div className="flex flex-col justify-center   w-full  max-w-[450px] m-auto">
                            {data.slice(0, len / 2).map(one => <FeatureOne data={one} layout="start" key={one.id} />)}
                        </div>
                        <img src={cover} alt="" className="w-72 h-max m-auto" />
                        <div className="flex flex-col justify-center w-full  max-w-[450px] m-auto">
                            {data.slice(len / 2, len).map(one => <FeatureOne data={one} layout="end" key={one.id} />)}
                        </div>
                    </div>
                    <div className="flex w-full justify-center ">
                        <Btn to="/#" title="حمل التطبيق الآن" className="text-white bg-safety-700 rounded-lg" />
                    </div>
                </SizeBox>
            </div>
        </AppContext.Provider>
    )
}

type FeatureOneType = {
    id: number,
    title: string,
    active: boolean,
}
function FeatureOne({ data: One, layout }: { data: FeatureOneType; layout: string }) {
    const { data, setData } = useContext(AppContext);
    let handle = () => {
        let all = data.map((a: any, i: any) => {
            return { ...a, active: false }
        })

        let filter = all.filter((a: any) => a.id === One.id)[0]
        filter.active = true
        all[One.id - 1] = filter
        console.log(all);
        setData(all)
    }
    return (
        <div className={` w-full ${One.active ? "" : "opacity-60"}  `} onClick={handle}>
            {layout === "start" && (
                <div className="mr-10 mb-[-60px] relative z-10 w-max border-4 border-[#0694a27a] rounded-full text-center text-xl bt">
                    <p className="bg-[#0694A2] text-white p-4 rounded-full w-[56px] relative z-20 h-[56px] ">{One.id}</p>
                </div>
            )}
            <p className={`bg-prussian-800 text-white py-4 m-4 rounded-full z-10 ${layout === "start" ? " pr-28" : " pl-28 pr-6"} `}>{One.title}</p>
            {layout === "end" && (
                <div className={` w-full flex justify-end mt-[-60px] `}>
                    <div className="ml-10   relative z-10 w-max border-4 border-[#0694a27a]  rounded-full text-center text-xl bt">
                        <p className="bg-[#0694A2] text-white p-4 rounded-full  w-[56px] relative z-20 h-[56px]   ">{One.id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}


function SaveAndGet() {
    return (
        <div className="bg-[url(/images/about-app-2.png)] bg-center bg-no-repeat flex flex-row my-32 w-full h-[550px] justify-between">
            <div className="flex flex-col justify-center">
                <p className="w-full text-start text-5xl font-bold text-prussian-800  mb-8 "> إحفظ حقك و أطلب فحصك,</p>
                <p className="w-full text-start text-5xl font-bold text-safety-700  mb-8 ">مع تطبيق إنسبكتكس </p>
                <p className="w-full text-start   font-bold  mb-8 sm:w-[500px] mt-14 ">تجنب العديد من المشاكل التي تؤدي إلى زيادة مصاريف الصيانة, إرتفاع مستوى الخطر و غيرها من المخالفات عبر خدمة الكشف على العقار و احصل على تقرير مفصل لمساعدتك بإتخاذ قرار واضح و موثوق به. </p>

                <div className="flex justify-start ">
                    <Btn to="/#" title="حمل التطبيق  " className="text-white bg-prussian-800 rounded-lg" />
                </div>
            </div>
            <img src="/images/about-app-3.png" alt="" className="hidden lg:flex ml-20 w-[350px]  !h-max" />
        </div>
    )
}