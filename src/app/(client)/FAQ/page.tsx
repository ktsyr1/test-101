"use client"

"use client"
import { useEffect, useState } from "react"
import FAQ from '@/data/FAQ.json'
import Btn from "@/component/btns"
import { Ask } from "@/component/theme/FAQ"
import cookies from "js-cookie"
import GetFatch from "@/component/froms/get"

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
export default function QA() {
    let [part, setPart] = useState('client')

    const Layout = ({ children, slug }: LayoutType) => part === slug ? <>{children}</> : <></>

    let slug: any = {
        strategy: 1,
        client: 2,
        eng: 3
    }
    function ColData({ Slug }: { Slug: any }) {
        return (
            <Layout slug={Slug}>
                <>
                    {list?.filter((a: any) => a.faqType == slug[Slug]).map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                </>
            </Layout>
        )
    }


    let [list, setList] = useState<FQA[]>([])
    useEffect(() => {
        async function GET() {
            // find cash
            let cashList: any = cookies.get("cashListFAQ")
            if (cashList) {
                setList(JSON.parse(cashList))
            } else {
                // get data
                let data = await GetFatch("/Guest/FAQ")
                // set cash
                setList(data?.data)
                cookies.set("cashListFAQ", JSON.stringify(data?.data))
            }

        }
        GET()
    }, [])
    return (
        <div className="flex flex-col py-14  max-[697px]:p-4 tap:p-20 bg-[#F0F0F0]  select-none justify-center items-center  " id="faq">
            {/* add map */}
            <div className={`flex  items-center justify-center w-full flex-col h-max-xl:w-[1500px]  max-w-[1000px] lap:max-w-[1360px]`}>
                <b className="text-safety-700 mb-6 lap:text-6xl font-black  text-xl text-start w-full  tap:text-3xl  ">أسئلة شائعة</b>
                <p className="  lap:text-xl font-semibold text-slate-500  text-sm text-start  w-full   tap:text-lg">لقد أولينا المزيد من الاهتمام لتخصيص الإجابات أدناه، ولتسهيل الأمر عليك، قمنا بتصنيف الأسئلة لك</p>
                <div className=" w-full max-[697px]:p-1 justify-center">
                    <Header setPart={setPart} part={part} />
                    {/* list QA */}
                    <ColData Slug="eng" />
                    <ColData Slug="client" />
                    <ColData Slug="strategy" />
                </div>
            </div>
        </div >
    )
}
function Header({ setPart, part }: any) {
    return (
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
    )
}
let dataBtns = [
    { title: "أسئلة العملاء", slug: "client" },
    { title: "استراتيجيات الفحص", slug: "strategy" },
    { title: "أسئلة الفاحصين", slug: "eng" },
]



