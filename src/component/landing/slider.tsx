"use client"

import Image from "next/image"
import Btn from "../btns"
import { IconArrow } from "../icons"
import { createContext, useContext, useEffect, useState } from "react"
import SlidesData from "@/data/Sliders.json"
import { loaderProp } from "../lib"

const ThemeContext = createContext<any | null>({});
const TimeLineContext = createContext<any | null>({});

export default function Sliders() {

    let [data, setData] = useState(SlidesData)
    let [One, setOne] = useState(data[2])

    return (
        <ThemeContext.Provider value={{ data, setOne, One }}>
            <div className=" w-full flex flex-col h-min bg-no-repeat bg-contain min-h-[800px] " >
                <SliderFullData />
                <TimeLine />
            </div>
        </ThemeContext.Provider>
    )
}

function SliderFullData() {
    const { setOne, One: data } = useContext(ThemeContext);

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    let style = {
        border: '2px solid',
        borderImage: 'linear-gradient(90deg, #001F67 0%, #019D9A 10.94%, #FF5A1F 46.88%, #1D7FDA 100%)',
        borderImageSlice: '1'
    }
    if (!data?.title) return <></>
    return (
        <div className="w-full " >
            <Image src={`/images/${data.bg}`} alt={'Background slide'} fill={true} className="!h-min !relative" loading="lazy" loader={loaderProp} />
            <div className="flex flex-col m-4 absolute  lg:mr-36 sm:mr-10    max-[697px]:top-[228px] top-[178px]" >

                <p className="text-6xl     text-prussian-800"> {data.title}</p>
                <p className="text-6xl font-black text-safety-700 my-4 "> {data.titleBold}</p>
                <div className="max-w-[640px] " >
                    <p className="my-8 text-2xl font-semibold"> {data.bio}</p>
                    <div onMouseEnter={enter} onMouseLeave={leave} className="my-3 p-0">
                        <Btn title={data.btn.title} to={data.btn.to} childSort="end" className="bg-white m-0 rounded-lg hover:bg-safety-700 hover:text-white *:hover:fill-white " style={style} >
                            <IconArrow color={btnHover ? "#fff" : "#032DA6"} className={'mr-40'} />
                        </Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}

// state { valueLine , active , }
function TimeLine(props: any) {
    const { setOne, One } = useContext(ThemeContext);
    let [timeLine, setTimeLine] = useState(SlidesData)

    return (
        <TimeLineContext.Provider value={{ "data": "" }}>
            <div className="h-[200px] mt-[-200px]  bg-[#001F67] w-full flex flex-row justify-center z-30 pt-[50px]">
                {timeLine.map(slider => <TimeLineCard data={slider} key={slider.title} />)}
            </div>
        </TimeLineContext.Provider>
    )
}

function TimeLineCard({ data }: any) {
    const { setOne, One, data: all } = useContext(ThemeContext);
    const test = useContext(TimeLineContext);

    function handelOne() {
        let newOne = all.filter((a: any) => a.id === data.id)[0]
        setOne(newOne)
    }

    return (
        <div className={`flex flex-col !h-min text-slate-400 w-[280px] mx-6 ${One.id === data.id ? "*:text-white" : " "}`} onClick={handelOne} >
            <p className="text-xl font-black">{data.timeLine.title}</p>
            <hr className="w-full my-2 border-2" />
            <hr className={`my-2 border-2 mt-[-12px] text-sm font-medium border-safety-700 w-16  a22  ${One.id === data.id ? "*:text-white" : " "}`} />
            <p className="text-xs">{data.timeLine.about}</p>
        </div>
    )
}