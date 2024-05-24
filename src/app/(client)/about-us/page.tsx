"use client"
import _init_Hero from "@/component/hero";
import Icon from "@/component/icons";
import Logo from "@/component/theme/logo1";
import data from "@/data/about.json"
import ListClients from "@/data/ListClients.json"
import { Clients, Expertise, Hero, HowCard } from "@/component/about-us";
import { useState } from "react";

export default function Aobut_us() {
    return (
        <div className="flex flex-col">
            <Hero />
            <How />
            <Clients list={ListClients} />
            <Expertise />
        </div>
    )
}

type OpenType = "mony" | "ma3" | "tech";

function How() {
    let [open, setOpen] = useState<OpenType>("mony")

    return (
        <div className="my-10 bg-white flex justify-center  tap:w-[80%]    mx-auto ">
            <div className=" items-center max-w-[1360px]  p-4 border-2 border-prussian-600 tap:rounded-[50px]  rounded-[35px] tap:w-full flex flex-col  w-[90%]">
                <div className="flex flex-row items-center m-auto w-[90%] tap:my-10 my-4" >
                    <Logo type="semple" className={"tap:p-[10px]  p-[15px]"} />
                    <h1 className="  text-start lap:text-6xl tap:text-4xl text-2xl w-full  font-bold text-safety-700 tap:mr-10 leading-loose tracking-tight">لماذا نحن </h1>
                </div>
                <HowMenu open={open} setOpen={setOpen} /> 
                <HowBody open={open} />
            </div>
        </div>
    )
}
type TypeListMinu = {
    title: string
    slug: string
    i: number
}
function HowMenu({ open, setOpen }: { open: string, setOpen: Function }) {
    let list: TypeListMinu[] = [
        { title: "الأسباب المالية", slug: "mony", i: 1 },
        { title: "الأسباب المعنوية", slug: "ma3", i: 2 },
        { title: "الأسباب التقنية", slug: "tech", i: 3 }
    ]
    return (
        <div className="lists w-full tap:mr-12 text-sx flex flex-row mb-4">
            {list.map((item: TypeListMinu) => <button
                key={item.i}
                onClick={() => setOpen(item.slug)}
                className={`tap:mx-4 mx-2 border-2 p-2 rounded-lg border-prussian-600 text-prussian-600 hover:text-white hover:bg-prussian-600 tap:p-3 lap:text-xl tap:text-base text-xs ${open == item.slug && " text-white bg-prussian-600"}`}
            >
                {item.title}
            </button>
            )}

        </div>
    )
}
function HowBody({ open }: { open: OpenType }) {
    console.log(data[open]);

    return (
        <div className="flex flex-wrap justify-center mb-6">
            {data[open].map(item => <HowCard data={item} key={item.title} />)}
        </div>
    )
}