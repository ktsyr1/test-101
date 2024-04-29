import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FieldType } from '../types';
import { NextPage, SubmitButton2 } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ConfigApi } from '@/component/lib';
import JsCookies from 'js-cookie';

const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let [RealEstatTypes, setRealEstatTypes] = useState<any>([])
    let [RealEstatAges, setRealEstatAges] = useState<any>([])

    useEffect(() => {

        async function Cities() {
            let { url, headers } = ConfigApi()
            let UrlRealEstatType = url + `/Lookup/RealEstatType`

            function Err(err: any) {
                console.error(err)
                if (err.response.status === 401) {
                    JsCookies.remove('userToken')
                    location.reload()
                }
                return
            }
            axios.get(UrlRealEstatType, { headers })
                .then(({ data }) => setRealEstatTypes(data?.data))
                .catch((error) => Err(error))

            let UrlRealEstatAges = url + `/Lookup/RealEstatAges`
            axios.get(UrlRealEstatAges, { headers })
                .then(({ data }) => setRealEstatAges(data?.data))
                .catch((error) => Err(error))
            return

        }
        Cities()
    }, [data])

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

    function Field({ children, title, className }: any) {
        return (
            <div className={className}>
                <p className="text-xl  font-bold text-prussian-800 my-2 mr-4">{title}</p>
                <div className='flex flex-col w-full m-4 '>       {children}</div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex flex-row'>
                <Field title="نوع العقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatTypes}
                        title={RealEstatTypes.filter((A: any) => A?.value === defaultData.realEstateTypeId)[0]?.text || "حدد نوع العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateTypeId": s.value })}
                    />
                </Field>

                <Field title="  العمر التقريبي للعقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatAges}
                        title={RealEstatAges.filter((A: any) => A?.value === defaultData.realEstateAgesId)[0]?.text || "حدد نوع العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateAgesId": s.value })}
                    />
                </Field>

            </div>

            <div className='flex flex-row m-4 p-4'>
                <Input text="عدد الطوابق" name="numberOfFloors" type="number" />
                <Input text="مسطحات البناء المسقوفة ( م²)" name="buildingArea" type="number" />
            </div>

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
                        <button type="button" onClick={(() => set(a))} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a.text} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}
export default FormPropertyData;
