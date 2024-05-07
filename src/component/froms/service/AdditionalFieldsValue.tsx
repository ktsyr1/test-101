


import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Err } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import backup from './backup.json';
import axios from 'axios';

import JsCookies from 'js-cookie';
import GetFatch from '../get';

// ------------------------------------------ 

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    if (action.type === "additionalField") return { ...state, additionalField: action.payload };
    else return state;
}

// ------------------------------------------

const AdditionalFieldsValue = ({ page }: any) => {
    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    const [state, dispatch] = useReducer(reducer, { defaultData: data, additionalField: [] });
    // useReducer end
    let [add, setAdd] = useState()
    useEffect(() => {
        let url = '/Client/Project/Options'
        let UrlAdditionalFieldsValue = ""

        if (page == 1) UrlAdditionalFieldsValue = `${url}?section=1`
        else if (page == 2) UrlAdditionalFieldsValue = `${url}?section=2`
        else if (page == 3) UrlAdditionalFieldsValue = `${url}?section=3`
        else if (page == 4) UrlAdditionalFieldsValue = `${url}?section=4`

        let fulURL
        if (data?.realEstateTypeId) {

            fulURL = `${UrlAdditionalFieldsValue}&realEstateTypeId=${data?.realEstateTypeId}`
            let token: any = JsCookies.get("userToken")
            GetFatch(fulURL, token)
                .then(data => dispatch({ type: 'additionalField', payload: data?.data }))
                .catch((error) => Err(error))
        }

    }, [data])

    const Get = () => {
        let additionalFieldsValueText = localStorage.getItem("additionalFieldsValue")
        let additionalFieldsValue: any = additionalFieldsValueText ? JSON.parse(additionalFieldsValueText) : [];
        return additionalFieldsValue
    }
    const Change = (e: any, a: any) => {
        // start code example
        let body: any = { id: a.id, value: e.target.value }
        let additionalFieldsValue: any = Get()
        if (!additionalFieldsValue) additionalFieldsValue = [body]
        let index = additionalFieldsValue.findIndex((f: any) => a.id === f.id)

        if (index == undefined) additionalFieldsValue = additionalFieldsValue
        else if (index === -1) additionalFieldsValue = [...additionalFieldsValue, body]
        else additionalFieldsValue[index] = body

        localStorage.setItem("additionalFieldsValue", JSON.stringify(additionalFieldsValue))

    };
    const setSelect = (data: any, a: any) => {
        console.log(data);

        let body: any = { id: a.id, value: data.value }
        let additionalFieldsValue: any = Get()
        if (!additionalFieldsValue) additionalFieldsValue = [body]
        let index = additionalFieldsValue.findIndex((f: any) => a.id === f.id)

        if (index == undefined) additionalFieldsValue = additionalFieldsValue
        else if (index === -1) additionalFieldsValue = [...additionalFieldsValue, body]
        else additionalFieldsValue[index] = body
        console.log(additionalFieldsValue);

        localStorage.setItem("additionalFieldsValue", JSON.stringify(additionalFieldsValue))

    }
    return (
        <div className='*:py-2 mb-10 '   >
            {state.additionalField?.map((a: any) => {
                if (a.sectionName === "Textbox") return (
                    <div className='m-4 px-4 ' key={a.id}>
                        <p className='text-xl  font-bold text-prussian-800 my-2 mr-4'>{a.name}</p>
                        <textarea className='p-2 ml-4 rounded-md w-full' onChange={(e: any) => Change(e, a)} />
                    </div>
                )
                else if (a.sectionName === "MultiSelect" && a.additionalField_MultiSelectValue?.length > 0) return (
                    <div className='m-4 px-4 ' key={a.id}>
                        <p className='text-xl  font-bold text-prussian-800 my-2 mr-4'>{a.name}</p>
                        <div>
                            {a.additionalField_MultiSelectValue.map((m: any) => {
                                return (
                                    <div onClick={() => setSelect(m, a)} className="flex items-center   border border-gray-200 rounded  max-w-max min-w-[200px]" key={m.id}>
                                        <input type="radio" id={`ass`} value={`ass`} className="hidden peer" />
                                        <label htmlFor={`ass`} className=" flex flex-col items-center   w-full lap:p-4 p-2 text-gray-500 bg-white border rounded-lg cursor-pointer   peer-checked:bg-blue-600 border-blue-600 peer-checked:text-white hover:text-white  hover:bg-blue-600    text-center h-full ">
                                            {m.text}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
                else return <></>
            })}
        </div >
    );
}


export default AdditionalFieldsValue;
