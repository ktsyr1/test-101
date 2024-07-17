"use client"
import Icon from "../icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SizeBox from "../size-box";
import Image from "next/image";
import { loaderProp } from "../lib";
import { usePathname } from "next/navigation";

export default function PupLinks() {
    return (
        <>
            <GoToTop />
            <WhatsAppBtn />
            <PupServie2 />
            <Links />
        </>
    )
}

function PupServie2() {
    const pathname = usePathname()
    let [view, setView] = useState(false)
    useEffect(() => {
        let Surveys = sessionStorage.getItem(("Surveys"))
        if (Surveys) setView(false)
        else setTimeout(() => { setView(true) }, 1000 * 60 * 5)
    }, [])
    let close = () => {
        sessionStorage.setItem("Surveys", new Date().getTime().toString())
        setView(false)
    }
    console.log(pathname == "/surveies" && !view, pathname == "/surveies", !view);
    if (pathname == "/surveies") return <></>
    if (!view) return <></>
    else
        return (
            <div className="bottom-0 fixed w-full z-50  shadow-2xl  ">
                <div className="bottom-0 fixed   z-50  shadow-2xl  "  >
                    <Image width={100} height={100} src={`/icons/surveies-ui.png`} className={'  p-6  '} alt="icon " loading="lazy" loader={loaderProp} />
                </div>
                <div className="bottom-0 fixed rounded-lg z-50 mb-24 mr-4 *:text-slate-900 py-2 ">

                    <svg width="315" height="101" viewBox="0 0 315 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M304.792 0H10.2644C7.45992 0 4.87978 1.18243 3.02882 3.04054C1.17786 4.89865 -5.18897e-06 7.48874 -5.18897e-06 10.3041V73.6487C-5.18897e-06 76.464 1.17786 79.0541 3.02882 80.9122C4.87978 82.7703 7.45992 83.9527 10.2644 83.9527H287.067L305.745 100.056L304.623 83.9527H304.736C307.54 83.9527 310.12 82.7703 311.971 80.9122C313.822 79.0541 315 76.464 315 73.6487V10.2477C315 7.43243 313.822 4.84234 311.971 2.98423C310.12 1.18243 307.596 0 304.792 0Z" fill="#FF5A1F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.742 3H305.269C307.12 3 308.803 3.78829 310.037 4.97072C311.271 6.20946 312 7.89865 312 9.75676V73.1013C312 74.9595 311.215 76.6486 310.037 77.8874C308.803 79.1261 307.12 79.8581 305.269 79.8581H301.455L302.24 91.4009L288.835 79.8581H10.742C8.89105 79.8581 7.20836 79.0698 5.97439 77.8874C4.74041 76.6486 4.01125 74.9595 4.01125 73.1013V9.75676C4.01125 7.89865 4.7965 6.20946 5.97439 4.97072C7.20836 3.73198 8.89105 3 10.742 3Z" fill="white" />
                    </svg>
                    <div className="cursor-pointer flex flex-col  mt-[-100px] z-10">
                        <div className="cursor-pointer flex flex-row justify-between z-10">
                            <p className=" font-bold text-slate-900 text-start text-sm p-2 mx-4 " >املأ الاستبيان الآن للحصول على   </p>
                            <button className=" border-4 border-slate-900 flex font-bold h-8 items-center justify-center rounded-full text-center text-xl w-8" onClick={close}>X</button>
                        </div>
                        <Link href={'/surveies'} className=" font-bold text-safety-700  mx-4  text-start text-xl p-2 py-1 " >  استشـــــارة مجانيــــــة !</Link>
                    </div>
                </div>
            </div>
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

function PupServie() {
    let [view, setView] = useState(false)
    useEffect(() => {
        let Surveys = sessionStorage.getItem(("Surveys")) //Cookies.get("Surveys")
        if (Surveys) setView(false)
        else setTimeout(() => { setView(true) }, 1000 * 60 * 5)
        // else setTimeout(() => { setView(true) }, 1000)
    }, [])
    let close = () => {
        sessionStorage.setItem("Surveys", new Date().getTime().toString())
        setView(false)
    }
    if (!view) return <></>
    else return (
        <div className="bottom-0 fixed w-full z-50 bg-white shadow-2xl  border-2 border-safety-700 *:text-slate-900">

            <SizeBox className=" ">
                <div className="flex flex-col  top-24 z-10 m-4 w-full  mt-0 tap:mt-4 " >
                    <div className="flex flex-row items-start">

                        <h2 className="lap:text-3xl font-bold text-safety-700 lap:p-4 text-start text-xl p-2 w-full" >فورم الاستطلاع</h2>
                        <div className=" flex justify-end px-4 lap:text-3xl w-full pb-0  text-xl"            >
                            <button className="cursor-pointer w-9 h-9 text-slate-900" onClick={close}>x</button>
                        </div>
                    </div>
                    <p className="lap:text-xl lap:p-4 text-sm p-2">قم بتعبئة الاستطلاع لاجل تحسين الخدمة </p>
                    <div className="w-full flex justify-end px-6 p-0">
                        <Link href="/surveies" prefetch={false} onClick={close} className="lap:p-4 bg-safety-700 text-white rounded-xl w-60 text-center m-0 font-bold p-2 " >الاستبيان</Link>
                    </div>
                </div>
            </SizeBox>
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