import React, { useContext, useEffect, useReducer, useRef } from 'react';
import { message } from 'antd';
import { Err, Field, Input, NextPage, Select } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import backup from './backup.json';
import { ConfigApi } from '@/component/lib';
import axios from 'axios';
import AdditionalFieldsValue from './AdditionalFieldsValue';

import JsCookies from 'js-cookie';
import GetFatch from '../get';
// ------------------------------------------ 

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    if (action.type === "projectObjectives") return { ...state, projectObjectives: action.payload };
    else return state;
}

// ------------------------------------------

const FormPart3 = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    // const [state, dispatch] = useReducer(reducer, { defaultData: data, projectObjectives: backup.projectObjectives });
    const [state, dispatch] = useReducer(reducer, { defaultData: data, projectObjectives: [] });
    // useReducer end
    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });

    useEffect(() => {

        let token: any = JsCookies.get("userToken")
        GetFatch("/Lookup/ProjectObjectives", token)
            .then(data => dispatch({ type: 'projectObjectives', payload: data?.data }))
            .catch((error) => Err(error))

    }, [data])
    const onSubmit = (res: any) => {
        setData({ ...state?.defaultData, projectTitle: res.projectTitle })
        let slug = NextPage(select)
        setSelect(slug)
    };

    let setProjectImage = (e: any) => {

        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        message.info("جاري رفع الصورة بنجاح")

        reader.onload = (e) => {
            const base64String = e.target?.result as string;
            // set {base64String} to
            dispatch({ type: "data", payload: { ...state?.defaultData, projectImage: base64String } })
            message.success("تم رفع الصورة بنجاح");
        };
        if (file) reader.readAsDataURL(file);

    }
    // console.log(state.defaultData);
    let setProjectObjectives = (s: any) => {
        console.log(s);
        console.log({ type: "data", payload: { ...state?.defaultData, "projectObjectives": [{ assessmentObjectivesId: s.value }] } });

        dispatch({ type: "data", payload: { ...state?.defaultData, "projectObjectives": [{ assessmentObjectivesId: Number(s.value) }] } })
    }
    let titleProjectObjectives = state.projectObjectives
        ?.filter((A: any) => A?.value == state.defaultData?.projectObjectives?.[0]?.assessmentObjectivesId)//?.[0]?.text || "اهداف المشروع"
    console.log()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >

            <div className='flex tap:flex-row flex-col m-4 p-4'>
                <Input text="اسم المشروع" name="projectTitle" register={register} />
                <Input text="صورة العقار" name="projectImage" type='file' accept="image/*" register={register} onChange={setProjectImage} />
            </div>

            <Field title="اهداف المشروع" className='flex flex-col w-full mx-4 '>
                <Select
                    list={state.projectObjectives}
                    title={titleProjectObjectives?.[0]?.text || "اهداف المشروع"}
                    set={setProjectObjectives}
                    className='w-full'
                />
            </Field>
            <div className='flex flex-col m-4 p-4' >
                <p className="lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">وصف إضافي</p>
                <textarea
                    className="!w-full  min-h-[50px] rounded-md p-2"
                    defaultValue={state?.defaultData?.description}
                    placeholder=" "
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "data", payload: { ...state?.defaultData, description: e.target.value } })}
                />
            </div>
            <AdditionalFieldsValue page={3} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}


export default FormPart3;
