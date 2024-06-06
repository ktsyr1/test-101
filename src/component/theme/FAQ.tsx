"use client"
import Btn from "../btns"
import { useState } from "react"
import Icon from "../icons"
import { usePathname } from 'next/navigation'
import FAQ from '@/data/FAQ.json'
import Link from "next/link"

type LayoutType = {
    children: JSX.Element
    slug: string
}

export default function QA() {
    let [part, setPart] = useState('client')
    const pathname = usePathname()

    const Layout = ({ children, slug }: LayoutType) => part === slug ? <>{children}</> : <></>
    if (pathname == "/FAQ") return <></>
    return (
        <div className="flex flex-col py-14  max-[697px]:p-4 tap:p-20 bg-[#F0F0F0]  select-none justify-center items-center  ">
            {/* add map */}
            <div className={`flex  items-center justify-center w-full flex-col h-max-xl:w-[1500px]  max-w-[1000px] lap:max-w-[1360px]`}>
                <b className="text-safety-700 mb-6 lap:text-6xl font-black  text-xl text-start w-full  tap:text-3xl  ">أسئلة شائعة</b>
                <p className="  lap:text-xl font-semibold text-slate-500  text-sm text-start  w-full   tap:text-lg">لقد أولينا المزيد من الاهتمام لتخصيص الإجابات أدناه، ولتسهيل الأمر عليك، قمنا بتصنيف الأسئلة لك</p>
                <div className=" w-full max-[697px]:p-1 justify-center">

                    <div className="flex flex-row bg-white max-w-[1000px] lap:max-w-[1360px] justify-between rounded-md p-1 my-4 text-center ">
                        {dataBtns.map(btn => <Btn
                            key={btn.slug}
                            title={btn.title}
                            onClick={() => setPart(btn.slug)}
                            style={{
                                display: 'ruby-text'
                            }}
                            className={`rounded-md shadow-none cursor-pointer   hover:bg-safety-700 hover:text-white w-[100px]   !p-2 !m-1 text-sm max-[697px]:w-full tap:w-full ${part === btn.slug ? "border-2 border-safety-700 text-safety-700 " : " text-slate-900 "}   `}
                        />)}
                    </div>

                    {/* list QA */}
                    <Layout slug="eng">
                        <>
                            {FAQ.filter(a => a.type == "eng" && a.required).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="client">
                        <>
                            {FAQ.filter(a => a.type == "client" && a.required).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="strategy">
                        <>
                            {FAQ.filter(a => a.type == "strategy" && a.required).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>
                    <div className="w-full flex justify-center">
                        <Link href={"/FAQ"} prefetch={false} className={`flex flex-row items-center justify-center shadow-lg m-3 p-3 px-6 font-bold w-max text-safety-700 border border-safety-700 hover:text-white hover:bg-safety-700 rounded-xl`}  >
                            المزيد من الاسئلة الشائعة
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
type Asktype = {
    title: string,
    value: string[]
}
export function Ask({ title, value }: Asktype) {
    let [open, setOpen] = useState(false)

    function handleOpen() { setOpen(!open) }
    return (
        <div className="flex flex-col border-b-1 text-slate-700 w-full" >
            {/* ask */}
            <div className="flex flex-row justify-between w-full items-center cursor-pointer group" onClick={handleOpen}>
                <p className={`tap:text-xl lap:text-2xl font-medium text-[#1B2E45] text-sm max-w-[92%] py-6  group-hover:text-safety-700 ${open ? "!text-safety-700" : " "}  `}>{title}</p>
                {/* icon */}
                {open ? <Icon.arrowUp /> : <Icon.arrowDown />}
            </div>
            {/* anser */}
            <div className={` flex-col justify-between max-w-[90%]  text-xs  text-gray-500 font-medium tap:text-lg mt-2 ${!open ? "hidden " : "flex transition-[height] ease-in-out delay-1000"}  `} style={{
                transition: "display 1s ease-in-out"
            }}>
                <ul> {value.map(a => <li key={a} className="list-disc">{a}</li>)} </ul>
                {/* icon */}
            </div>
        </div>
    )
}

export let dataBtns = [
    { title: "أسئلة العملاء", slug: "client" },
    { title: "استراتيجيات الفحص", slug: "strategy" },
    { title: "أسئلة الفاحصين", slug: "eng" },
]



