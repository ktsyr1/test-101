import React, { useContext, useRef, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FieldType } from '../types';
import { NextPage, SubmitButton2 } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';


const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    const [form] = Form.useForm();
    let setDataValue = (select: string, D: any) => setData({ ...defaultData, [select]: D })
    let list = {
        significantProblems: [
            { title: " مشاكل إنشائية" },
            { title: " مشاكل كهربائية" },
            { title: " مشاكل سباكة وتسريبات" },
            { title: " مشاكل تهوية وتكييف" },
            { title: "أخرى" },
        ]
    }


    const { register, handleSubmit } = useForm();
    const onSubmit = (res: any) => {

        setData({ ...data, ...res })
        let slug = NextPage(select)
        setSelect(slug)
    };

    function Input({ text, name, type = "test" }: any) {
        return (
            <div className="flex flex-col my-4 w-full">
                <p className="text-xl  font-bold text-prussian-800 my-2 mr-4">{text}</p>
                <input type={type} {...register(name)} className='p-2 ml-4 rounded-md' />
            </div>
        )
    }


    function Checkbox({ title, name, onClick }: any) {
        return (
            <div className="relative flex items-start py-4 ml-2 min-w-[100px]">
                <input id={title} type="checkbox" className="hidden peer" {...register(`${name}[]`)} value={title} onClick={onClick} />
                <label htmlFor={title} className="bg-white border-2 border-gray-200 cursor-pointer items-center p-5 peer-checked:bg-prussian-600 peer-checked:text-white rounded-lg text-center text-gray-500 w-full ">{title}
                </label >
            </div >
        )
    }
    function Field({ children, title, className }: any) {
        return (
            <div className={className}>
                <p className="text-xl  font-bold text-prussian-800 my-2 mr-4">{title}</p>
                <div className='flex flex-col w-full m-4 '>       {children}</div>
            </div>
        )
    }
    let setCheckboxData = (d: any) => setDD({ ...defaultData, ['significantProblems']: d })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex flex-row'>
                <Field title="نوع العقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={["فيلا", "شقة", "عمارة", "استراحة", "مزرعة"]}
                        title={data?.propertyType || "حدد نوع العقار"}
                        set={setDataValue}
                        name="propertyType"
                    />
                </Field>

                <Field title="  العمر التقريبي للعقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={["0 - 5 سنة", "5 - 10 سنة", " 10 - 15 سنة", "15 سنة فأكثر"]}
                        title={data?.approximateAge || "حدد العمر التقريبي العقار"}
                        set={setDataValue}
                        name="approximateAge"
                    />
                </Field>

            </div>

            <div className='flex flex-row m-4 p-4'>
                <Input text="مساحة الأرض ( م²)" name="landArea" type="number" />
                <Input text="مسطحات البناء المسقوفة ( م²)" name="builtUpArea" type="number" />
            </div>
            {/* list */}

            <Field title="أهداف الفحص" className='flex flex-col w-full m-4 max-w-[350px] '>
                <Select
                    list={["شراء", "بيع", "استئجار", "ترميم"]}
                    title={data?.inspectionGoals || "حدد أهداف الفحص"}
                    set={setDataValue}
                    name="inspectionGoals"
                />
            </Field>
            {/* list */}
            <Field title="هل يوجد أي مشاكل ملحوظة" className='flex flex-col w-full m-4  '>
                <div className='flex flex-wrap'>
                    {list.significantProblems.map(a => <Checkbox title={a.title} name="significantProblems" onClick={() => setCheckboxData(a.title)} key={a.title} />)}
                </div>
            </Field>

            {defaultData?.significantProblems === "أخرى" &&
                <Field title="يرجى ذكرها بشكل واضح" className='flex flex-col w-full m-4  '>
                    <textarea {...register('otherNotes')} className='rounded-md' />
                </Field>
            }
            <Field title="ملاحظات أخرى" className='flex flex-col w-full m-4  '>
                <textarea {...register('additionalComments')} className='rounded-md' />
            </Field>
            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

function Select({ list = [], title, name, set }: any) {
    let m: any = useRef(null)

    return (
        <div>
            <button onClick={(e: any) => m.current?.classList.toggle("hidden")} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-white dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-full rounded-lg" type="button">
                {title}
            </button>
            <ul ref={m} className="py-2 hidden text-sm text-gray-700 dark:text-gray-200 absolute bg-white w-44 rounded-lg z-40">
                {list?.map((a: any) => (
                    <li key={a}>
                        <button type="button" onClick={(() => set(name, a))} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}
export default FormPropertyData;

// test data
let aa = {
    "projectTitle": "string",
    "projectImage": "string", // not found in the form
    "realEstateTypeId": 0,
    "workAreaId": 0,
    "realEstateMunicipal": "string",
    "realEstateNumber": "string",
    "realEstateStreet": "string",
    "longitude": "string",
    "latitude": "string",
    "projectDate": new Date(),
    "description": "string",
    "startTime": "string",
    "endTime": "string",
    "realEstateAgesId": 0,
    "buildingArea": 0,
    "additionalFieldsValue": [
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "value": "string"
        }
    ],
    "projectObjectives": [
        {
            "assessmentObjectivesId": 0
        }
    ]
}