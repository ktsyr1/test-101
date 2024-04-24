import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import axios from 'axios';
import { ConfigApi, refreshToken } from '@/component/lib';

import { useForm, SubmitHandler } from "react-hook-form"

const FormProfile = () => {


    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let { select, setSelect, list } = useContext(FormContext)

    let [cities, setCities] = useState<any>([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({ defaultValues: data })

    useEffect(() => {
        let { url, info, headers } = ConfigApi()
        setDD({ ...defaultData, fullName: info?.loginName })

        async function Cities() {

            url += `/Lookup/Cities`
            axios.get(url, { headers })
                .then(({ data }) => setCities(data?.data))
                .catch(error => console.error(error))

            await axios.get(url, {
                headers: {
                    'accept': '*/*',
                    "content-type": 'application/json',

                }
            })
                .then(({ data }) => setCities(data?.data))
                .catch(error => {
                    console.log(error);

                    // refreshToken()
                    // Cities()
                })

            return
        }
        // Cities()
    }, [data])

    const onSubmit: SubmitHandler<any> = (res) => {
        res.age = Number(res.age)

        setData({ ...res })

        let slug = NextPage(select)
        setSelect(slug)
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'        >
            <div className="flex flex-col w-full mt-20 ">
                <div className="flex flex-row  w-full">
                    <Input text="الإسم الاول" name="firstname" />
                    <Input text="الإسم الثاني" name="middleName" />
                    <Input text="الإسم العائلة" name="lastName" />
                </div>
                <div className="flex flex-row  w-full">
                    <Input text="البريد الإلكتروني" name="email" type="email" />
                    <Input text="رقم الهاتف" name="phone" type="tel" />
                </div>
            </div>
            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg cursor-pointer' />
        </form >
    );
}

export default FormProfile
