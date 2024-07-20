"use client"
import Icon from "../icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loaderProp } from "../lib"; 
import PupServie from "./layout/PupServie";

export default function PupLinks() {
    return (
        <>
            <GoToTop />
            <WhatsAppBtn />
            <PupServie />
            <Links />
        </>
    )
}
function GoToTop() {
    let [loding, setLoding] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset <= 900) setLoding(false)
            else setLoding(true)
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    function toTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    return (
        <div onClick={toTop} className="flex justify-end shadow-lg w-full">
            <div className={` ${!loding ? "hidden" : "flex"} mb-28 mx-8 cursor-pointer bg-white border bottom-0 fixed   h-12 items-center justify-center p-3 rounded-md shadow-lg   w-12   z-50  hover:border-safety-700 `}>
                <Icon.arrowUp className={'group-hover:*:fill-white  group-hover:*:stroke-white'} />
            </div>
        </div>
    )
}
function WhatsAppBtn() {
    let [hover, setHover] = useState(false);
    return (
        <div className=" bottom-0 fixed flex justify-end h-1 p-0 w-full z-50">
            <div className=" fixed p-9 z-40 mt-[-110px]" onMouseLeave={() => setTimeout(() => setHover(false), 200)} onMouseEnter={() => setTimeout(() => setHover(true), 200)}   >

                {!hover &&
                    <a href="https://wa.me/966533344735" target="_blank">
                        <Icon.whatsapp />
                    </a>
                }
                {hover &&
                    <a href="https://wa.me/966533344735" target="_blank" className="bg-safety-700 p-2 rounded-3xl w-52 px-4 flex-row-reverse flex items-center pl-6">
                        <div className="bg-prussian-800 border-4 shadow-lg border-white fixed h-20 rounded-full w-20 ml-32">
                            <Image src={"/images/man-sa-150.webp"} width={80} height={80} alt="icon man-sa" loading="lazy" loader={loaderProp} />
                        </div>
                        <Icon.whatsappOutline />
                        <p className="text-white font-semibold px-3">تواصل معنا</p>
                    </a>
                }
            </div>
        </div>
    )
}


function Links() {
    let sochalmedia = [
        { Icon: Icon.linkedin, to: "https://www.linkedin.com/company/inspectex-sa" },
        { Icon: Icon.x, to: "https://twitter.com/Inspectex_sa" },
        { Icon: Icon.instagram, to: "https://www.instagram.com/inspectex_sa" },
        { Icon: Icon.Snapchat, to: "https://www.snapchat.com/add/inspectex_sa" },
        { Icon: Icon.tiktok, to: "https://www.tiktok.com/@inspectex" },
    ]

    const elementRef: any = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            let scrollTop = window.pageYOffset
            let Height = document?.documentElement?.scrollHeight

            if (scrollTop >= (Height - 2500)) elementRef.current.style.opacity = 0;
            else elementRef.current.style.opacity = 1
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col fixed z-40 top-0" ref={elementRef as any} >
            <div className="bg-[#ffffff75] fixed h-full left-0 max-[1000px]:hidden w-14 z-20"></div>
            <div className={`*:*:p-3 fixed flex flex-col h-full items-center justify-center left-0 top-0 z-20 max-[1000px]:hidden ${false ? 'visible' : 'phidden'}`} >
                {sochalmedia.map(Item => <Link href={Item.to} key={Item.to} className="hover:w-[40px]" prefetch={false} > <Item.Icon size={30} /> </Link>)}
                <div className="*:*:p-3 fixed flex flex-col h-full items-center justify-center left-0 top-0 z-50" style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.13) 65.59%)' }} />
            </div >
        </div >
    )
}