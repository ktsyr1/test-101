import React, { useContext, useReducer, useState, } from 'react';
import { FormDataContext } from '../contextApi';
import { Table } from "antd";

import JsCookies from 'js-cookie';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createFatch } from './sendpaymonet';
const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };

    else return state;
}

// ------------------------------------------
export default function FormPart4() {

    const router = useRouter()
    let { data, Content } = useContext(FormDataContext)
    let [list, setList] = useState(() => {

        let titles: any = {
            "projectTitle": "اسم المشروع",
            "realEstateTypeId": "نوع العقار",
            "realEstateAgesId": "العمر التقريبي للعقار",
            "numberOfFloors": "عدد الطوابق",
            "buildingArea": "مسطحات البناء المسقوفة ( م²)",
            "projectObjectives": "اهداف المشروع",
            "workAreaId": "منطقة العمل",
            "realEstateMunicipal": "البلدية العقارية",
            "realEstateNumber": "رقم العقار",
            "realEstateStreet": "شارع العقارات",
            "projectDate": "تاريخ يوم الفحص",
            "startTime": "ساعة بداية الفحص",
            "endTime": "ساعة انتهاء الفحص",
            "description": "وصف إضافي"
        };
        return Object.keys(titles).map(a => { return { title: titles[a], value: Content[a] } })
    })

    let [calculator, setCalculator] = useState(() => {

        let titles: any = {
            "subtotal": "المجموع الفرعي",
            "promoCodePrice": "قيمة الكوبون",
            "totalAmount": "المبلغ الاجمالي",
            "serviceTax": "ضريبة الخدمة",
            "tax": "الضريبة",
            "netTotal": "الإجمالي الصافي"
        }
        return Object.keys(titles).map(a => { return { title: titles[a], value: data?.res?.assessmentPayment[a] } })
    })


    let [Send, setSend] = useState(false)

    const onSubmit = (res: any) => {
        // if (Send) {
        // console.log(data)
        let userInformation: any = JsCookies.get("userInformation")
        userInformation = JSON.parse(userInformation)
        let { addAssessments, assessmentPayment }: any = data?.res

        let model = {
            id: addAssessments.id,
            amount: assessmentPayment.netTotal,
            description: `دفع تكاليف الخدمة للمشروع : ${addAssessments.projectTitle}`,
            name: userInformation.loginName,
            email: userInformation.email,
            phone: userInformation.phoneNumber,
            street: addAssessments.realEstateStreet,
            city: Content.workAreaId, //Content
            state: "",
            zip: "",
        }


        const searchParams: any = encodeURI(`id=${model.id}&amount=${model.amount}&description=${model.description}&name=${model.name}&email=${model.email}&phone=${model.phone}&street=${model.street}&city=${model.city}&state=${model.state}&zip=${model.zip}`)
        let token: any = JsCookies.get("userToken")

        createFatch("/payment?" + searchParams, model, token)
            .then((data) => {
                JsCookies.set("tran_ref", data?.tran_ref)
                console.log(data?.redirect_url);
                
                data?.redirect_url && router.push(data?.redirect_url)
            }
            )
    }

    return (
        <div className='*:py-2 mb-10 '   >

            <TableView data={list} title="معلومات الفحص" />
            <TableView data={calculator} title="التكلفة" aded="ر.س " />
            <div className={`flex flex-row my-4 w-full   `}>
                <input type={"checkbox"} className='p-2 ml-4 rounded-md' onChange={(e: any) => setSend(!Send)} checked={Send} />
                <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-slate-800 my-2 mr-4 ">الموافقة على
                    <Link href={"/policies-and-provisions"} target='_blank' className='text-prussian-500' > الشروط والأحكام </Link>
                </p>
            </div>

            <input type='submit' value="اتمام عملية الدفع" onClick={onSubmit} className={`p-2 mx-4  text-white rounded-lg w-full    ${Send ? "bg-safety-700 cursor-pointer" : "bg-[#6B7B8F]"} `} disabled={!Send} />
            <br />
        </div>
    );
}

function TableView({ data, title, aded }: any) {
    return (
        <div className='flex flex-col'>
            <p className='p-2 w-full text-center rounded-md rounded-t-3xl border-2 border-prussian-800 text-prussian-800 m-1 lap:text-xl tap:text-base text-sm font-bold'>{title}</p>
            {data?.map((row: any, i: number) => {
                return (
                    <div key={i} className="flex flex-row m-1 w-full *:rounded-md *:flex *:items-center ">
                        <p className="lap:text-base tap:w-[40%] w-[50%] tap:text-sm text-xs font-bold text-white bg-prussian-800 p-2 m-1">{row.title}</p>
                        <p className="lap:text-base w-full tap:text-sm text-xs font-bold text-slate-800 bg-white p-2 m-1">  {row.value} {aded}</p>
                    </div>
                )
            })}
        </div >
    )
}