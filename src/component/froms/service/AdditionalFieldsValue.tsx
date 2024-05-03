


import React, { useContext, useEffect, useReducer } from 'react';
import { Err } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import backup from './backup.json';
import { ConfigApi } from '@/component/lib';
import axios from 'axios';

// ------------------------------------------ 

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else return state;
}

// ------------------------------------------

const AdditionalFieldsValue = ({ page }: any) => {
    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    const [state, dispatch] = useReducer(reducer, { defaultData: data, ProjectObjectives: backup.ProjectObjectives });
    // useReducer end
    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });

    useEffect(() => {
        async function Fatch() {
            // let { url="/api", headers } = ConfigApi()
            let url = "/api"
            url += '/Lookup/ProjectObjectives'
            let UrlAdditionalFieldsValue = ""
            console.log(page);

            if (page == 1) UrlAdditionalFieldsValue = `${url}?section=1`
            else if (page == 2) UrlAdditionalFieldsValue = `${url}?section=2`
            else if (page == 3) UrlAdditionalFieldsValue = `${url}?section=3`
            else if (page == 4) UrlAdditionalFieldsValue = `${url}?section=4`

            let fulURL
            if (data?.realEstateTypeId) {

                fulURL = `${UrlAdditionalFieldsValue}&realEstateTypeId=${data?.realEstateTypeId}`
                axios.get(fulURL,
                    // { headers }
                )
                    .then(({ data }) => dispatch({ type: 'ProjectObjectives', payload: data?.data }))
                    .catch((error) => { Err(error); dispatch({ type: 'ProjectObjectives', payload: backup.ProjectObjectives }) })
            }

            return

        }
        Fatch()
    }, [data])
    const onSubmit = (res: any) => {
        setData({ ...state?.defaultData, projectTitle: res.projectTitle })

    };
    return (
        <div onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            AdditionalFieldsValue

        </div >
    );
}


export default AdditionalFieldsValue;
