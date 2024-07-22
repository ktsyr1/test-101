import React, { useContext, useState } from 'react';
import { FieldType } from '../types';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import Icon from '../../icons';
import { useForm } from 'react-hook-form';
type QualificationsTypes = {
    "disabled": Boolean,
    "group": null,
    "selected": Boolean,
    "text": String,
    "value": String
}
export default function FormEducation() {

    let { select, setSelect, list } = useContext(FormContext)
    let { data, setData, def, setDef } = useContext(FormDataContext)
    // end context 

    let [defaultData, setDD] = useState(data)
    const [study, setStudy] = useState<QualificationsTypes>();

    let [options, setOptions] = useState<any>(def?.Qualifications || [])

    const { register, handleSubmit, watch, formState: { errors }, }: any = useForm<FieldType>()


    const onSubmit = () => {
        let NewData = { MemberShip: watch("MemberShip"), YearsOfExperience: watch("YearsOfExperience"), QualificationId: study?.value }
        if (NewData?.QualificationId) {
            window.scrollTo({ top: 380, behavior: 'smooth' })
            setData({ ...data, ...NewData })
            let slug = NextPage(select)
            setSelect(slug)
        }
    }
    function BtnsBol({ a }: any) {
        const setS = () => setStudy(a)
        return (
            <button type="button" onClick={setS}
                className={`w-full items-center rounded-md max-w-[240px] my-2 p-4 ml-4 bg-white flex flex-row justify-between ${study?.text == a.text && "!bg-prussian-800 text-white"}`}
            >
                <p>{a.text} </p>
                {study?.value == a.value ? <Icon.okBorder /> : <Icon.c01 size={20} />}
            </button>
        )
    }
    return (

        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex tap:flex-row flex-col w-full mt-20">
                <div className="flex flex-col  w-full">
                    <p className="text-xl  font-bold text-prussian-800 my-2"> رقم عضوية هيئة المهندسين</p>
                    <input {...register("MemberShip", {
                        require: "الحقل اجباري",
                        minLength: { value: 6, message: "يرجى التأكد من رقم العضوية" },
                        maxLength: { value: 6, message: "يرجى التأكد من رقم العضوية" },
                        pattern: { value: /^[0-9]+$/, message: "يجب أن يكون النص فقط أرقام" }
                    })} className='w-full p-2 rounded-md ml-4 ' minLength={3} placeholder=' أدخل رقم العضوية' />
                    <p className='p-4 text-red-600'>{errors?.MemberShip?.message?.toString() || ""}</p>

                </div>
                <div className='h-0 w-4' ></div>
                <div className="flex flex-col w-full">
                    <p className="text-xl  font-bold text-prussian-800 my-2">عدد سنوات الخبرة</p>
                    <input  {...register("YearsOfExperience", { require: "الحقل اجباري", max: 50 })} type='number' className='w-full p-2 rounded-md ' minLength={3} placeholder='0' max={50} defaultValue={defaultData.YearsOfExperience} />
                    <p className='p-4 text-red-600'>{errors?.YearsOfExperience?.message?.toString() || ""}</p>

                </div>
            </div>
            <div className="flex flex-col  w-full">
                <p className="text-xl  font-bold text-prussian-800 my-2"> التخصص العلمي</p>

                <div className=" flex flex-col tap:flex-row justify-center my-6 tap:flex-wrap" >
                    {options.length > 0 ? options?.map((a: any, i: any) => <BtnsBol a={a} key={i} />) : <p>جاري التحميل ...</p>}
                </div>
            </div>

            <SubmitButton >التالي</SubmitButton>
        </form>
    );
}

export function SubmitButton({ children }: any) {
    return <input type="submit" className={`text-center rounded-md max-w-[600px] text-white w-full m-auto p-2 !bg-safety-700 cursor-pointer  `} value={children} />
}
