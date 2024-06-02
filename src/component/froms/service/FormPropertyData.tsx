import React, { useContext, useEffect, useState } from 'react';
import { Err, Field, Input, NextPage, Select, } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import AdditionalFieldsValue from './AdditionalFieldsValue';
import JsCookies from "js-cookie"
import GetFatch from '../get';
import axios from 'axios';

const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData, Content, setContent } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)
    let [RealEstatTypes, setRealEstatTypes] = useState<any>([])
    let [RealEstatAges, setRealEstatAges] = useState<any>([])
    let [ProjectObjectives, setProjectObjectives] = useState<any>([])

    useEffect(() => {
        // -------------------- start ----------------
        let token: any = JsCookies.get("userToken")

        // if (process.env.NEXT_PUBLIC_ENV == "development") {
            GetFatch("/Lookup/RealEstatType", token)
                .then(data => setRealEstatTypes(data?.data))
                .catch((error) => { Err(error); })

            GetFatch("/Lookup/RealEstatAges", token)
                .then(data => setRealEstatAges(data?.data))
                .catch((error) => { Err(error); })

            GetFatch("/Lookup/ProjectObjectives", token)
                .then(data => setProjectObjectives(data?.data))
                .catch((error) => Err(error))
                
            let headers: any = { "Content-Type": "application/json" }
            if (token) headers["Authorization"] = `Bearer ${token}`
            let api = process.env.NEXT_PUBLIC_API

            axios.get(`${api}/Lookup/ProjectObjectives`, { headers })
                .then(({ data }) => setProjectObjectives(data?.data))
                .catch((error) => Err(error))
        // } else if (process.env.NEXT_PUBLIC_ENV === "production") {
        //     let headers: any = { "Content-Type": "application/json" }
        //     if (token) headers["Authorization"] = `Bearer ${token}`
        //     let api = process.env.NEXT_PUBLIC_API
        //     try {

        //         axios.get(`${api}/Lookup/RealEstatType`, { headers })
        //             .then(({ data }) => setRealEstatTypes(data?.data))
        //             .catch((error) => Err(error))

        //         axios.get(`${api}/Lookup/RealEstatAges`, { headers })
        //             .then(({ data }) => setRealEstatAges(data?.data))
        //             .catch((error) => Err(error))

        //         axios.get(`${api}/Lookup/ProjectObjectives`, { headers })
        //             .then(({ data }) => setProjectObjectives(data?.data))
        //             .catch((error) => Err(error))
        //     } catch (error) {
        //         GetFatch("/Lookup/RealEstatType", token)
        //             .then(data => setRealEstatTypes(data?.data))
        //             .catch((error) => { Err(error); })

        //         GetFatch("/Lookup/RealEstatAges", token)
        //             .then(data => setRealEstatAges(data?.data))
        //             .catch((error) => { Err(error); })

        //         GetFatch("/Lookup/ProjectObjectives", token)
        //             .then(data => setProjectObjectives(data?.data))
        //             .catch((error) => Err(error))
        //     }
        // }
        // -------------------- end ----------------
    }, [defaultData])

    const { register, handleSubmit } = useForm({ defaultValues: defaultData });
    let [error, setError] = useState<any>({})

    const onSubmit = (res: any) => {
        // scan valid
        let { realEstateTypeId, realEstateAgesId, projectObjectives } = data
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

            // function esww(prom: any) {
            let DB = { realEstateTypeId, realEstateAgesId, numberOfFloors, buildingArea, projectObjectives }
            DB["realEstateTypeId"] = RealEstatTypes.filter((a: any) => a?.value == DB.realEstateTypeId)[0]?.text
            DB["realEstateAgesId"] = RealEstatAges.filter((a: any) => a?.value == DB.realEstateAgesId)[0]?.text
            DB["projectObjectives"] = ProjectObjectives.filter((a: any) => a?.value == DB.projectObjectives[0].assessmentObjectivesId)[0]?.text

            setContent({ ...Content, ...DB })
            setData({ ...data, ...res })
            let slug = NextPage(select)
            setSelect(slug)

        };

    }
    let _setProjectObjectives = (s: any) => setData({ ...defaultData, "projectObjectives": [{ assessmentObjectivesId: Number(s.value) }] })


    let titleProjectObjectives = ProjectObjectives?.filter((A: any) => A?.value == defaultData?.projectObjectives?.[0]?.assessmentObjectivesId)//?.[0]?.text || "اهداف المشروع"

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

            <Field title="اهداف المشروع" className='flex flex-col w-full mx-4 '>
                <Select
                    list={ProjectObjectives}
                    title={titleProjectObjectives?.[0]?.text || "اهداف المشروع"}
                    set={_setProjectObjectives}
                    className='w-full'
                    err={error?.projectObjectives}
                />
            </Field>
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

