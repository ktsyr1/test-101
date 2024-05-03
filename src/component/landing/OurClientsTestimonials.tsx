"use client"

import Link from "next/link";
import Icon, { IconArrow } from "../icons";
import { useState } from "react";

export default function OurClientsTestimonials() {
    let [one, setOne] = useState(clints[0])
    return (
        <div className=" flex flex-col items-center w-full bg-white pb-16">
            <div className=" flex flex-col items-center w-full lap:max-w-[1360px] max-w-[1000px] ">
                <Header />
                <div className=" flex flex-col items-center justify-center  w-full ">
                    <Gallery data={one} />
                    <hr className="border-2 border-safety-700 w-full mt-6" />
                    <div className="flex flex-row items-start my-4 w-full">
                        <IconArrow color={"#34d399"} className={"fill-emerald-400 rotate-180"} />

                        <div className="flex flex-row mx-2 justify-between w-full overflow-x-scroll lap:overflow-x-hidden  ">
                            {clints.map(clint => <img src={clint.image} alt={clint.name} loading="lazy" className={` mx-2 hover:shadow-lg rounded-2xl lap:h-[100px] h-[80px] hover:grayscale-0	cursor-pointer  hover:border-4 hover:border-safety-700  ${clint.name !== one.name && "grayscale"}  `} key={clint.image} onClick={() => setOne(clint)} />)}
                        </div>
                        <IconArrow color={"#34d399"} className={"fill-emerald-400  "} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function Gallery({ data }: { data: OurClientsTestimonialsCardType }) {
    return (
        <div className="flex mt-4 px-8 flex-col  tap:flex-row justify-center ">
            <img src={data.image} alt={`صورة ${data.name}`} className="w-96 h-max rounded-3xl m-auto hover:shadow-lg" loading="lazy" />
            <Icon.Coteshen className={'mt-[-33px] mr-[-50px] hidden md:flex m-4'} />
            <div className="flex flex-col">
                <div className="flex flex-row items-center tap:mb-8 w-full my-4 justify-between max-w-[500px]">
                    <h2 className="lap:px-4 text-xl font-bold text-safety-700 tap:mr-16 ml-10 ">{data.name}</h2>
                    <Rank data={data.rank} />
                </div>
                <p className="tap:py-8 py-4 lap:text-xl text-base ">{data.content}</p>
            </div>
        </div>
    )
}
function Rank({ data }: any) {
    let [list, setList] = useState([1, 2, 3, 4, 5])

    return (
        <div className="flex flex-row" >
            {list.map(a => <Icon.Star color={data >= a ? "#FFAE43" : "#DAE0E6"} key={a} />)}
        </div>
    )
}
interface OurClientsTestimonialsCardType {
    name: string;
    rank: number;
    content: string;
    image: string;
}

function Header() {
    return (
        <div className="flex flex-row items-center justify-between px-4 mt-14 w-full">
            <h2 className="text-safety-700 lap:text-4xl font-bold  text-2xl max-[700px]:text-2xl ">شهادات عملائنا</h2>
            {/* <Link href="blog" className="flex flex-row justify-center items-center rounded-full px-4  " >
                <p className="lap:p-3 text-emerald-400 font-normal lap:text-2xl  text-lg  p-2 ">إقرأ المزيد </p>
                <IconArrow color={"#34d399"} className={"fill-emerald-400"} />
            </Link> */}
        </div>
    )
}
let clints: OurClientsTestimonialsCardType[] = [
    {
        name: "محمد الحربي",
        rank: 3,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-1.png"
    }, {
        name: "خالد",
        rank: 5,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-3.png"
    }, {
        name: "تركي",
        rank: 5,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-4.png"
    }, {
        name: "فيصل",
        rank: 5,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-5.png"
    }, {
        name: "عبدالله",
        rank: 3,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-6.png"
    }, {
        name: "سعيد",
        rank: 5,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-7.png"
    }, {
        name: "سعد الغامدي",
        rank: 4,
        content: "كانت تجربتي مع X ممتازة مرتين وبفضل الله ثم تقريرهم وشرح المهندس المفصل سحبت عربوني من العيوب اللي طلعت بالفحص وما كانت ظاهرة لي.",
        image: "/images/user-2.png"
    },
]