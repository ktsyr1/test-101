import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Err, Field, Input, NextPage, Select } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import JsCookies from 'js-cookie';
import GetFatch from '../get';

// ------------------------------------------ 
import backup from './backup.json';
import AdditionalFieldsValue from './AdditionalFieldsValue';
const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else if (action.type === "WorkAreas") return { ...state, WorkAreas: action.payload };
    else if (action.type === "err") return { ...state, err: action.payload };
    else return state;
}

// ------------------------------------------

const FormParrt2 = () => {


    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    // useReducer start
    const initialState = { defaultData: data, WorkAreas: [], err: {} };
    const [state, dispatch] = useReducer(reducer, initialState);
    // useReducer end
    // example ` dispatch({ type: 'WorkAreas', payload: data?.data }) `

    useEffect(() => {

        let token: any = JsCookies.get("userToken")
        GetFatch("/Lookup/WorkAreas", token)
            .then(data => dispatch({ type: 'WorkAreas', payload: data?.data }))
            .catch((error) => Err(error))

    }, [data])

    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });
    const onSubmit = (res: any) => {
        // scan valid
        let { workAreaId } = state.defaultData
        let { realEstateMunicipal, realEstateNumber, realEstateStreet } = res
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

        dispatch({ type: 'err', payload: listErr })

        if (Object.keys(listErr)?.length == 0) { 
            setData({ ...data, ...res })
            let slug = NextPage(select)
            setSelect(slug)
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex tap:flex-row flex-col tap:m-4 p-4'>

                <Field title="منطقة العمل" className='flex flex-col w-full tap:mx-4 '>
                    <Select
                        list={state.WorkAreas}
                        title={state?.WorkAreas.filter((A: any) => A?.value === state.defaultData.workAreaId)[0]?.text || "منطقة العمل"}
                        set={(s: any) => setData({ ...state.defaultData, "workAreaId": s.value })}
                        err={state?.err?.workAreaId}

                    />
                </Field>

                <Input text="البلدية العقارية" name="realEstateMunicipal" className="mr-4" register={register} err={state?.err?.realEstateMunicipal} />
            </div>
            <div className='flex tap:flex-row flex-col m-4 p-4'>
                <Input text="رقم العقار" name="realEstateNumber" type="number" register={register} err={state?.err?.realEstateNumber} />
                <Input text="شارع العقارات" name="realEstateStreet" register={register} err={state?.err?.realEstateStreet} />
            </div>
            <AdditionalFieldsValue page={2} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormParrt2;
