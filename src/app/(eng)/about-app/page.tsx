"use client"
import Btn from "@/component/btns";
import _init_Hero from "@/component/hero";
import FeatureData from "@/data/about-app.json"
import { createContext, useContext, useState } from "react";

type ThemeContextType = any | null

const AppContext = createContext<ThemeContextType>({});

export default function Aobut_us() {
    return (
        <div className="flex flex-col select-none">
            {/* <Hero /> */}
            <div className="  flex items-center   max-w-[1360px]  max-w-[1000px]:m-4 m-auto tap:w-full   flex-col">
                <Feature />
                <SaveAndGet />
            </div>
        </div>
    )
}

function Hero() {
    return (
        <_init_Hero className=" text-start !h-max " >
            <div className="m-auto my-10 *:rounded-3xl w-full flex justify-center">
                <iframe className="tap:w-full h-[168px] max-w-[560px]  min-[700px]:h-72" src="https://www.youtube-nocookie.com/embed/2yuIByK7BSw?si=YmTGkrS1nwy-hg6v&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>            </div>
        </_init_Hero>
    )
}

function Feature() {
    let [data, setData] = useState(FeatureData)
    let [cover, setCover] = useState(data[0].image)
    let len = data.length
    return (
        <AppContext.Provider value={{ data, setData, setCover }} >
            <div className="tap:my-10 bg-white mx-4">
                <div className="  flex items-center  max-[1000px]:m-4   !m-0 flex-col max-w-[1000px] lap:max-w-[1360px]">
                    <div className="flex flex-col items-center m-auto tap:w-[90%] my-10 " >
                        <h2 className="w-full text-center lap:text-5xl tap:text-3xl text-xl font-bold text-safety-700 tap:mr-10 tap:mb-8 ">ميزات تطبيق إنسبكتكس </h2>
                        <p className="text-slate-700 tap:m-4 my-4 lap:text-2xl tap:text-base text-sm">تطبيق إانسبكتكس هو أحدث نموذج لخدمات فحص المباني، حيث يتم الفحص عن طريق مهندسين متخصصين في مجالاتهم. يعمل كل مهندس بإختصاصه لضمان تقديم خدمة ذات جودة عالية بإستخدام أفضل الأجهزة والتقنيات لضمان دقة الفحص وراحة عملائنا</p>
                    </div>
                    <div className="flex flex-col tap:flex-row justify-between items-center mb-6 lap:w-full ">
                        <div className="flex flex-col justify-center w-full lap:w-[450px] tap:w-[350px] lap:m-auto">
                            {data.slice(0, len / 2).map(one => <FeatureOne data={one} layout="start" key={one.id} set={setCover} />)}
                        </div>
                        <img src={cover} alt="" className="  m-auto tap: h-[350px]  " loading="lazy" />
                        <div className="flex flex-col justify-center w-full lap:w-[450px] tap:w-[350px] lap:m-auto">
                            {data.slice(len / 2, len).map(one => <FeatureOne data={one} layout="end" key={one.id} set={setCover} />)}
                        </div>
                    </div>
                    <div className="flex w-full justify-center ">
                        <Btn to="/#" title="حمل التطبيق الآن" className="text-white bg-safety-700 rounded-lg" />
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    )
}

type FeatureOneType = {
    id: number,
    title: string,
    active: boolean,
    image: string
}
function FeatureOne({ data: One, layout, set }: { data: FeatureOneType; layout: string, set: Function }) {
    const { data, setData } = useContext(AppContext);
    let handle = () => {
        let all = data.map((a: any, i: any) => {
            return { ...a, active: false }
        })
        set(One.image)
        let filter = all.filter((a: any) => a.id === One.id)[0]
        filter.active = true
        all[One.id - 1] = filter
        console.log(all);
        setData(all)
    }
    return (
        <div className={` flex items-center lap:w-full bg-prussian-800 rounded-full my-4 ${One.active ? "" : "opacity-60"} flex ${layout == "start" ? 'flex-row ' : "flex-row-reverse"} `} onClick={handle}>
            <div className=" border-4 border-[#0694a27a] rounded-full text-center text-xl ">
                <p className="bg-[#0694A2] p-2 rounded-full text-white w-[45px] top:w-[56px] h-[45px] top:h-[56px] z-20 ">{One.id}</p>
            </div>
            <p className={`text-white pr-6  w-full lap:text-lg tap:text-sm ${layout === "start" ? " " : " "} `}>{One.title}</p>
        </div>
    );
}


function FeatureOne2({ data: One, layout }: { data: FeatureOneType; layout: string }) {
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
        <div className={` lap:w-full ${One.active ? "" : "opacity-60"}  `} onClick={handle}>
            {layout === "start" && (
                <div className="mr-6 mb-[-50px] relative z-10 w-max border-4 border-[#0694a27a] rounded-full text-center text-xl bt ">
                    <p className="bg-[#0694A2] text-white p-4 rounded-full w-[56px] relative z-20 h-[56px]  ">{One.id}</p>
                </div>
            )}
            <p className={`bg-prussian-800 text-white py-4 my-4 mx-0 rounded-full tap:max-w-[350px] lap:text-xl tap:text-base lap:w-full text-sm z-10 h- ${layout === "start" ? " tap:pr-24 pr-24" : " pl-28 pr-6"} `}>{One.title}</p>
            {layout === "end" && (
                <div className={` w-full flex justify-end mt-[-50px] `}>
                    <div className="ml-6 relative z-10 w-max border-4 border-[#0694a27a] rounded-full text-center text-xl bt">
                        <p className="bg-[#0694A2] text-white p-4 rounded-full w-[56px] relative z-20 h-[56px] ">{One.id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}


function SaveAndGet() {
    return (
        <div className="bg-[url(/images/about-app-2.webp)] bg-center bg-no-repeat flex flex-row my-32 w-full h-[550px] justify-between m-4">
            <div className="flex flex-col justify-center p-8">
                <p className="w-full text-start lap:text-5xl tap:text-3xl text-2xl font-bold text-prussian-800 tap:mb-8 mb-4"> إحفظ حقك و أطلب فحصك,</p>
                <p className="w-full text-start lap:text-5xl tap:text-3xl text-2xl font-bold text-safety-700 tap:mb-8 mb-4">مع تطبيق إنسبكتكس </p>
                <p className="w-full text-start font-bold mb-8 tap:w-[500px] mt-14 text-slate-800">تجنب العديد من المشاكل التي تؤدي إلى زيادة مصاريف الصيانة, إرتفاع مستوى الخطر و غيرها من المخالفات عبر خدمة الكشف على العقار و احصل على تقرير مفصل لمساعدتك بإتخاذ قرار واضح و موثوق به. </p>

                <div className="flex justify-start ">
                    <Btn to="/#" title="حمل التطبيق  " className="text-white bg-prussian-800 rounded-lg w-[175px]   " />
                </div>
            </div>
            <img src="/images/about-app-3.webp" alt="" className="hidden lg:flex ml-20 w-[350px] !h-max" loading="lazy" />
        </div>
    )
}
