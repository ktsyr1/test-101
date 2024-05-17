"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import menuAdmin from "@/data/menuAdmin.json";
import JsCookies from "js-cookie"
import LoginPage from "../auth/login/page";

export default function LayoutAdmin({ children }: any) {
    // users , blog , jobs , sliders , services , FAQs ,
    let token = JsCookies.get("--token");
    console.log(token);
    
    if (!token) return <LoginPage />
    else return (
        <div className="flex flex-row max-[697px]:mt-[128px] mt-[78px] min-h-[700px] ">
            <div className="flex flex-col !w-80 bg-slate-50 ">
                <b className="w-full text-center font-bold text-4xl my-16">لوحة التحكم</b>
                {menuAdmin.map(a => <Item {...a} key={a.to} />)}
            </div>
            <div className="flex flex-col m-4 w-full">
                {children}
            </div>
        </div>
    )
}
type ItemType = {
    to: string
    title: string
    Icon?: string
}

function Item({ title, to, Icon }: ItemType) {
    const pathname: any = usePathname()
    return (
        <Link href={`/admin/${to}`} className={`p-4 hover:bg-white font-bold mx-4 w-full rounded-lg ${to == pathname?.split("/")[2] && "text-safety-700 bg-white"}`}  >
            {/* icons */}
            {/* <img src={`/icons/${Icon}`} alt="" /> */}
            <p>{title}</p>
        </Link>
    )
}
