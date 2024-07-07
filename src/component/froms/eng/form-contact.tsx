import React, { useContext, useState } from 'react';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import { Input, NextPage, Select } from './form';


const FormContact = () => {

    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    const { register, handleSubmit, watch, formState: { errors } }: any = useForm<any>({ defaultValues: defaultData });

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
                    <div className={`flex flex-col my-4 w-full `}>
                        <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">رقم الجوال</p>
                        <input type="tel"  {...register('phoneNumber', {
                            required: 'يرجى إدخال رقم الهاتف',
                            pattern: { value: /^05\d{8}$/, message: "يرجى التأكد من رقم الجوال"},
                        })} className='p-2 ml-4 rounded-md' />
                        {errors["phoneNumber"] && <p className="text-red-600 my-4">{errors["phoneNumber"]?.message}</p>}

                    </div>
                    <div className={`flex flex-col my-4 w-full `}>
                        <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">الايميل</p>
                        <input className='p-2 ml-4 rounded-md' placeholder="example@mail.com" type="text"
                            {...register("email", {
                                required: "يرجى إدخال البريد الإلكتروني",
                                pattern: {
                                    value: /^[A-Za-z0-9.+]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "الرجاء إدخال بريد إلكتروني صحيح"
                                }
                            })}
                        />
                        {errors["email"] && <p className="text-red-600 mb-4">{errors["email"]?.message}</p>}
                    </div>
                    {/* <div>
                        <Input text="البريد الإلكتروني" type="email" name="Email" register={register} placeholder='أدخل البريد الإلكتروني' required />
                    </div> */}
                </div>
                <div className='*:mt-4 m-auto w-full flex'>
                    <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />

                </div>
            </div>
        </form>
    );
}

export default FormContact;



