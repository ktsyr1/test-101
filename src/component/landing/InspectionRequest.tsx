"use client"
import { useState } from "react";
import Btn from "../btns";
import Icon, { IconArrow } from "../icons";


export default function InspectionRequest() {


    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className="flex flex-col items-center justify-center tap:min-h-[980px] bg-[#DAE0E6] w-full select-none">
            <div className="flex min-[900px]:flex-row max-[900px]:flex-col-reverse h-full items-center justify-center w-full my-6 tap:min-h-[980px] tap: bg-gradient-to-b  from-white to-[#DAE0E6] rounded-full -[512px] ">
                <div className="rounded-3xl bg-white tap:w-[680px] m-4 shadow-2xl p-4 text-start flex flex-col tap:h-[600px] lap:mr-[160px]">
                    <h2 className="lap:text-5xl tap:text-3xl text-xl lap:m-7 tap:m-5 m-2 font-black text-safety-700 mt-14" >أطلب فحصك  </h2>
                    <h2 className="lap:text-5xl tap:text-3xl text-xl lap:m-7 tap:m-5 m-2 font-black text-prussian-600 ">وإحفظ حقك</h2>
                    <div className="flex flex-col justify-between h-full">
                        <p className="lap:text-xl  tap:text-base text-sm lap:m-7 tap:m-5 m-2 font-medium">تجنب العديد من المشاكل التي تؤدي إلى زيادة مصاريف الصيانة, إرتفاع مستوى الخطر و غيرها من المخالفات عبر خدمة الكشف على العقار و احصل على تقرير مفصل لمساعدتك بإتخاذ قرار واضح و موثوق به.</p>
                        <div onMouseEnter={enter} onMouseLeave={leave} >
                            <Btn title={"أطلب الخدمة الآن"} to={"/get-service"} className="bg-white lap:text-2xl tap:p-5 border-2 border-safety-700 font-bold tap:text-lg text-sm !justify-between  text-prussian-800 rounded-full m-4 hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end" >
                                <IconArrow className={'fill-prussian-800'} color={btnHover ? "#fff" : "#032DA6"} />
                            </Btn>
                        </div>

                    </div>
                </div>
                <img
                    src="/images/InspectionRequest.png"
                    className="h-full tap:p-14 w-[80%] p-6 mb-[-70px] tap:mb-[-120px] min-[900px]:mb-0 tap:w-[500px] min-[1200px]:!w-full max-w-[700px] [500px] "
                    alt="Inspection Request image "
                    loading="lazy" />
            </div>

        </div >
    )
}

