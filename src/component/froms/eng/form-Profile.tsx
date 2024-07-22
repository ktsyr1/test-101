import React, { useContext, useState } from 'react';
import { Input, NextPage, Select } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import Icon from '@/component/icons';
import { useForm } from 'react-hook-form';

export default function FormProfile() {

    let { data, setData, def, setDef } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let { select, setSelect } = useContext(FormContext)
    const [HasRelatives, setHasRelatives] = useState(null);

    const { register, handleSubmit, formState: { errors } }: any = useForm<any>({ defaultValues: defaultData });

    let [cities, setCities] = useState<any>(def?.Cities || [])

    const onSubmit = (values: any) => {

        let firstname = values.firstname
        if (firstname.length > 3) {
            window.scrollTo({ top: 380, behavior: 'smooth' })
            setData({ ...data, ...values, HasRelatives, })
            let slug = NextPage(select)
            setSelect(slug)
        };
    }


    function BtnsBol({ a, v, set }: any) {
        return (
            <>
                <button type="button" className={`w-full rounded-md max-w-[300px] p-4 bg-white flex flex-row justify-between ${v == a && "!bg-prussian-800 text-white"}`} onClick={() => set(a)} >
                    <p>{a ? "نعم" : "لا"} </p>
                    {v == a ? <Icon.okBorder /> : <Icon.c01 size={20} />}
                </button>
                {a && <div className='h-0 w-4' ></div>}

            </>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 flex flex-col ' >

            <div className="flex flex-col w-full ">
                <div className="flex tap:flex-row flex-col  w-full">
                    <div className='flex flex-col my-4 w-full'>
                        <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2"> المدينة </p>
                        <Select
                            className='w-full'
                            list={cities}
                            title={cities?.filter((A: any) => A?.value === defaultData.cityId)[0]?.text || "اختر المدينة"}
                            set={(s: any) => setData({ ...defaultData, "cityId": s.value })}
                        />
                    </div>
                    <div className='h-0 w-4' ></div>
                    <Input text="الإسم الاول" name="firstname" register={register} required />

                </div>
                <div className="flex tap:flex-row flex-col  w-full">
                    <Input text="الإسم الثاني" name="middleName" register={register} required />
                    <div className='h-0 w-4' ></div>
                    <Input text="إسم العائلة" name="lastName" register={register} required />
                </div>
                <p className="text-xl  font-bold text-prussian-800 my-2"> هل لديك اقارب يعملون في INSPECTEX ؟</p>
                <div className=" flex flex-row my-6" >
                    {[true, false].map((a, i) => <BtnsBol a={a} key={i} v={HasRelatives} set={setHasRelatives} />)}
                </div>
                {HasRelatives &&
                    <div className="flex tap:flex-row flex-col  w-full">
                        <Input text="اسم شخص القريب" name="RelativeName" register={register} required />
                        <div className='h-0 w-4' ></div>

                        <div className={`flex flex-col my-4 w-full `}>
                            <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2">هاتف القريب</p>
                            <input type="tel"  {...register('RelativePhone', {
                                required: 'يرجى إدخال رقم الهاتف',
                                pattern: { value: /^05\d{8}$/, message: 'يرجى التأكد من رقم الجوال' },
                            })} className='p-2 rounded-md' />
                            {errors["RelativePhone"] && <p className="text-red-600 my-4">{errors["RelativePhone"]?.message}</p>}

                        </div>
                    </div>}
            </div>
            <input type='submit' value="التالي" className='p-2 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />

        </form >
    );
}

