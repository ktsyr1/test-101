"use client"
import React from "react";
import { IconHome, IconPlay } from "@/component/icons"
import Link from "next/link";
import Menu from "./menu";
import Logo from "../theme/logo1";
import { usePathname } from "next/navigation";

export default function Nav() {

    let paths: any = {
        "about-us": "من نحن",
        "about-app": "حول التطبيق",
        "services": "الخدمات",
        "blog": "المدونة",
        "jobs": "فرص العمل",
        "join": "تقديم لفرصة عمل "
    }
    const pathname: any = usePathname()
    let pathArray = pathname?.split("/").filter((a: any) => a.length > 0)

    return (
        <nav className="flex flex-wrap fixed z-50 bg-opacity-83 select-none top-0 w-full justify-between border-b-2 border-solid border-orange-500 bg-gradient-to-b from-white via-white to-white  " style={{ backgroundImage: "linear-gradient(180deg, white, #ffffffbd)" }}>
            <div className="flex flex-row items-center">
                {/* <IconMenu className={'w-[70px]  max-[697px]:w-[50px] '} /> */}
                <Menu />
                <Link href={'/'} prefetch={false} className="inline-flex items-center gap-[10px] relative lap:h-[70px] mx-3 p-3 h-[50px] mr-[80px] ">
                    <Logo type={"ar"} className={'p-2 tap:p-0'} />
                </Link>
                {/* <Logo /> */}
                <div className="flex flex-row items-center max-[697px]:hidden">
                    <Link href={'/'} prefetch={false}>
                        <IconHome className={'m-4  hover:p-1'} />
                    </Link>
                    {pathArray.length > 0 && <div className="flex flex-row items-center mx-6">
                        <IconPlay color={"#00A5A5"} className={'m-4 mx-6'} />
                        <p className="text-sm font-bold text-slate-800">{paths[pathArray[0]]} </p>
                    </div>}
                </div>
            </div>
            {/* logo */}
            {/* path */}
            <div className="flex flex-row  max-[697px]:w-full ">
                <LinkBtn to="/get-service" title=" أطلب الخدمة الآن" Class=" bg-[#FFF8F1] border-[#F25B06] text-[#F25B06]  hover:text-white hover:bg-safety-700" />
                <LinkBtn to="/about-app" title=" حمل التطبيق" Class="bg-[#EBF5FF] border-prussian-600 border-solid text-prussian-600  hover:text-white hover:bg-prussian-600" />
            </div>
        </nav >
    );
}

type LinkBtn = { title: string; to: string; Class?: string; }

function LinkBtn({ to, Class, title }: LinkBtn) {
    return (
        <Link href={to} prefetch={false} className={`flex flex-row items-center shadow-lg m-3 p-3 rounded-lg border-solid border-2 max-[697px]:w-[45%]    w-40  relative justify-center shrink-0 font-semibold ${Class} `}>
            {title}
        </Link >
    );
}
