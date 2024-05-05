import React, { useContext, useEffect, useState } from 'react';
import { FieldType, TypeBtn } from '../types';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import Icon from '../../icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from "js-cookie"
import createFatch from '../get';

type QualificationsTypes = {
    "disabled": Boolean,
    "group": null,
    "selected": Boolean,
    "text": String,
    "value": String
}
export default function FormEducation() {

    let { select, setSelect, list } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    // end context 

    let [defaultData, setDD] = useState(data)
    const [study, setStudy] = useState<QualificationsTypes>();
    const [nextPart, setNextPart] = useState(false);

    let [options, setOptions] = useState<QualificationsTypes[]>([])
    useEffect(() => {
        let token: any = Cookies.get("userToken")
        createFatch("/Lookup/Qualifications", token).then(data => setOptions(data?.data))

    }, [data])
    useEffect(() => {

        async function Qualifications() {
            let url = process.env.NEXT_PUBLIC_API
            url += `/Lookup/Qualifications`
            axios.get(url || "")
                .then(({ data }) => setOptions(data?.data))
                .catch(error => console.error(error))
            return
        }
        Qualifications()
    }, [data])
    const { register, handleSubmit, watch, formState: { errors }, }: any = useForm<FieldType>()

    const onChange = () => {
        console.clear()
        if (watch("MemberShip")?.length > 3 && watch("YearsOfExperience") > 0) {
            if (study && study?.text.length > 7) {
                setNextPart(true);
                setNextPart(true)
            }
            else setNextPart(false)
        } else setNextPart(false)

    }

    const onSubmit = () => {
        let NewData = { MemberShip: watch("MemberShip"), YearsOfExperience: watch("YearsOfExperience"), QualificationId: study?.value }
        console.log(NewData);

        setData({ ...data, ...NewData })
        let slug = NextPage(select)
        setSelect(slug)
    }

    function BtnsBol({ a }: any) {
        const setS = () => {
            setStudy(a);
            onChange()
        }

        return (
            <button type="button" onClick={setS}
                className={`w-full rounded-md max-w-[300px] my-2 p-4 ml-10 bg-white flex flex-row justify-between ${study?.text == a.text && "!bg-prussian-800 text-white"}`}
            >
                <p>{a.text} </p>
                {study?.value == a.value ? <Icon.okBorder /> : <Icon.c01 size={20} />}
            </button>
        )
    }
    return (

        <form onChange={onChange} className='flex flex-col' onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex tap:flex-row flex-col w-full mt-20">
                <div className="flex flex-col mx-4 w-full">
                    <p className="text-xl  font-bold text-prussian-800 my-2"> رقم عضوية هيئة المهندسين</p>
                    <input defaultValue="" {...register("MemberShip", { require: true, minLength: 3 })} className='w-full p-2 rounded-md ml-4 ' minLength={3} placeholder=' أدخل رقم العضوية' />
                </div>
                <div className="flex flex-col mx-4  w-full">
                    <p className="text-xl  font-bold text-prussian-800 my-2">عدد سنوات الخبرة</p>
                    <input  {...register("YearsOfExperience", { require: true, max: 50 })} type='number' className='w-full p-2 rounded-md  ' minLength={3} placeholder='0' max={50} defaultValue={defaultData.YearsOfExperience} />
                </div>
            </div>
            <div className=" flex tap:flex-row flex-col my-6"  >
                {options.map((a: any, i: any) => <BtnsBol a={a} key={i} />)}
            </div>

            <SubmitButton active={nextPart && nextPart} onClick={() => onChange} >التالي</SubmitButton>
        </form>
    );
}

export function SubmitButton({ children, onClick, className, active }: TypeBtn) {
    return <input type="submit" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F]  ${className} ${active == true ? "!bg-safety-700" : ""}`} onClick={onClick} value={children} />
}
