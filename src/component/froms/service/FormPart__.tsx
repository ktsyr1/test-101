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
    else if (action.type === "err") return { ...state, err: action.payload };
    else return state;
}

// ------------------------------------------

const FormPart3 = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    // const [state, dispatch] = useReducer(reducer, { defaultData: data, projectObjectives: backup.projectObjectives });
    const [state, dispatch] = useReducer(reducer, { defaultData: data, projectObjectives: [], err: {} });
    // useReducer end
    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });

    useEffect(() => {

    }, [data])
    const onSubmit = (res: any) => { 
        dispatch({ type: 'err', payload: {} })
        let listErr: any = {}
 
        if (Object.keys(listErr)?.length == 0) {
            console.log({ ...state?.defaultData, ...res, });

            // setData({ ...state?.defaultData, projectTitle: res.projectTitle })
            // let slug = NextPage(select)
            // setSelect(slug)
        };
    };
 
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            {/* 
            <div className='flex tap:flex-row flex-col m-4 p-4'>
                <Input text="اسم المشروع" name="projectTitle" register={register} err={state?.err?.projectTitle} />
                <Input text="صورة العقار" name="projectImage" type='file' accept="image/*" register={register} onChange={setProjectImage} err={state?.err?.projectImage} />
            </div>

            <div className='flex flex-col m-4 p-4' >
                <p className="lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">وصف إضافي</p>
                <textarea
                    className="!w-full  min-h-[50px] rounded-md p-2"
                    defaultValue={state?.defaultData?.description}
                    placeholder=" "
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "data", payload: { ...state?.defaultData, description: e.target.value } })}
                />

            </div> */}
            <AdditionalFieldsValue page={3} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}


export default FormPart3;
