"use client"
import Icon from "../icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie"
import SizeBox from "../size-box";
import Image from "next/image";




export default function PupLinks() {

    return (
        <>
            <WhatsAppBtn />
            <PupServie />
            <Links />
        </>
    )
}

function WhatsAppBtn() {
    let [hover, setHover] = useState(false);
    return (
        <div className=" bottom-0 fixed flex justify-end h-1 p-0 w-full z-50">
            <div className=" fixed p-9 z-40 mt-[-110px]" onMouseLeave={() => setTimeout(() => setHover(false), 200)} onMouseEnter={() => setTimeout(() => setHover(true), 200)}   >

                {!hover &&
                    <div>
                        <Icon.whatsapp />
                    </div>
                }
                {hover &&
                    <a href="https://wa.me/966533344735" target="_blank" className="bg-safety-700 p-2 rounded-3xl w-52 px-4 flex-row-reverse flex items-center pl-6">
                        <div className="bg-prussian-800 border-4 shadow-lg border-white fixed h-20 rounded-full w-20 ml-32">
                            <Image src={"/images/man-sa.png"} width={80} height={80} alt="icon man-sa" loading="lazy" />
                        </div>
                        <Icon.whatsappOutline />
                        <p className="text-white font-semibold px-3">تواصل معنا</p>
                    </a>
                }
            </div>
        </div>
    )
}

function PupServie() {
    let [view, setView] = useState(false)
    useEffect(() => {
        let Surveys = Cookies.get("Surveys")
        if (Surveys) setView(false)
        else setTimeout(() => { setView(true) }, 30000)
    }, [])
    let close = () => {
        Cookies.set("Surveys", new Date().getTime().toString())
        setView(false)
    }
    if (!view) return <></>
    else return (
        <div className="bottom-0 fixed w-full z-50 bg-white shadow-2xl  border-2 border-safety-700">
            <div className=" flex justify-end p-4 text-3xl w-full">
                <button className="cursor-pointer w-9 h-9" onClick={close}>x</button>
            </div>
            <SizeBox>
                <div className="flex flex-col  top-24 z-10  p-4 w-full   " >
                    <h2 className="text-3xl font-bold text-safety-700 p-4 text-start" >فورم الاستطلاع</h2>
                    <p className="text-xl p-4">قم بتعبئة الاستطلاع لاجل تحسين الخدمة </p>
                    <div className="w-full flex justify-end px-6">
                        <Link href="/surveies" onClick={close} className="p-4 bg-safety-700 text-white rounded-xl w-60 text-center my-4 " >الاستبيان</Link>
                    </div>
                </div>
            </SizeBox>
        </div>
    )
}

function Links() {
    let sochalmedia = [
        { Icon: Icon.tiktok, to: "https://www.tiktok.com/@inspectex" },
        // { Icon: Icon.linkedin, to: "/#1" },
        { Icon: Icon.x, to: "https://twitter.com/Inspectex_sa" },
        // { Icon: Icon.instagram, to: "/#3" },
        { Icon: Icon.Snapchat, to: "/#4" },
    ]

    const elementRef: any = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            let Height = document?.documentElement?.scrollHeight
            let opacity = elementRef.current.style.opacity

            if (scrollTop >= (Height - 2500)) opacity = 0;
            else opacity = 1;

        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col fixed z-40 top-0" >
            <div className="bg-[#ffffff75] fixed h-full left-0 max-[1000px]:hidden w-14 z-20"></div>
            <div ref={elementRef as any} className={`*:*:p-3 fixed flex flex-col h-full items-center justify-center left-0 top-0 z-20 max-[1000px]:hidden ${true ? 'visible' : 'phidden'}`} >
                {sochalmedia.map(Item => <Link href={Item.to} key={Item.to} > <Item.Icon size={30} /> </Link>)}
                <div className="*:*:p-3 fixed flex flex-col h-full items-center justify-center left-0 top-0 z-50" style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.13) 65.59%)' }} />
            </div >
        </div >
    )
}