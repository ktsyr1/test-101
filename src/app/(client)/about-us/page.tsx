"use client"
import _init_Hero from "@/component/hero";
import Icon from "@/component/icons";
import SizeBox from "@/component/size-box";
import Logo from "@/component/theme/logo1";
import data from "@/data/about.json"
import listExpertise from "@/data/listExpertise.json"
import { useState } from "react";

export default function Aobut_us() {
    return (
        <div className="flex flex-col">
            <Hero />
            <How />
            <Clients />
            <Expertise />
        </div>
    )
}

function Hero() {
    return (
        <_init_Hero className=" bg-[url(/images/bg-about.jpg)] bg-no-repeat text-start !h-max " >
            <div>
                <div className="flex flex-row items-center m-auto w-[70%] my-10" >
                    <Logo type="semple" />
                    <h1 className="w-full text-start text-5xl font-bold text-white mr-10  ">من نحن</h1>
                </div>
                <SizeBox className="flex-col mb-10" >

                    <p className="w-full m-auto text-xl my-0 p-4 ">{data.bio} </p>
                    <p className="w-full m-auto text-sm my-0 p-4 ">{data.about}</p>
                </SizeBox>
            </div>
        </_init_Hero>
    )
}

function How() {
    let initIcons: any = {
        Tree: Icon.Tree,
        Pinsel: Icon.Pinsel,
        Gol: Icon.Gol,
        Elctron: Icon.Elctron,
    }
    return (
        <div className="my-10 bg-white">
            <SizeBox className="border-2 border-prussian-600 rounded-[50px] w-full flex flex-col">
                <div className="flex flex-row items-center m-auto w-[90%] my-10" >
                    <Logo type="semple" />
                    <div className="flex flex-row justify-between items-center w-full">
                        <h1 className="  text-start text-6xl font-bold text-safety-700 mr-10 leading-loose tracking-tight">لماذا نحن </h1>
                        <p className="text-3xl font-semibold text-prussian-600">الأسباب المالية \ الأسباب المعنوية \ الأسباب الإجتماعية</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center mb-6">
                    {data.how.map(item => {
                        let Icons = initIcons[item.icon]
                        return (
                            <div className=" md:w-[45%] p-4" key={item.title} >
                                <div className="flex flex-row items-center" >
                                    <div className="p-2 rounded-full bg-safety-700 " >
                                        <Icons size={20} />
                                    </div>
                                    <p className="text-3xl font-semibold px-4 text-prussian-800" >{item.title}</p>
                                </div>
                                <ul className="text-xl font-medium text-slate-600   py-6 list-disc px-6" >
                                    {item.list.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </SizeBox>
        </div>
    )
}

function Clients() {
    let [data, setData] = useState(ListClients)
    let [one, setOne] = useState(ListClients[0])
    let BtnList = (props: any) => (
        <div
            className={`bg-white rounded-full p-2 px-6 m-4 my-2 border  w-full h-12 flex items-center py-4 font-semibold  ${props.data.title == one.title ? ' font-bold text-safety-700 border-safety-700 ' : "text-prussian-600 text-base border-prussian-600 "}  ${props.className || " "}`}
            {...props}
        >
            {props.data?.title || props.data}
        </div>
    )
    return (
        <div className="">
            <SizeBox className="bg-[#F0F0F0] rounded-[50px] w-full flex flex-col">
                <div className="flex flex-row items-center m-auto w-[90%] mt-10" >
                    <Logo type="semple" />
                    <h1 className="w-full text-start text-safety-700 mr-10 text-6xl font-bold leading-loose tracking-tight  ">عملاؤنا </h1>
                </div>
                <div className="flex flex-wrap text-base font-medium leading-loose tracking-normal text-justify  mb-6 p-8">
                    <p>نتفهم أن المستثمرين العقاريين يطالبون بمستوى عالٍ من التدقيق عند تقييم الاستثمارات المحتملة ومستشاراً يفهم أهدافهم ومصالحهم الفضلى، يضم فريقنا خبراء متمرسين يركزون على الاحتياجات والأهداف الفريدة لعملائنا </p>
                    <p className="pt-4"> نقدم مجموعة من التقييمات والخدمات المصممة لمساعدة المالكين والمستثمرين على تقليل المخاطر وتعظيم العوائد من خلال </p>
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col w-80 mb-4  ">
                        {data.map(client => <BtnList data={client} onClick={() => setOne(client)} key={client.title} />)}
                    </div>
                    <div className="flex flex-wrap mx-8 w-full">
                        {one.list.map(item => <div key={item} className="bg-prussian-800 text-white rounded-[59px] p-2 px-6 m-4 h-40 flex items-center justify-center py-6 gap-40 text-xl font-bold leading-loose tracking-normal text-right w-[45%]" >{item}</div>)}
                    </div>
                </div>
            </SizeBox>
        </div>
    )
}
function Expertise() {

    return (
        <div className="">
            <SizeBox className="  w-full flex flex-col">
                <div className="flex flex-row items-center m-auto w-[90%] my-10" >
                    <Logo type="semple" />
                    <div className="flex flex-col mr-10 ">

                        <h1 className="w-full text-start text-5xl font-bold text-safety-700  ">مجالات الخبرة </h1>
                        <p>تخصصات في قطاعات مختلفة و شاملة تغنيك عن التعامل مع عدة شركات.   </p>
                    </div>
                </div>
            </SizeBox >
            <div className="overflow-x-scroll px-24">
                <div className="flex flex-row scroll-auto w-[2200px] content"               >
                    {listExpertise.map((item, i) => <CardExpertise data={item} key={i} />)}
                </div>
            </div>
        </div >
    )
}
function CardExpertise({ data }: { data: ExpertiseType }) {
    return (
        <div className={`flex m-4 ${data.top ? "flex-col" : "flex-col-reverse justify-end"} w-96`}    >
            <img src={data.icon} className={`${data.w ? "w-40" : "w-96"} `} alt="" loading="lazy" />
            <div className="flex flex-col my-4" >
                <p className="text-safety-700 mt-8 text-3xl font-bold leading-snug tracking-normal text-right">{data.title}</p>
                <ol className="flex flex-col mx-4 mt-8 text-xl font-medium leading-loose tracking-tightest text-right">
                    {data.list.map(a => <li key={a} className="list-disc">{a}</li>)}
                </ol>
            </div>

        </div>
    )
}
type ExpertiseType = {
    title: string,
    list: string[]
    icon: string
    top: boolean
    w?: string
}
let ListClients = [
    {
        title: "المستثمرون العقاريون",
        list: [
            "تحديد المشاكل المحتملة لإلغاء الصفقات أو أحد الأصول ",
            "توفير المعلومات التي يمكن للمستثمرين استخدامها للتفاوض على سعر الشراء ",
            "المساعدة في التخطيط لصيانة المباني والنفقات الرأسمالية ",
            "مساعدة المالكين على الامتثال للوائح / المعايير وحماية صحة الإنسان وسلامته ",
            "التعرف على فرص تحقيق عائد على الاستثمار ",
            "زيادة كفاءة الأصول واستدامتها وقابليتها للتسويق ",
        ]
    }, {
        title: "أصحاب المنشآت ",
        list: [
            " تقييمات حالة المنشأة ",
            " تقرير حالة الملكية ",
            " (MCR) تقرير حالة الصيانة ",
            " (OCR) تقرير تكلفة التشغيل "
        ]
    }, {
        title: "الجهات المانحة ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]

    }, {
        title: "المباني الحكومية ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]

    }, {
        title: "الوسطاء العقاريون ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]

    }, {
        title: "شركات التأمين ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]

    }, {
        title: "المطورون العقاريون ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]
    }, {
        title: "المؤسسات المالية ",
        list: [" تقييمات حالة المنشأة ", " تقرير حالة الملكية ",]
    },
]