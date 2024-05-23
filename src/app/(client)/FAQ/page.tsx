"use client"

"use client"
import { useState } from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import FAQ from '@/data/FAQ.json'
import Icon from "@/component/icons"
import Btn from "@/component/btns"
import { Ask } from "@/component/theme/FAQ"

type LayoutType = {
    children: JSX.Element
    slug: string
}

export default function QA() {
    let [part, setPart] = useState('client')
    const pathname = usePathname()

    const Layout = ({ children, slug }: LayoutType) => part === slug ? <>{children}</> : <></>
    return (
        <div className="flex flex-col py-14  max-[697px]:p-4 tap:p-20 bg-[#F0F0F0]  select-none justify-center items-center  " id="faq">
            {/* add map */}
            <div className={`flex  items-center justify-center w-full flex-col h-max-xl:w-[1500px]  max-w-[1000px] lap:max-w-[1360px]`}>
                <b className="text-safety-700 mb-6 lap:text-6xl font-black  text-xl text-start w-full  tap:text-3xl  ">أسئلة شائعة</b>
                <p className="  lap:text-xl font-semibold text-slate-500  text-sm text-start  w-full   tap:text-lg">لقد أولينا المزيد من الاهتمام لتخصيص الإجابات أدناه، ولتسهيل الأمر عليك، قمنا بتصنيف الأسئلة لك</p>
                <div className=" w-full max-[697px]:p-1 justify-center">

                    <div className="flex flex-row bg-white max-w-[1000px] lap:max-w-[1360px] rounded-md p-1 m-4 overflow-x-scroll ">
                        {dataBtns.map(btn => <Btn
                            key={btn.slug}
                            title={btn.title}
                            onClick={() => setPart(btn.slug)}
                            className={`rounded-md shadow-none cursor-pointer border-2 hover:bg-safety-700 hover:text-white   !p-2 !m-1 text-sm max-[697px]:w-full w-full ${part === btn.slug ? "border-2 border-safety-700 text-safety-700 " : " text-slate-900 "}   `}
                        />)}
                    </div>
                    <Link href={"#faq"} className="fixed bg-white p-3 w-12 h-12 flex items-center justify-center rounded-md tap:mr-[-60px] ">
                        <Icon.arrowUp />
                    </Link>
                    {/* list QA */}
                    <Layout slug="eng">
                        <>
                            {FAQ.filter(a => a.type == "eng").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="client">
                        <>
                            {FAQ.filter(a => a.type == "client").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="strategy">
                        <>
                            {FAQ.filter(a => a.type == "strategy").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                </div>
            </div>
        </div>
    )
}

let dataBtns = [
    { title: "أسئلة العملاء", slug: "client" },
    { title: "استراتيجيات الفحص", slug: "strategy" },
    { title: "أسئلة الفاحصين", slug: "eng" },
]



