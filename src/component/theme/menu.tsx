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
                <Icon className={'w-[75px] max-[697px]:w-[50px] h-[75px] max-[697px]:h-[50px] '} />
            </div>
            <div className={`fixed flex flex-col max-[697px]:top-[48px] top-[78px] w-full bg-gradient-to-r from-[#0043cecc] to-[#032da6cc] h-full ${!open ? "!hidden" : " "}`} >
                <div className="h-full w-[75px] max-[697px]:w-[50px] bg-white fixed"> </div>
                <div className="h-70 w-full fixed z-20  top-[200px] max-[700px]:top-[100px] " onClick={handleOpen}>
                    {list.map(a => <Row {...a} key={a.title} />)}
                </div>

            </div>

        </div >
    )
}
type Row = { Icon: any; title: string; to: string, }

function Row({ title, Icon, to, }: Row) {
    return (
        <Link href={to} className=" flex flex-row items-center hover:text-prussian-600 *:max-[697px]:!w-[50px] *:max-[697px]:!p-3 origin-top text-white  transition duration-700 ease-in-out  group">
            <Image width={75} height={75} src={`/icons/${Icon}`} className={'  p-6'} alt="icon " loading="lazy" loader={loaderProp} />
            <p className="p-4 min-w-[400px] text-3xl font-bold  border-red-400 group-hover:bg-white  group-hover:border-r-2  group-hover:pr-[100px]  transition duration-200 ease-in-out max-[700px]:text-xl max-[700px]:">{title}</p>
            <div className="p-4 w-full hidden group-hover:flex bg-gradient-to-r from-[#FDBA8C] to-[#F25B06] group-hover:pr-[100px]  transition duration-200 ease-in-out ">
                <IconPlay />
            </div>
        </Link>
    )
}
