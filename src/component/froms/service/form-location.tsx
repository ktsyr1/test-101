import React, { useContext, useEffect, useRef, useState } from 'react';
import { FieldType, TypeBtn } from '../types';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import { ConfigApi } from '@/component/lib';
import axios from 'axios';

export default function FormLocation() {

    let { select, setSelect, list } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    // end context 

    let [defaultData, setDD] = useState(data)
    const [study, setStudy] = useState('');
    const [nextPart, setNextPart] = useState(false);

    const { register, handleSubmit }: any = useForm<FieldType>()

    let [cities, setCities] = useState<any>(["الرياض"])

    useEffect(() => {
        let { info, headers } = ConfigApi()
        setDD({ ...defaultData, fullName: info?.loginName })

        async function Cities() {
            let url = process.env.NEXT_PUBLIC_API
            url += `/Lookup/Cities`
            // axios.get(`${process.env.NEXT_PUBLIC_API}/Lookup/Cities`, { headers })
            //     .then(({ data }) => setCities(data?.data))
            //     .catch(error => console.error(error))
            return
        }
        Cities()
    }, [data])
    const onChange = () => {

        if (true) {
            if (study && study.length > 7) {
                setNextPart(true);
                setNextPart(true)
            }
            else setNextPart(false)
        } else setNextPart(false)

    }

    const onSubmit = (res: any) => {
        let NewData = res//{ codeEng: watch("codeEng"), yearsExperience: watch("yearsExperience"), study: study }
        console.log(NewData);

        setData({ ...data, ...NewData })
        let slug = NextPage(select)
        setSelect(slug)
    }

    function Field({ children, title, className }: any) {
        return (
            <div className={className}>
                <p className="text-xl  font-bold text-prussian-800 my-2 mr-4">{title}</p>
                <div className='flex flex-col w-full  '>       {children}</div>
            </div>
        )
    }

    function Input({ text, name, type = "test" }: any) {
        return (
            <div className="flex flex-col my-4 w-full">
                <p className="text-xl  font-bold text-prussian-800 my-2 mr-4">{text}</p>
                <input type={type} {...register(name)} className='p-2 ml-4 rounded-md' />
            </div>
        )
    }


    return (

        <form onChange={onChange} className='flex flex-col' onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-row w-full ">
                <Field title="المدينة" className='flex flex-col w-full m-4 max-w-[350px] '>
                    <Select
                        list={cities}
                        title={defaultData?.city || "حدد المدينة"}
                        set={setDD}
                        name="city"
                    />
                </Field>
                <Input text="البلدية" name="municipality" />
            </div>
            <div className="flex flex-row w-full ">
                <Input text="الحي" name="neighborhood" />
                <Input text="اسم الشارع" name="streetName" />
            </div>
            <div className="flex flex-row w-full ">
                <Input text="رقم العقار" name="buildingNumber" />
                <Input text="إضافة الموقع من خلال خرائط جوجل" name="googleMapsLocation" />
            </div>
            <br />
            <SubmitButton active={nextPart && nextPart} onClick={() => onChange} >التالي</SubmitButton>
        </form>
    );
}

export function SubmitButton({ children, onClick, className, active }: TypeBtn) {
    return <input type="submit" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F] cursor-pointer  ${className} ${active == true ? "!bg-safety-700" : ""}`} onClick={onClick} value={children} />
}


function Select({ list = [], title, name, set }: any) {
    let m: any = useRef(null)

    return (
        <div>
            <button onClick={(e: any) => m.current?.classList.toggle("hidden")} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-white dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-full rounded-lg" type="button">
                {title}
            </button>
            <ul ref={m} className="  hidden text-sm text-gray-700 dark:text-gray-200 absolute bg-white w-44 rounded-lg z-40">
                {list?.map((a: any) => (
                    <li key={a}>
                        <button type="button" onClick={(() => set(name, a))} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}
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