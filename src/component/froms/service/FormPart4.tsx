import React, { useContext, useReducer, useState, } from 'react';
import { FormDataContext } from '../contextApi';
import { Table } from "antd";

import JsCookies from 'js-cookie';
import GetFatch, { createFatch } from '../get';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };

    else return state;
}

// ------------------------------------------
export default function FormPart4() {

    const router = useRouter()
    let { data, Content } = useContext(FormDataContext)
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

    let [Send, setSend] = useState(false)

    const onSubmit = (res: any) => {
        // if (Send) {
        console.log(data)
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


        axios.post(process.env.NEXT_PUBLIC_apis + "/payment?" + searchParams, model)
            .then(({ data }) => {
                console.log(res)
                JsCookies.set("tran_ref", data?.tran_ref)
                data?.redirect_url && router.push(data?.redirect_url)
            }
            )
    }

    const columns = [
        { title: "العنوان", dataIndex: "title", key: "title", },
        { title: "القيمة", dataIndex: "value", key: "value", },
    ];

    const columns2 = [
        { title: "العنوان", dataIndex: "title", key: "title", },
        {
            title: "القيمة", dataIndex: "value", key: "value",
            render: (_: any, record: any) => <p className={record.value && record.title == "قيمة الكوبون" && "text-green-600"}>  {record.value} ر.س </p>
        }
    ]
    return (
        <div className='*:py-2 mb-10 '   >
            <Table dataSource={list} columns={columns} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.title} />
            <p className="lap:text-2xl tap:text-lg text-sm font-bold text-prussian-800 my-2 mr-4">التكلفة</p>

            <Table dataSource={calculator} columns={columns2} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.title} />
            <div className={`flex flex-row my-4 w-full   `}>
                <input type={"checkbox"} className='p-2 ml-4 rounded-md' onChange={(e: any) => setSend(!Send)} checked={Send} />
                <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-slate-800 my-2 mr-4">الموافقة على
                    <Link href={"/policies-and-provisions"} target='_blank' className='text-prussian-500' > الشروط والأحكام </Link>
                </p>
            </div>

            <input type='submit' value="اتمام عملية الدفع" onClick={onSubmit} className={`p-2 mx-4  text-white rounded-lg w-full    ${Send ? "bg-safety-700 cursor-pointer" : "bg-[#6B7B8F]"} `} disabled={!Send} />
            <br />
        </div>
    );
}
