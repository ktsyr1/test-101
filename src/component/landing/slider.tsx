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
        <div className="w-full  min-h-[800px] " >
            <Image src={`/images/${data.bg}`} alt={'Background slide'} fill={true} className="!h-screen !relative" loading="lazy" loader={loaderProp} />
            <div className="flex flex-col m-4 absolute lg:mr-36 sm:mr-10 max-[697px]:top-[228px] top-[178px] " >

                <p className=" text-prussian-800  text-3xl lap:text-6xl"> {data.title}</p>
                <p className="font-black text-safety-700 my-4 text-3xl lap:text-6xl "> {data.titleBold}</p>
                <div className="max-w-[640px] " >
                    <p className="my-8  font-medium text-lg lap:text-2xl"> {data.bio}</p>
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
            <div className="bg-[#001F67] flex flex-col h-[200px] justify-center mt-[-200px] overflow-x-scroll px-4 select-none z-30" >
                <div className="flex flex-row  w-[1000px]  justify-start m-auto lap:justify-center">

                    {timeLine.map(slider => <TimeLineCard data={slider} key={slider.title} />)}
                </div>
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
        <div className={`flex flex-col !h-min text-slate-400  w-[220px] lap:w-[280px] mx-6 ${One.id === data.id ? "*:text-white" : " "}`} onClick={handelOne} >
            <p className=" font-black text-nowrap text-base lap:text-xl">{data.timeLine.title}</p>
            <hr className="w-full my-2 border-2" />
            <hr className={`my-2 border-2 mt-[-12px] text-sm font-medium border-safety-700 w-16 a22  ${One.id === data.id ? "*:text-white" : " "}`} />
            <p className="text-xs font-medium">{data.timeLine.about}</p>
        </div>
    )
}