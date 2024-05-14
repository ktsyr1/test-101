import React, { useContext, useEffect, useState } from 'react';
import { FieldType, TypeBtn } from '../types';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import Icon from '../../icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from "js-cookie"
import createFatch from '../get';
import GetFatch from '../get';

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
    const [active, setActive] = useState(false);

    let [options, setOptions] = useState<QualificationsTypes[]>([])
    useEffect(() => {

        let token: any = Cookies.get("userToken")
        if (process.env.NEXT_PUBLIC_ENV == "development")
            GetFatch("/Lookup/Qualifications", token).then(data => setOptions(data?.data))
        else if (process.env.NEXT_PUBLIC_ENV == "production")
            axios.get(`${process.env.NEXT_PUBLIC_API}/Lookup/Qualifications`)
                .then(({ data }) => setOptions(data?.data))
    }, [data])
    const { register, handleSubmit, watch, formState: { errors }, }: any = useForm<FieldType>()

    const onChange = () => {
        // console.clear()
        let MemberShip = watch("MemberShip")
        let YearsOfExperience = watch("MemberShip")
        // let MemberShip = watch("MemberShip")

        console.log([MemberShip, YearsOfExperience]);

        if (MemberShip?.length > 3 && YearsOfExperience > 0) {
            if (study && study?.value) {
                setNextPart(true);
            }
            else setNextPart(false)
        } else setNextPart(false)

    }

    const onSubmit = () => {
        let NewData = { MemberShip: watch("MemberShip"), YearsOfExperience: watch("YearsOfExperience"), QualificationId: study?.value }
        console.log(NewData);

        if (nextPart) {
            setData({ ...data, ...NewData })
            let slug = NextPage(select)
            setSelect(slug)
        }
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
                    <input defaultValue="" {...register("MemberShip", { require: "الحقل اجباري", minLength: 3 })} className='w-full p-2 rounded-md ml-4 ' minLength={3} placeholder=' أدخل رقم العضوية' />
                    <p className='p-4 text-red-600'>{errors?.MemberShip?.message?.toString() || ""}</p>

                </div>
                <div className="flex flex-col mx-4  w-full">
                    <p className="text-xl  font-bold text-prussian-800 my-2">عدد سنوات الخبرة</p>
                    <input  {...register("YearsOfExperience", { require: "الحقل اجباري", max: 50 })} type='number' className='w-full p-2 rounded-md  ' minLength={3} placeholder='0' max={50} defaultValue={defaultData.YearsOfExperience} />
                    <p className='p-4 text-red-600'>{errors?.YearsOfExperience?.message?.toString() || ""}</p>

                </div>
            </div>
            <div className=" flex tap:flex-row flex-col my-6" onClick={onChange} >
                {options?.map((a: any, i: any) => <BtnsBol a={a} key={i} />)}
            </div>

            <SubmitButton active={nextPart && true} >التالي</SubmitButton>
        </form>
    );
}

export function SubmitButton({ children, onClick, className, active }: TypeBtn) {
    return <input type="submit" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 bg-[#6B7B8F] ${className} ${active == true ? "!bg-safety-700 cursor-pointer " : ""}`} onClick={onClick} value={children} disabled={!active} />
}
