// "use client"
import Image from "next/image";
import { IconClose, IconHome, IconLogo, IconMenu, IconPlay } from "../icons";
// import { useState } from "react";
import Link from "next/link";
import { loaderProp } from "../lib";

export default function Menu() {

    return (
        <div className="flex flex-col fixed z-[60] top-0" >
            {/* menu */}

            <input type="checkbox" id="openMenu" value="openMenu" name="openMenu" className="peer opacity-0 p-10 border-2 absolute tap:w-[75px] w-[55px] tap:h-[75px] h-[55px] cursor-pointer hover:border-2 hover:border-safety-700" required />
            <label htmlFor="openMenu" className="peer-checked:hidden flex">
                <div  >
                    <IconMenu className={' tap:w-[75px] w-[55px] tap:h-[75px] h-[55px] hover:mr-1 '} />
                </div>
            </label>
            <label htmlFor="openMenu" className="peer-checked:flex hidden">
                <div  >
                    <IconClose className={' tap:w-[75px] w-[55px] tap:h-[75px] h-[55px] hover:mr-1 '} />
                </div>
            </label>
            <label htmlFor="openMenu" className={`fixed   flex-col tap:top-[78px] top-[55px] w-full bg-gradient-to-r from-[#0043cecc] to-[#032da6cc] h-full peer-checked:flex hidden`}  >
                <div className="h-full lap:w-[75px] w-[55px] bg-white fixed"> </div>
                <div className="fixed h-70 w-full z-20" >
                    {listMenu.map(a => <Row {...a} key={a.title} />)}
                </div>

            </label>

        </div >
    )
}

type Row = { Icon: any; title: string; to: string, }

function Row({ title, Icon, to, }: Row) {
    return (
        <Link href={to} prefetch={false} className=" flex flex-row items-center hover:text-prussian-600   *:!p-3 origin-top text-white  transition duration-700 ease-in-out  group" onClick={() => {
            const checkbox = document.querySelector("#openMenu") as HTMLInputElement;
            if (checkbox) checkbox.checked = false;
        }}>
            <Image width={75} height={75} src={`/icons/${Icon}`} className={'  p-6 w-[55px] lap:w-[75px]'} alt="icon " loading="lazy" loader={loaderProp} />
            <p className="p-4 min-w-[400px] lap:text-xl font-bold  border-red-400 group-hover:bg-white  group-hover:border-r-2  group-hover:pr-[100px]  transition duration-200 ease-in-out  text-xl  ">{title}</p>
            <div className="p-4 w-full hidden group-hover:flex bg-gradient-to-r from-[#FDBA8C] to-[#F25B06] group-hover:pr-[100px]  transition duration-200 ease-in-out ">
                <IconPlay />
            </div>
        </Link>
    )
}
export let listMenu = [
    {
        title: "عن الشركة",
        to: "/about-us",
        Icon: "company.png"
    }, {
        title: "خدمــاتنــا",
        to: "/services",
        Icon: "services.png"
    }, {
        title: "المــدونــة ",
        to: "/blogs",
        Icon: "blog.png"
    }, {
        title: "فرصة عمل",
        to: "/jobs",
        Icon: "job.png"
    }, {
        title: "إنضم إلى فريقنا",
        to: "/join-eng",
        Icon: "join.png"
    }, {
        title: "حــول التطبيــق",
        to: "/about-app",
        Icon: "about-app.png"
    }, {
        title: "الاسئلة الشائعة",
        to: "/FAQ",
        Icon: "QAF.png"
    }, {
        title: "الاستطلاع",
        to: "/surveies",
        Icon: "surveies.png"
    }
]
export const MenuData = listMenu