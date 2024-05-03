"use client"
import Image from "next/image";
import { IconClose, IconHome, IconLogo, IconMenu, IconPlay } from "../icons";
import { useState } from "react";
import Link from "next/link";
import { loaderProp } from "../lib";

export default function Menu() {
    let [open, setOpen] = useState(false)
    let Icon = open ? IconClose : IconMenu
    const handleOpen = () => {
        setOpen(!open)
    }
    let list = [
        {
            title: "عن الشركة",
            to: "/about-us",
            Icon: "company.png"
        }, {
            title: "خدماتنا",
            to: "/services",
            Icon: "services.png"
        }, {
            title: "المدونة ",
            to: "/blog",
            Icon: "blog.png"
        }, {
            title: "فرصة عمل",
            to: "/jobs",
            Icon: "job.png"
        }, {
            title: "إنضم إلى فريقنا",
            to: "/join",
            Icon: "join.png"
        }, {
            title: "حول التطبيق",
            to: "/about-app",
            Icon: "about-app.png"
        }, {
            title: "الاسئلة الشائعة",
            to: "/FAQ",
            Icon: "about-app.png"
        }
    ]

    return (
        <div className="flex flex-col fixed z-[60] top-0" >
            {/* menu */}
            <div onClick={handleOpen}>
                <Icon className={' tap:w-[75px] w-[55px] tap:h-[75px] h-[55px] hover:mr-1 '} />
            </div>
            <div className={`fixed flex flex-col tap:top-[78px] top-[55px] w-full bg-gradient-to-r from-[#0043cecc] to-[#032da6cc] h-full ${!open ? "!hidden" : " "}`} >
                <div className="h-full lap:w-[75px] w-[55px] bg-white fixed"> </div>
                <div className="h-70 w-full fixed z-20 top-[100px] lap:top-[200px] " onClick={handleOpen}>
                    {list.map(a => <Row {...a} key={a.title} />)}
                </div>

            </div>

        </div >
    )
}
type Row = { Icon: any; title: string; to: string, }

function Row({ title, Icon, to, }: Row) {
    return (
        <Link href={to} prefetch={false} className=" flex flex-row items-center hover:text-prussian-600   *:!p-3 origin-top text-white  transition duration-700 ease-in-out  group">
            <Image width={75} height={75} src={`/icons/${Icon}`} className={'  p-6 w-[55px] lap:w-[75px]'} alt="icon " loading="lazy" loader={loaderProp} />
            <p className="p-4 min-w-[400px] lap:text-xl font-bold  border-red-400 group-hover:bg-white  group-hover:border-r-2  group-hover:pr-[100px]  transition duration-200 ease-in-out  text-xl  ">{title}</p>
            <div className="p-4 w-full hidden group-hover:flex bg-gradient-to-r from-[#FDBA8C] to-[#F25B06] group-hover:pr-[100px]  transition duration-200 ease-in-out ">
                <IconPlay />
            </div>
        </Link>
    )
}
