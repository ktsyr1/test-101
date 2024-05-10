import React, { useContext, useEffect, useState } from 'react';
import { Err, Field, Input, NextPage, Select, } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import backup from './backup.json';
import AdditionalFieldsValue from './AdditionalFieldsValue';
import JsCookies from "js-cookie"
import GetFatch from '../get';

const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let [RealEstatTypes, setRealEstatTypes] = useState<any>([])
    let [RealEstatAges, setRealEstatAges] = useState<any>([])

    useEffect(() => {
        let token: any = JsCookies.get("userToken")

        GetFatch("/Lookup/RealEstatType", token)
            .then(data => setRealEstatTypes(data?.data))
            .catch((error) => { Err(error); })

        GetFatch("/Lookup/RealEstatAges", token)
            .then(data => setRealEstatAges(data?.data))
            .catch((error) => { Err(error); })

    }, [defaultData])

    const { register, handleSubmit } = useForm({ defaultValues: defaultData });
    let [error, setError] = useState<any>({})

    const onSubmit = (res: any) => {
        // scan valid
        let { realEstateTypeId, realEstateAgesId } = data
        let { numberOfFloors, buildingArea } = res
        setError({})
        let listErr: any = {}
        if (!realEstateTypeId) listErr["realEstateTypeId"] = { text: "هذه لحقل مطلوب" }
        if (!realEstateAgesId) listErr["realEstateAgesId"] = { text: "هذه لحقل مطلوب" }
        if (!numberOfFloors) listErr["numberOfFloors"] = { text: "هذه لحقل مطلوب" }
        else if (Number(numberOfFloors) <= 0) listErr["numberOfFloors"] = { text: "القيمة غير صحيحة" }
        if (!buildingArea) listErr["buildingArea"] = { text: "هذه لحقل مطلوب" }
        else if (Number(buildingArea) <= 0) listErr["buildingArea"] = { text: "القيمة غير صحيحة" }

        setError(listErr)
        // next page
        if (Object.keys(listErr)?.length == 0) { 
            setData({ ...data, ...res })
            let slug = NextPage(select)
            setSelect(slug)
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex tap:flex-row flex-col'>
                <Field title="نوع العقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatTypes}
                        title={RealEstatTypes?.filter((A: any) => A?.value === defaultData.realEstateTypeId)[0]?.text || "حدد نوع العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateTypeId": s.value })}
                        err={error?.realEstateTypeId}
                    />
                </Field>

                <Field title="  العمر التقريبي للعقار" className='flex flex-col w-full m-4 '>
                    <Select
                        list={RealEstatAges}
                        title={RealEstatAges?.filter((A: any) => A?.value === defaultData.realEstateAgesId)[0]?.text || "حدد العمر التقريبي العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateAgesId": s.value })}
                        err={error?.realEstateAgesId}
                    />
                </Field>

            </div>

            <div className='flex tap:flex-row flex-col m-4 p-4'>
                <Input text="عدد الطوابق" name="numberOfFloors" type="number" register={register} err={error?.numberOfFloors} />
                <Input text="مسطحات البناء المسقوفة ( م²)" name="buildingArea" type="number" register={register} err={error?.buildingArea} />
            </div>
            <AdditionalFieldsValue page={1} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormPropertyData;
