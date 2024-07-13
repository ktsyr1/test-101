import React, { useContext, useReducer } from 'react';
import { Field, Input, NextPage, Select } from './form';
import { FormContext, FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else if (action.type === "WorkAreas") return { ...state, WorkAreas: action.payload };
    else if (action.type === "err") return { ...state, err: action.payload };
    else return state;
}


const FormParrt2 = () => {
    let { select, setSelect } = useContext(FormContext)
    let { data, setData, Content, setContent, def } = useContext(FormDataContext)
    // useReducer start
    const initialState = { defaultData: data, WorkAreas: def.WorkAreas, err: {} };
    const [state, dispatch] = useReducer(reducer, initialState);

    const { register, handleSubmit } = useForm({ defaultValues: data });
    const onSubmit = (res: any) => {
        // scan valid
        let { workAreaId, projectImage } = state.defaultData
        let { realEstateMunicipal, realEstateNumber, realEstateStreet } = res
        let { projectTitle } = res
        dispatch({ type: 'err', payload: {} })
        let listErr: any = {}
        if (!workAreaId) listErr["workAreaId"] = { text: "هذه لحقل مطلوب" }
        if (!realEstateMunicipal) listErr["realEstateMunicipal"] = { text: "هذه لحقل مطلوب" }
        else if (realEstateMunicipal?.length <= 2) listErr["realEstateMunicipal"] = { text: "النص قصير" }

        if (!realEstateNumber) listErr["realEstateNumber"] = { text: "هذه لحقل مطلوب" }
        else if (Number.isNaN(realEstateNumber)) listErr["realEstateNumber"] = { text: "النص قصير" }
        else if (Number(realEstateNumber) == 0) listErr["realEstateNumber"] = { text: "النص قصير" }

        if (!realEstateStreet) listErr["realEstateStreet"] = { text: "هذه لحقل مطلوب" }
        else if (realEstateStreet?.length <= 2) listErr["realEstateStreet"] = { text: "النص قصير" }

        if (projectImage?.length == 0) listErr["projectImage"] = { text: "هذه لحقل مطلوب" }
        if (!projectTitle) listErr["projectTitle"] = { text: "هذه لحقل مطلوب" }
        else if (projectTitle?.length <= 2) listErr["projectTitle"] = { text: "النص قصير" }

        if (!projectTitle) listErr["projectTitle"] = { text: "هذه لحقل مطلوب" }
        else if (projectTitle?.length <= 2) listErr["projectTitle"] = { text: "النص قصير" }

        dispatch({ type: 'err', payload: listErr })

        if (Object.keys(listErr)?.length == 0) {
            let payload = { ...state?.defaultData, ...res, projectImage: state?.defaultData?.projectImage }

            let DB = { workAreaId, realEstateMunicipal, realEstateNumber, realEstateStreet, projectTitle, description: res?.description }
            DB["workAreaId"] = state?.WorkAreas?.filter((a: any) => a?.value == DB.workAreaId)[0]?.text

            setContent({ ...Content, ...DB })
            setData(payload)
            let slug = NextPage(select)
            setSelect(slug)
        }
    }



    let setProjectImage = (e: any) => {
        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();

        reader.onload = e => dispatch({ type: "data", payload: { ...state?.defaultData, projectImage: e.target?.result as string } })
        if (file) reader.readAsDataURL(file);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 flex flex-col'  >

            <div className='flex tap:flex-row flex-col justify-between'>
                <Field title="منطقة العمل" className='flex flex-col w-full min-w-[300px] '>
                    <Select
                        list={state.WorkAreas}
                        title={state?.WorkAreas?.filter((A: any) => A?.value === state.defaultData.workAreaId)[0]?.text || "منطقة العمل"}
                        set={(s: any) => setData({ ...state.defaultData, "workAreaId": s.value })}
                        err={state?.err?.workAreaId}
                    />
                </Field>
                {/* <Input text="صورة العقار" name="projectImage" type='file' accept="image/*" register={register} onChange={setProjectImage} err={state?.err?.projectImage} /> */}
            </div>

            <div className='flex tap:flex-row flex-col'>
                <Input text="اسم المشروع" name="projectTitle" register={register} err={state?.err?.projectTitle} />
                <div className='h-0 w-4' ></div>
                <Input text="الحي" name="realEstateMunicipal" register={register} err={state?.err?.realEstateMunicipal} />
            </div>
            <div className='flex tap:flex-row flex-col'>
                <Input text="رقم العقار" name="realEstateNumber" type="number" register={register} err={state?.err?.realEstateNumber} />
                <div className='h-0 w-4' ></div>
                <Input text="اسم الشارع " name="realEstateStreet" register={register} err={state?.err?.realEstateStreet} />
            </div>

            <div className='flex flex-col' >
                <p className="lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">وصف إضافي</p>
                <textarea
                    className="!w-full  min-h-[50px] rounded-md p-2"
                    defaultValue={state?.defaultData?.description}
                    placeholder=" "
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "data", payload: { ...state?.defaultData, description: e.target.value } })}
                />
            </div>

            <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">صورة العقار</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="projectImage" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 ">
                    {state.defaultData?.projectImage ? <img src={state.defaultData.projectImage} alt='image' className='max-h-[250px] p-4' />
                        : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">انقر للتحميل</span> أو اسحب وافلات</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    }
                    <input  {...register("projectImage")} className='p-2 ml-4 rounded-md hidden' id='projectImage' type='file' accept="image/*" onChange={setProjectImage} />
                </label>
                {state?.err?.projectImage && <p className='p-4 text-red-600'>{state?.err?.projectImage.text}</p>}
            </div>

            {/* <AdditionalFieldsValue page={2} /> */}
            <input type='submit' value="التالي" className='p-2 my-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}

export default FormParrt2;
