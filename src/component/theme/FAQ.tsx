"use client"
import Btn from "../btns"
import { useEffect, useRef, useState } from "react"
import Icon from "../icons"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import GetFatch from "../froms/get"
import "@/component/styles/style.css"
type LayoutType = {
    children: JSX.Element
    slug: string
}
type FQA = {
    title: string
    value: string
    FAQType: number
    IsFooter: Boolean
}
export async function GetFAQ() {
    // find cash
    let cashList: any = sessionStorage.getItem("ListFAQ")

    if (cashList) return JSON.parse(cashList)
    else {

        let { data } = await GetFatch("/Guest/FAQ")
        let testData = JSON.stringify(data)
        sessionStorage.setItem("ListFAQ", testData)
        return data
    }
}

export default function QA() {
    let [part, setPart] = useState('client')
    const pathname = usePathname()
    let [list, setList] = useState<FQA[]>([])
    useEffect(() => {
        async function get() {
            let res = await GetFAQ()
            setList(res)
        }
        if (pathname != "/FAQ") get()

    }, [])
    let slug = {
        strategy: 1,
        client: 2,
        eng: 3
    }
    const Layout = ({ children, slug }: LayoutType) => part === slug ? <>{children}</> : <></>
    if (pathname == "/FAQ") return <></>
    else {

        return (
            <div className="flex flex-col py-14  max-[697px]:p-4 tap:p-20 bg-[#F0F0F0]  select-none justify-center items-center  ">
                {/* add map */}
                <div className={`flex  items-center justify-center w-full flex-col h-max-xl:w-[1500px]  max-w-[1000px] lap:max-w-[1360px]`}>
                    <b className="text-safety-700 mb-6 lap:text-6xl font-black  text-xl text-start w-full  tap:text-3xl  ">الأسئلة الشائعة</b>
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
                        {list?.length == 0 && <div className="loader m-auto my-8  border-[6px] border-safety-700 "></div>}
                        {/* list QA */}

                        {/* start api  */}
                        <Layout slug="eng">
                            <>
                                {list?.filter((a: any) => a.faqType == slug["eng"] && a?.isFooter).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                            </>
                        </Layout>

                        <Layout slug="client">
                            <>
                                {list?.filter((a: any) => a.faqType == slug["client"] && a?.isFooter).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                            </>
                        </Layout>

                        <Layout slug="strategy">
                            <>
                                {list?.filter((a: any) => a.faqType == slug["strategy"] && a?.isFooter).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                            </>
                        </Layout>
                        {/* end api  */}
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
}
type Asktype = {
    title: string,
    value: string
}
export function Ask({ title, value }: Asktype) {
    let [open, setOpen] = useState(false)
    let ef: any = useRef(null)
    function handleOpen() {
        setOpen(!open)
        if (ef.current && ef.current.style) {
            ef.current.style.maxHeight = open ? '0' : '500px';  // تعديل max-height
            ef.current.style.overflow = 'hidden';
            ef.current.style.transition = 'max-height 0.5s ease-in-out';
            // ef.current.style.display = !open ? 'flex' : "none"
            // ef.current.style.transition = 'display 5s ease-in-out';
        }
    }
    return (
        <div className="flex flex-col border-b-1 text-slate-700 w-full" >
            {/* ask */}
            <div className="flex flex-row justify-between w-full items-center cursor-pointer group transition duration-300 delay-150 fo:delay-300" onClick={handleOpen}>
                <p className={`tap:text-xl lap:text-2xl font-medium text-[#1B2E45] text-sm max-w-[92%] py-6  group-hover:text-safety-700 ${open ? "!text-safety-700" : " "}  `}>{title}</p>
                {/* icon */}
                {open ? <Icon.arrowUp /> : <Icon.arrowDown />}
            </div>

            {/* anser */}
            <ul
                ref={ef}
                className={`overflow-hidden transition-max-height duration-500 flex-col justify-between max-w-[90%] text-xs text-gray-500 font-medium tap:text-lg mt-2 max-h-screen `}
                style={{ maxHeight: '0', transition: 'max-height 0.5s ease-in-out' }}
            >

                {value.split(" | ").map(a => <li style={{ listStyle: 'inside' }} key={a}>{a}</li>)}
            </ul>
        </div>
    )
}

export let dataBtns = [
    { title: "أسئلة العملاء", slug: "client" },
    { title: "استراتيجيات الفحص", slug: "strategy" },
    { title: "أسئلة الفاحصين", slug: "eng" },
]



