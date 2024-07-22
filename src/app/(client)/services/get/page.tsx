"use client"
import CheckCountService from "@/app/(eng)/get-service/fun";

/* This code snippet defines a functional component called `LoginApp` in TypeScript with React. Here's
a breakdown of what the code is doing: */

export default function GetServices() {

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] w-full bg-slate-100" />
            <div className=" w-full flex flex-col   items-center max-w-[1200px] p-4 tap:max-w-[90%] ">
                <div className="mt-4 w-full m-auto bg-white">
                    <div className=" flex items-center w-full max-w-[1360px]  m-auto   flex-col">
                        <div className="flex flex-col items-center m-auto w-[90%] my-20 " >
                            <div className="flex tap:flex-row flex-col justify-between w-full mb-8 items-center" >
                                <h2 className="w-full text-start lap:text-5xl tap:text-4xl text-3xl my-4 font-bold text-safety-700 mr-10">طلب الخدمة </h2>
                                <CheckCountService />
                            </div>
                        </div>
                    </div>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe-Wux5xwL5smqGWTO21HqxqqMT-4jZNU78Ysw5ev0uXaImzw/viewform?embedded=true" className="m-auto border-0 max-w-[640px] w-full" height="800" >جارٍ التحميل…</iframe>
                </div>
            </div>
        </div>
    )
}
