'use client'

import Btn from "@/component/btns";
import { IconArrow } from "@/component/icons";
import JobsPart from "@/component/landing/jobs";
import SizeBox from "@/component/size-box";
import Logo from "@/component/theme/logo1";
import list from "@/data/jobs_staps.json"
import { useState } from "react";

export default function Jobs() {
    return (
        <div className="">
            <Hero />
            <div className="m-auto  max-w-[1360px] p-4 tap:p-0 lap:w-full tap:w-[80%] w-[90%] ">
                <div className={`flex flex-row items-center m-auto w-full my-10 mt-[103px]`} >
                    <Logo type="semple" />
                    <div className="">
                        <h1 className="  text-start lap:text-5xl tap:text-3xl text-xl font-bold text-safety-700 mr-10  ">آلية الإنضمام إلى إنسبكتكس</h1>
                        <p className="  lap:text-2xl tap:text-lg text-sm font-medium text-prussian-600 mr-10 my-4">    انسبكتكس تفتح المجال دائما امام المهندسين الساعين لاستلام مشاريع  و زيادة دخلهم بفرصة الإنضمام اليها</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  max-w-[1360px]   m-auto" >
                {list.map(item => <Box data={item} key={item.title} />)}
            </div>
            <div className="lap:w-full tap:w-[80%] my-[-100px]  m-auto">
                <JobsPart className="bg-none bg-white  " title='تقدم بالطلب' to={"/join-eng"} />
            </div>

        </div>
    )
}

function Hero() {

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className={`bg-blue-900 flex flex-col h-[514px] justify-center bg-center bg-[url(/images/Apply-For-a-Job.jpg)]`}>
            <div className="bg-blue-900 flex flex-col bg-opacity-90 h-full justify-center text-center text-white ">
                <h1 className="text-white lap:text-5xl tap:text-3xl text-xl font-extrabold mt-[100px]">تقديم لفرصة عمل</h1>
                <div>
                    <p className="flex items-center  tap:max-w-[1360px]   m-auto   lap:text-2xl tap:text-lg text-sm font-normal my-0 p-4 min-h-[176px] w-[90%] lap:w-full"> قامت إنسبكتكس بتنفيذ نموذج تشغيلي فريد من نوعه يُمكنها من تلبية احتياجات العملاء بطريقة فعّالة و مرنة مع الحفاظ على تقديم اعلى معايير الجودة. أحد أهم مزايا شركة ` انسبكتكس` هي توفير المهندسين المؤهلين والمحترفين والذين يتمتعون بأوقات متاحة حيث يقوم النظام باختيار المهندس الأنسب وفقًا لاختصاصاتهم, أوقاتهم المتاحة و مواقعهم الجغرافية. بعد إنهاء عملية الفحص, يحصل كل مهندس عمل على المشروع على النسبة المادية المتفق عليها</p>
                </div>
                <div onMouseEnter={enter} onMouseLeave={leave}>
                    <Btn title={"تقدم بطلب الإنضمام لإنسبكتكس"} to="/join-eng" className="bg-white lap:text-xl tap:text-lg text-sm font-bold px-6 m-auto !justify-between max-w-[640px] tap:pr-6 tap:w-full  text-prussian-800 rounded-full hover:bg-safety-700 hover:text-white *:hover:fill-white w-[80%]" childSort="end" >
                        <IconArrow className={'fill-prussian-800 '} color={btnHover ? "#fff" : "#032DA6"} />
                    </Btn>
                </div>
            </div>
        </div>
    )
}

type BoxType = {
    title: string
    content: string
    image: string
    rtl: boolean
}
function Box({ data }: { data: BoxType }) {
    return (
        <div className={`  ${data?.rtl ? "tap:flex-row" : "tap:flex-row-reverse bg-green-50"} flex items-center lap:w-full tap:w-[80%] m-auto max-w-[1360px]  flex-col-reverse tap:rounded-[100px]  rounded-[30px] px-[20px] hover:shadow-lg  justify-center max-[900px]:!mx-10 my-4 border border-green-300 min-h-[300px] `} >
            <div className="flex flex-col max-w-[500px] tap:w-full m-4 my-6 mb-8 " >
                <h2 className=" lap:text-3xl tap:text-xl text-base font-semibold text-prussian-500 mb-4" >{data.title}</h2>
                <p className="  lap:text-xl tap:text-base text-sm font-medium" dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <img src={data.image} alt=" gallery image" className={`w-60   ${!data?.rtl ? " ml-10 " : " mr-10 "}`} loading="lazy" />
        </div>
    )
}

