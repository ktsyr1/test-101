'use client'
import { useState } from "react";
import Btn from "../btns";
import { IconArrow } from "../icons";
// hover btn
// bg mode white

export default function JobsPart({ className, title, to }: any) {


    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className={`bg-slate-100  bg-[url(/images/bg-jobs.jpg)] bg-center w-full h-[940px] ${className} justify-center items-center flex p-0 m-0 select-none`}>
            {/* <div className="absolute bg-white h-full opacity-65 w-full z-10" >.</div> */}
            <div className="flex items-center max-w-[1360px] max-[1000px]:m-4 tap:m-auto relative z-10 lap:w-full h-[570px] rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none border-b-256 lap:px-8 py-0 gap-8 p-0 m-0 w-max" >
                <div className="w-full tap:m-auto flex flex-col justify-start rounded-3xl text-start tap:my-16 m-4">
                    <div className="flex tap:flex-col rounded-t-3xl flex-col-reverse"
                        style={{ backgroundImage: 'linear-gradient(to left, #fff, #fff, #fff, #ff5c00)' }}
                    >
                        <div className="flex flex-col tap:p-10 p-6 m-0">
                            <p className="text-safety-700 lap:text-5xl text-xl font-black">تقدم للعمل معنا وساهم في</p>
                            <p className="text-prussian-800 lap:text-5xl text-xl font-black mt-4">تطوير مستدام لخبراتك.</p>
                        </div>
                        <img src={"/images/jobs-koba-300.png"} loading="lazy" className=" w-52 tap:w-72 lap:w-96 tap:absolute mt-0 filter tap:mr-10relative m-auto tap:left-4 left-auto mr-auto mb-[-20px]" alt="" />
                    </div>
                    <div className="  bg-prussian-800 text-white tap:p-4 rounded-b-3xl w-full flex justify-start p-0 m-0 ">
                        <div className="flex flex-col tap:w-[50%] w-full">
                            <p className="p-4 m-4 lap:text-xl text-base">كن امتدادًا لاحتياجات مجتمعك من أجل اتخاذ قرار مستنير يزيد من الأمان والوعي أثناء الصفقات العقارية.</p>
                            <div onMouseEnter={enter} onMouseLeave={leave}>

                                <Btn title={title ? title : "تعرف على آلية تقديم الطلبات"} to={to ? to : "/join"} className="bg-white tap:text-lg text-sm !justify-between  text-prussian-800 rounded-full m-4 hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end" >
                                    <IconArrow className={'fill-prussian-800'} color={btnHover ? "#fff" : "#032DA6"} />
                                </Btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

