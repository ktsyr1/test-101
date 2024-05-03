import React, { useContext, useEffect, useState } from 'react';
import { Err, Field, Input, NextPage, Select, } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ConfigApi } from '@/component/lib';
import backup from './backup.json';
import AdditionalFieldsValue from './AdditionalFieldsValue';

const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let [RealEstatTypes, setRealEstatTypes] = useState<any>([])
    let [RealEstatAges, setRealEstatAges] = useState<any>([])

    useEffect(() => {

        async function Cities() {
            let { url, headers } = ConfigApi()
            let UrlRealEstatType = url + `/Lookup/RealEstatType`

            axios.get(UrlRealEstatType, { headers })
                .then(({ data }) => setRealEstatTypes(data?.data))
                .catch((error) => { Err(error); setRealEstatTypes(backup.RealEstatType) })

            let UrlRealEstatAges = url + `/Lookup/RealEstatAges`
            axios.get(UrlRealEstatAges, { headers })
                .then(({ data }) => setRealEstatAges(data?.data))
                .catch((error) => { Err(error); setRealEstatAges(backup.RealEstatAges) })
            return

        }
        Cities()
    }, [data])

    const { register, handleSubmit } = useForm({ defaultValues: defaultData });
    const onSubmit = (res: any) => {

        setData({ ...data, ...res })
        let slug = NextPage(select)
        setSelect(slug)
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex flex-row'>
                <Field title="نوع العقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatTypes}
                        title={RealEstatTypes.filter((A: any) => A?.value === defaultData.realEstateTypeId)[0]?.text || "حدد نوع العقار"}
                        set={(s: any) => {

                            setData({ ...defaultData, "realEstateTypeId": s.value })
                        }}
                    />
                </Field>

                <Field title="  العمر التقريبي للعقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatAges}
                        title={RealEstatAges.filter((A: any) => A?.value === defaultData.realEstateAgesId)[0]?.text || "حدد العمر التقريبي العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateAgesId": s.value })}
                    />
                </Field>

            </div>

            <div className='flex flex-row m-4 p-4'>
                <Input text="عدد الطوابق" name="numberOfFloors" type="number" register={register} />
                <Input text="مسطحات البناء المسقوفة ( م²)" name="buildingArea" type="number" register={register} />
            </div>
            <AdditionalFieldsValue page={1} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormPropertyData;
