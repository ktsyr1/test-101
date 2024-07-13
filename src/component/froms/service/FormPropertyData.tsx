import React, { useContext, useRef, useState } from 'react';
import { Field, Input, NextPage } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
// import AdditionalFieldsValue from './AdditionalFieldsValue';

const FormPropertyData = () => {
    let { select, setSelect } = useContext(FormContext)
    let [selector, setSelector] = useState<any>(null)
    let { data, setData, Content, setContent, def, setDef } = useContext(FormDataContext)
    let [defaultData, setDD] = useState(data)

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
            let DB = { realEstateTypeId, realEstateAgesId, numberOfFloors, buildingArea, projectObjectives }
            DB["realEstateTypeId"] = def?.RealEstatTypes?.filter((a: any) => a?.value == DB.realEstateTypeId)[0]?.text
            DB["realEstateAgesId"] = def?.RealEstatAges?.filter((a: any) => a?.value == DB.realEstateAgesId)[0]?.text
            DB["projectObjectives"] = def?.ProjectObjectives?.filter((a: any) => a?.value == DB.projectObjectives[0].assessmentObjectivesId)[0]?.text

            setContent({ ...Content, ...DB })
            setData({ ...data, ...res })
            let slug = NextPage(select)
            setSelect(slug)
        };

    }
    let _setProjectObjectives = (s: any) => setData({ ...defaultData, "projectObjectives": [{ assessmentObjectivesId: Number(s.value) }] })


    let titleProjectObjectives = def.ProjectObjectives?.filter((A: any) => A?.value == defaultData?.projectObjectives?.[0]?.assessmentObjectivesId)//?.[0]?.text || "اهداف المشروع"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <div className='flex tap:flex-row flex-col'>
                <Field title="نوع العقار" className='flex flex-col w-full '>
                    <Select
                        selector={selector}
                        name={"RealEstatType"}
                        setSelector={setSelector}
                        list={def.RealEstatType}
                        title={def?.RealEstatType?.filter((A: any) => A?.value === defaultData.realEstateTypeId)[0]?.text || "حدد نوع العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateTypeId": s.value })}
                        err={error?.realEstateTypeId}
                    />
                </Field>
                <div className='h-0 w-4' ></div>
                <Field title="  العمر التقريبي للعقار" className='flex flex-col w-full'>
                    <Select
                        selector={selector}
                        name={"RealEstatAges"}
                        setSelector={setSelector}
                        list={def?.RealEstatAges}
                        title={def?.RealEstatAges?.filter((A: any) => A?.value === defaultData.realEstateAgesId)[0]?.text || "حدد العمر التقريبي العقار"}
                        set={(s: any) => setData({ ...defaultData, "realEstateAgesId": s.value })}
                        err={error?.realEstateAgesId}
                    />
                </Field>

            </div>

            <Field title="اهداف المشروع" className='flex flex-col w-full '>
                <Select
                    selector={selector}
                    name={"ProjectObjectives"}
                    setSelector={setSelector}
                    list={def?.ProjectObjectives}
                    title={titleProjectObjectives?.[0]?.text || "اهداف المشروع"}
                    set={_setProjectObjectives}
                    className='w-full'
                    err={error?.projectObjectives}
                />
            </Field>
            <div className='flex tap:flex-row flex-col '>
                <Input text="عدد الطوابق" name="numberOfFloors" type="number" register={register} err={error?.numberOfFloors} />
                <div className='h-0 w-4' ></div>
                <Input text="مسطحات البناء المسقوفة ( م²)" name="buildingArea" type="number" register={register} err={error?.buildingArea} />
            </div>
            {/* <AdditionalFieldsValue page={1} /> */}

            <input type='submit' value="التالي" className='p-2 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormPropertyData;


export function Select({ list = [], title, name, set, className, err, selector, setSelector }: any) {
    function onClick(e: any) {
        setSelector(name)
    }
    return (
        <div className={`  ${className}`}>
            <button onClick={onClick} className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 lap:text-xl tap:text-sm text-xs font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-100 w-full rounded-lg`} type="button">
                {title}
            </button>
            {err?.text && <p className='p-4 text-red-600'>{err.text}</p>}

            <ul className={`${name != selector && "hidden"} py-2  text-sm text-gray-700 dark:text-gray-200 absolute bg-white   rounded-lg z-40 -tap:w-full w-[300px] max-w-[500px] max-h-[300px] overflow-y-scroll`}>
                {name == selector && list?.map((a: any) => (
                    <li key={a}>
                        <button type="button" onClick={(() => {
                            set(a);
                            setSelector("")

                            // m.current?.classList.toggle("hidden")
                        })} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a.text} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}