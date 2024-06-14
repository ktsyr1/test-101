import React, { useContext, useState } from 'react'; 
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import { Input, NextPage, Select } from './form';


const FormContact = () => {

    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    const { register, handleSubmit } = useForm({ defaultValues: defaultData });

    const onSubmit = (values: any) => {
        let phoneNumber = values.phoneNumber.toString()
        if (phoneNumber.length > 6) {
            setData({ ...data, ...values })
            let slug = NextPage(select)
            setSelect(slug)
        };
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' >
            <div className="flex flex-col w-full mt-20">
                <div className="flex tap:flex-row flex-col  w-full">
                    <Input text="رقم الجوال" name="phoneNumber" register={register} placeholder='أدخل رقم الجوال' required />
                    <Input text="البريد الإلكتروني" type="email" name="Email" register={register} placeholder='أدخل البريد الإلكتروني' required />
                </div>
            </div>
            <div className='*:mt-4 m-auto w-full flex'>
                <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />

            </div>
        </form>
    );
}

export default FormContact;



