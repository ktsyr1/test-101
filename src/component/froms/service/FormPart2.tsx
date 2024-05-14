import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Err, Field, Input, NextPage, Select } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import JsCookies from 'js-cookie';
import GetFatch from '../get';

// ------------------------------------------ 
import backup from './backup.json';
import AdditionalFieldsValue from './AdditionalFieldsValue';
import { message } from 'antd';
import axios from 'axios';
const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else if (action.type === "WorkAreas") return { ...state, WorkAreas: action.payload };
    else if (action.type === "err") return { ...state, err: action.payload };
    else return state;
}

// ------------------------------------------

const FormParrt2 = () => {


    let { select, setSelect } = useContext(FormContext)
    let { data, setData, Content, setContent } = useContext(FormDataContext)
    // useReducer start
    const initialState = { defaultData: data, WorkAreas: [], err: {} };
    const [state, dispatch] = useReducer(reducer, initialState);
    // useReducer end
    // example ` dispatch({ type: 'WorkAreas', payload: data?.data }) `

    useEffect(() => { 
        // -------------------- start ----------------
        let token: any = JsCookies.get("userToken")

        if (process.env.NEXT_PUBLIC_ENV == "development") {
            GetFatch("/Lookup/WorkAreas", token)
                .then(data => dispatch({ type: 'WorkAreas', payload: data?.data }))
                .catch((error) => Err(error))

        } else if (process.env.NEXT_PUBLIC_ENV === "production") {
            let headers: any = { "Content-Type": "application/json" }
            if (token) headers["Authorization"] = `Bearer ${token}`
            let api = process.env.NEXT_PUBLIC_API

            axios.get(`${api}/Lookup/WorkAreas`, { headers })
                .then(({ data }) => dispatch({ type: 'WorkAreas', payload: data?.data }))
        }
        // -------------------- end ----------------

    }, [data])

    const { register, handleSubmit } = useForm({ defaultValues: data });
    const onSubmit = (res: any) => {
        // scan valid
        let { workAreaId } = state.defaultData
        let { realEstateMunicipal, realEstateNumber, realEstateStreet } = res
        let { projectTitle, projectImage } = res

        dispatch({ type: 'err', payload: {} })
        let listErr: any = {}
        if (!workAreaId) listErr["workAreaId"] = { text: "هذه لحقل مطلوب" }
        if (!realEstateMunicipal) listErr["realEstateMunicipal"] = { text: "هذه لحقل مطلوب" }
        else if (realEstateMunicipal?.length <= 2) listErr["realEstateMunicipal"] = { text: "النص قصير" }

        if (!realEstateNumber) listErr["realEstateNumber"] = { text: "هذه لحقل مطلوب" }
        else if (Number.isNaN(realEstateNumber)) listErr["realEstateNumber"] = { text: "النص قصير" }
        else if (Number(realEstateNumber) == 0) listErr["realEstateNumber"] = { text: "النص قصير" }

        if (!realEstateStreet) listErr["realEstateStreet"] = { text: "هذه لحقل مطلوب" }
        else if (realEstateStreet?.length <= 2) listErr["realEstateStreet"] = { text: "النص قصير" }

        if (projectImage?.length == 0) listErr["projectImage"] = { text: "هذه لحقل مطلوب" }
        if (!projectTitle) listErr["projectTitle"] = { text: "هذه لحقل مطلوب" }
        else if (projectTitle?.length <= 2) listErr["projectTitle"] = { text: "النص قصير" }

        if (!projectTitle) listErr["projectTitle"] = { text: "هذه لحقل مطلوب" }
        else if (projectTitle?.length <= 2) listErr["projectTitle"] = { text: "النص قصير" }

        dispatch({ type: 'err', payload: listErr })

        if (Object.keys(listErr)?.length == 0) {
            let payload = { ...state?.defaultData, ...res, projectImage: state?.defaultData?.projectImage }

            let DB = { workAreaId, realEstateMunicipal, realEstateNumber, realEstateStreet, projectTitle, description: res?.description }
            DB["workAreaId"] = state?.WorkAreas?.filter((a: any) => a?.value == DB.workAreaId)[0]?.text

            setContent({ ...Content, ...DB })
            setData(payload)
            let slug = NextPage(select)
            setSelect(slug)
        }
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >

            <div className='flex tap:flex-row flex-col m-4 p-4 justify-between'>
                <Field title="منطقة العمل" className='flex flex-col w-full  ml-6 min-w-[300px] '>
                    <Select
                        list={state.WorkAreas}
                        title={state?.WorkAreas.filter((A: any) => A?.value === state.defaultData.workAreaId)[0]?.text || "منطقة العمل"}
                        set={(s: any) => setData({ ...state.defaultData, "workAreaId": s.value })}
                        err={state?.err?.workAreaId}
                    />
                </Field>
                <Input text="صورة العقار" name="projectImage" type='file' accept="image/*" register={register} onChange={setProjectImage} err={state?.err?.projectImage} />
            </div>

            <div className='flex tap:flex-row flex-col p-4'>
                <Input text="اسم المشروع" name="projectTitle" register={register} err={state?.err?.projectTitle} />


                <Input text="البلدية العقارية" name="realEstateMunicipal" className="mr-4" register={register} err={state?.err?.realEstateMunicipal} />
            </div>
            <div className='flex tap:flex-row flex-col m-4 p-4'>
                <Input text="رقم العقار" name="realEstateNumber" type="number" register={register} err={state?.err?.realEstateNumber} />
                <Input text="شارع العقارات" name="realEstateStreet" register={register} err={state?.err?.realEstateStreet} />
            </div>

            <div className='flex flex-col m-4 p-4' >
                <p className="lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">وصف إضافي</p>
                <textarea
                    className="!w-full  min-h-[50px] rounded-md p-2"
                    defaultValue={state?.defaultData?.description}
                    placeholder=" "
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "data", payload: { ...state?.defaultData, description: e.target.value } })}
                />

            </div>
            <AdditionalFieldsValue page={2} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormParrt2;
