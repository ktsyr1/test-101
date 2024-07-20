"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { loaderProp } from "@/component/lib";
class PupView {
    static async get(set: any) {
        const storedTimestamp = sessionStorage.getItem("Surveys");
        const minute = 1000 * 60; // 1 minute in milliseconds
        const fiveMinutes = minute * 5; // 5 minutes in milliseconds
        const sixHours = minute * 60 * 6; // 6 hours in milliseconds

        if (storedTimestamp) {
            const timeDifference = sixHours - (new Date().getTime() - Number(storedTimestamp));

            if (timeDifference < 0) {
                console.log(`Time difference is negative: ${timeDifference}`);
                setTimeout(() => set(true), timeDifference + fiveMinutes);
            } else if (timeDifference > fiveMinutes) {
                console.log(`Time difference is greater than 5 minutes: ${timeDifference}`);
                set(false);
                setTimeout(() => set(true), timeDifference + minute);
            } else {
                console.log(`Time difference is within 5 minutes: ${timeDifference}`);
                setTimeout(() => set(true), timeDifference);
            }
        } else {
            console.log("No stored timestamp found, setting state after 5 minutes");
            return setTimeout(() => set(true), fiveMinutes);
        }
    }
    static set(set: any) {
        sessionStorage.setItem("Surveys", new Date().getTime().toString())
        set(false)
    }
}
export default function PupServie() {
    const pathname = usePathname()
    let [view, setView] = useState(false)
    useEffect(() => {
        PupView.get(setView)
    })
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
                            <button className=" -border-4 border-slate-900 flex font-bold h-8 items-center justify-center rounded-full text-center text-xl w-8" onClick={() => { PupView.set(setView) }}>X</button>
                        </div>
                        <Link href={'/surveies'} className=" font-bold text-safety-700  mx-4  text-start text-xl p-2 py-1 " >  استشـــــارة مجانيــــــة !</Link>
                    </div>
                </div>
            </div>
        )
}
