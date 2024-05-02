"use client"
import Link from "next/link"
import Icon from "../icons"
import Logo from "./logo1"

import dataList from "@/data/footerList.json"
import PupLinks from "./pup-links"

let sochalmedia = [
    { Icon: Icon.tiktok, to: "https://www.tiktok.com/@inspectex" },
    // { Icon: Icon.linkedin, to: "/#1" },
    { Icon: Icon.x, to: "https://twitter.com/Inspectex_sa" },
    // { Icon: Icon.instagram, to: "/#3" },
    { Icon: Icon.Snapchat, to: "/#4" },
]

export default function Footer() {



    return (
        <footer className={` flex flex-col border-y-[40px] border-safety-700 *:text-md   *:text-slate-900 `} style={{
            background: 'linear-gradient(360deg, #CDCDCD 0%, #EFEFF1 19.34%, #FFFFFF 52.54%), linear-gradient(0deg, #F25B06, #F25B06)'
        }}
        >
            {/* add map */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d572.4348198944405!2d46.69394306528545!3d24.804518960971865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efd097e7e9681%3A0xcf6a844114dfed61!2sBuilding%20Rank%20SA!5e0!3m2!1sar!2slb!4v1708619809636!5m2!1sar!2slb" width={'100%'} height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="flex flex-wrap items-center justify-evenly  py-14 " >
                <PupLinks />
                <div className="flex tap:flex-col justify-end *:m-[20px] min-w-[250px]  flex-row m-4 " >
                    {sochalmedia.map(Item => <Link href={Item.to} key={Item.to} > <Item.Icon /> </Link>)}
                </div>

                <Col title={'معلومات الإتصال'} >
                    <p className="text-safety-500 text-base font-bold">العنوان</p>
                    <p className="text-slate-500 my-2 text-sm">الرياض - شارع عثمان بن عفان </p>
                    <p className="text-safety-500  mt-2  text-sm font-bold">الايميل</p>
                    <a href="mailto:info@inspectex.com" className="py-4 text-slate-500 text-sm font-bold">info@inspectex.com</a>

                    <p className="text-safety-500 mt-2 text-base font-bold">ارقام هواتف </p>
                    <a href="tel:+966533344735" className="py-2 text-slate-500 text-sm font-bold "> 00966-533344735</a>
                    <a href="tel:+966536800408" className="py-2 text-slate-500 text-sm font-bold"> 00966-536800408</a>
                    <a href="tel:+966920005543" className="py-2 text-slate-500 text-sm font-bold"> 00966-920005543</a>

                </Col>

                <Col title={dataList.sitemap.title} >
                    {dataList.sitemap.list.map(item => <Item key={item.to} data={item} />)}
                </Col>

                <Col title={'طرق الدفع'}   >
                    {[Icon.masterCard, Icon.visa, Icon.Troy].map((IconOne, i) => (
                        <div key={i} className="w-[50px] h-[50px] flex items-center justify-center"> <IconOne /></div>
                    ))}
                </Col>

                <Col title={dataList.policies.title}  >
                    {dataList.policies.list.map(item => <Item key={item.to} data={item} />)}
                </Col>
            </div >
            <div style={{}} className="flex flex-row max-[700px]:flex-col-reverse p-6 md:mr-[140px]  md:ml-[140px] justify-between ">
                <p className="p-2 text-xl font-bold text-blue-950 max-[700px]:!text-md">© 2023 شركة إنسبكتكس السعودية</p>
                <Logo size={"260"} type="arOrange" />
            </div>
            <C_Dev_andDes />
        </footer >
    )
}

// col box style
type ColType = { title: string, children: any, className?: string }
function Col({ title, children, className }: ColType) {
    return (
        <div className={`w-full flex  flex-col max-w-[250px] min-h-[300px] ${className}`}>
            <b className="text-safety-700 mb-6 text-2xl font-bold">{title}</b>
            {children}
        </div>
    )
}

//  item is already
type ItemType = {
    data: {
        title: string
        to: string
    }
    className?: string
}
function Item({ data, className }: ItemType) {
    let { title, to } = data
    return <Link href={to} className={` text-start text-base font-bold p-2 text-gray-500  ${className} `}>{title}</Link>
}

function C_Dev_andDes() {

    return (
        <div className="flex flex-row m-auto p-4 " style={{ direction: 'ltr' }} >
            <p>Designed by SNRGY and Developed by
                <a href="https://Digitresults.com" className="px-2 text-prussian-800" >DigitResults</a>
            </p>
        </div>
    )
}