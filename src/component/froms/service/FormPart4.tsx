import React, { useContext, useReducer, useState, } from 'react';
import { FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import AdditionalFieldsValue from './AdditionalFieldsValue';
import { Popconfirm, Table, message } from "antd";

import JsCookies from 'js-cookie';
import GetFatch, { createFatch } from '../get';
import Link from 'next/link';
const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };

    else return state;
}

// ------------------------------------------
export default function FormPart4() {

    let { data, setData, Content, setContent } = useContext(FormDataContext)
    // useReducer start 
    const [state, dispatch] = useReducer(reducer, { defaultData: data });
    // useReducer end
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

    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });
    const onSubmit = (res: any) => {

        dispatch({ type: 'err', payload: {} })
        let listErr: any = {}

        if (Object.keys(listErr)?.length == 0) {


            // let token: any = JsCookies.get("userToken")
            // createFatch("/Client/Assessment", {}, token)
            //     .then((res: any) => {

            //         localStorage.removeItem("additionalFieldsValue")
            //         let slug = NextPage(select)
            //         setSelect(slug)
            //         localStorage.setItem("paymonet", JSON.stringify(res?.data?.assessmentPayment))
            //     })
        }
    }

    const columns = [
        { title: "العنوان", dataIndex: "title", key: "title", },
        { title: "القيمة", dataIndex: "value", key: "categories", },
    ];
    return (
        <div className='*:py-2 mb-10 '   >
            <Table dataSource={list} columns={columns} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.title} />
            <div className={`flex flex-row my-4 w-full   `}>
                <input type={"checkbox"} className='p-2 ml-4 rounded-md' onChange={(e: any) => setSend(!Send)} checked={Send} />
                <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">الموافقة على
                    <Link href={"/policies-and-provisions"} > الشروط والأحكام </Link>
                </p>
            </div>

            <input type='submit' value="اتمام عملية الدفع" className={`p-2 mx-4  text-white rounded-lg w-full    ${Send ? "bg-safety-700 cursor-pointer" : "bg-[#6B7B8F]"} `} disabled={Send} />
            <br />
        </div>
    );
}
