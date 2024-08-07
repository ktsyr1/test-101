"use client"
import _init_Hero from "@/component/hero";
import Icon from "@/component/icons";
import SizeBox from "@/component/size-box";
import Logo from "@/component/theme/logo1";
import data from "@/data/about.json"
import listExpertise from "@/data/listExpertise.json"
import { useState } from "react";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function Aobut_us() {
    return (
        <div className="flex flex-col">
            <ChairmanSpeech />
            <Hero />
            <How />
            <Clients />
            <Expertise />
        </div>
    )
}

export function Hero() {
    return (
        <_init_Hero className=" bg-[url(/images/bg-about.webp)] bg-no-repeat text-start !h-max " >
            <div>
                <div className="flex flex-row items-center m-auto w-[70%] lap:my-10 tap:my-6 pt-4"  >
                    <Logo type="semple" className={"tap:p-[10px] p-[15px]"} />
                    <h1 className="w-full text-start lap:text-5xl tap:text-3xl text-xl font-bold text-white lap:mr-10 mr-2">من نحن</h1>
                </div>
                <div className=" flex items-center w-full max-w-[1360px] flex-col p-4 mb-10 tap:w-[85%] m-auto" >

                    <p className="w-full m-auto lap:text-xl  text-base  my-0 py-4 ">{data.bio} </p>
                    <p className="w-full m-auto lap:text-sm   text-xs my-0 py-4 ">{data.about}</p>
                </div>
            </div>
        </_init_Hero>
    )
}
 

export function ChairmanSpeech() {
    return (
        <div className="my-10 lap:my-15 bg-white flex justify-center  tap:w-[80%] mx-auto items-center w-full max-w-[1360px]  m-auto   ">
            <div className=" items-center max-w-[1360px]  p-4 tap:rounded-[50px]  rounded-[35px] tap:w-full flex flex-col  w-[90%]">
                <div className="flex flex-row items-center m-auto w-[90%] tap:my-10 my-4" >
                    <Logo type="semple" className={"tap:p-[10px]  p-[15px]"} />
                    <h1 className="  text-start lap:text-6xl tap:text-4xl text-2xl w-full  font-bold text-safety-700 tap:mr-10 leading-loose tracking-tight">كلمة رئيس مجلس الإدارة </h1>
                </div>
                <div className="flex lap:flex-row items-center w-[90%] flex-col-reverse ">
                    <div className="*:font-semibold text-xl p-4 w-[90%]">
                        <p className="*:font-semibold text-xl">
                            لسنا مجرد منشأة مقدمة للخدمات فحسب؛ بل نطمح على المدى البعيد أن نكون الوجهة الأولى التي تساعد على النمو واتخاذ القرارات السليمة والتي تُفيد متخذي القرار من الكيانات والمؤسسات والمنظمات المختلفة بالإضافة إلى الأفراد لتحقيق أهدافهم؛ وذلك من خلال فريق عمل متمكن ومتعاون بيدركم<span className="italic text-safety-700"> بأعين لا ترى إلا الحقيقة والمصداقية في العمل</span>، فكل فرد في طاقم عملنا لديه الشغف ليكون شريكاً فعّالاً يقدر أفكاركم وأطروحات إبداعية تكسب ثقتكم ووفاء عملائكم. كل هذا لنتلاكنكم بوثائق فنية عقارية (مبتكرة) ومتفردة في كل مشروع نعمل عليه!
                        </p>
                        <p>
                            نعتمد على تقديم خدمة مميزة، شاملة ومفصلة تليق بشركائنا تُرضي الطموحات وتذخر الأهداف المستقبيلة لهم. سنقوم بتقييم جميع العقبات والمشاكل بُشرح جميع الأطروحات المناسبة وبذلك نضمن أفضل النتائج بما يفيد أهدافهم المستقبلية.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center text-xl font-bold max-w-[200px]">
                        <img src={"/images/ChairmanSpeech.png"} className={"lap:w-56"} alt="" loading="lazy" />
                        <p className="text-slate-500">رئيس مجلس الإدارة</p>
                        <p className="text-blue-900">سلطــان الأحمــدي</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function How() {
    return (
        <div className="my-10 bg-white flex justify-center  tap:w-[80%]    mx-auto ">
            <div className=" items-center max-w-[1360px]  p-4 border-2 border-prussian-600 tap:rounded-[50px]  rounded-[35px] tap:w-full flex flex-col  w-[90%]">
                <div className="flex flex-row items-center m-auto w-[90%] tap:my-10 my-4" >
                    <Logo type="semple" className={"tap:p-[10px]  p-[15px]"} />
                    <h1 className="  text-start lap:text-6xl tap:text-4xl text-2xl w-full  font-bold text-safety-700 tap:mr-10 leading-loose tracking-tight">لماذا نحن </h1>
                </div>
                <div className="lists w-full tap:mr-12 text-sx flex flex-row mb-4">
                    {[
                        { title: "الأسباب المالية", i: 1 },
                        { title: "الأسباب المعنوية", i: 2 },
                        { title: "الأسباب الاجتماعية", i: 3 },
                    ].map(item => (
                        <button key={item.i} className="tap:mx-4 mx-2 border-2 p-2     rounded-lg border-prussian-600 text-prussian-600 hover:text-white hover:bg-prussian-600 tap:p-3  lap:text-xl tap:text-base text-xs ">{item.title}</button>
                    ))}

                </div>
                <div className="flex flex-wrap justify-center mb-6">
                    {data.how.map(item => <HowCard data={item} key={item.title} />)}
                </div>
            </div>
        </div>
    )
}

export function HowCard({ data: item }: any) {

    let initIcons: any = {
        Tree: Icon.Tree,
        Pinsel: Icon.Pinsel,
        Gol: Icon.Gol,
        Elctron: Icon.Elctron,
    }
    let Icons = initIcons[item.icon]
    return (
        <div className=" md:w-[45%] p-4" key={item.title} >
            <div className="flex flex-row items-center" >
                <div className="p-2 rounded-full bg-safety-700 " > </div>
                <p className="lap:text-3xl tap:text-xl text-base font-semibold px-4 text-prussian-800" >{item.title}</p>
            </div>
            <p className="lap:text-xl tap:text-base text-sm font-medium text-slate-600   py-6 list-disc px-6" >
                {item.list}
            </p>
        </div>
    )
}

export function Clients({ list }: any) {
    let [data, setData] = useState(list)
    let [one, setOne] = useState(list[0])
    let BtnList = (props: any) => (
        <div
            className={`bg-white rounded-full p-2 px-6 m-4 my-2 border  w-full h-12 flex items-center py-4 font-semibold lap:text-lg tap:text-base text-sm text-center tap:text-start hover:border-safety-700 tap:w-64 hover:text-white hover:bg-safety-700 ${props.data.title == one.title ? ' font-bold text-safety-700 border-safety-700 ' : "text-prussian-600 text-base border-prussian-600 "}  ${props.className || " "}`}
            {...props}
        >
            {props.data?.title || props.data}
        </div>
    )
    return (
        <div className="my-4 tap:my-8 flex justify-center">
            <SizeBox className="bg-[#F0F0F0] rounded-[50px] lap:w-full flex flex-col  tap:w-[80%] mx-auto ">
                <div className="flex flex-row items-center m-auto w-[90%] my-10 " >
                    <Logo type="semple" />
                    <h1 className="w-full text-start text-safety-700 mr-10 lap:text-6xl tap:text-4xl text-2xl font-bold leading-loose tracking-tight  ">العملاء السابقين </h1>
                </div>
                {/* <div className="flex flex-wrap text-base font-medium leading-loose tracking-normal text-justify  mb-6 p-8">
                    <p>نتفهم أن المستثمرين العقاريين يطالبون بمستوى عالٍ من التدقيق عند تقييم الاستثمارات المحتملة ومستشاراً يفهم أهدافهم ومصالحهم الفضلى، يضم فريقنا خبراء متمرسين يركزون على الاحتياجات والأهداف الفريدة لعملائنا </p>
                    <p className="pt-4"> نقدم مجموعة من التقييمات والخدمات المصممة لمساعدة المالكين والمستثمرين على تقليل المخاطر وتعظيم العوائد من خلال </p>
                </div> */}
                <div className="flex tap:flex-row flex-col justify-between w-full py-5">
                    <div className="flex flex-row tap:m-10 !mt-0 m-auto tap:mx-0 mb-4 overflow-x-scroll tap:flex-col tap:overflow-x-visible w-[90%] tap:w-80 select-none ">
                        {data.map((client: any) => <BtnList data={client} onClick={() => setOne(client)} key={client.title} />)}
                    </div>
                    <div className="flex flex-col items-start tap:flex-row tap:flex-wrap w-full content-start ">
                        {one.list.map((item: any) => <div key={item}
                            className={`bg-prussian-800 flex flex-row items-center w-[90%] my-2 font-bold min-h-12 lap:text-lg leading-loose h-max tap:min-h-[80px]  m-2 rounded-[59px] tap:text-base text-right text-white text-xs tracking-normal tap:w-[45%]  
                            `}>
                            {item?.logo && <img src={item.logo} alt=" logo" className="m-1 rounded-full w-16 " />}
                            <p className="w-full px-6">{item.title}</p>
                        </div>)}
                    </div>
                </div>
            </SizeBox>
        </div>
    )
}

export function Expertise() {

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
        isMounted: true,
        safeDisplacement: 11, // specify the drag sensitivity
    });

    return (
        <div className="mb-10 "
        >
            <div className=" flex items-center  max-w-[1360px]   tap:w-full  flex-col">
                <div className="flex flex-row items-center m-auto w-[90%] my-10" >
                    <Logo type="semple" />
                    <div className="flex flex-col tap:mr-10 mr-4 ">
                        <h1 className="w-full text-start lap:text-5xl tap:text-3xl text-xl font-bold text-safety-700  ">مجالات الخبرة </h1>
                        <p className="lap:text-xl tap:text-base p-2 text-sm text-slate-800">تخصصات في قطاعات مختلفة و شاملة تغنيك عن التعامل مع عدة شركات.   </p>
                    </div>
                </div>
            </div >
            <div {...events} ref={ref} className="w-full tap:px-24 px-12 space-x-3 overflow-x-scroll scrollbar-hide cursor-e-resize select-none ">
                {/* <div {...events} ref={ref} className="flex flex-row scroll-auto contentmax-w-xl space-x-3 overflow-x-scroll scrollbar-hide"> */}
                <div className="flex w-[2200px]  ">
                    {listExpertise.map((item, i) => <CardExpertise data={item} key={i} />)}
                </div>
            </div>
        </div >
    )
}

export function CardExpertise({ data }: { data: ExpertiseType }) {
    return (
        <div className={`flex m-4 ${data.top ? "flex-col" : "flex-col-reverse justify-end"} w-96`}    >
            <img src={data.icon} className={`${data.w ? "w-40" : "w-96"} `} alt="" loading="lazy" />
            <div className="flex flex-col my-4" >
                <p className="text-safety-700 mt-8  lap:text-3xl tap:text-xl text-base  font-bold leading-snug tracking-normal text-right">{data.title}</p>
                <ol className="flex flex-col mx-4 mt-8   lap:text-xl tap:text-base text-sm font-medium leading-loose tracking-tightest text-right">
                    {data.list.map((a: any) => <li key={a} className="list-disc">{a}</li>)}
                </ol>
            </div>
        </div>
    )
}
type ExpertiseType = {
    title: string,
    list: any
    icon: string
    top: boolean
    w?: string
}

