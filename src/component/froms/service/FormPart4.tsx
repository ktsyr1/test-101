import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Err, Field } from './form';
import { FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import AdditionalFieldsValue from './AdditionalFieldsValue';

import JsCookies from 'js-cookie';
import GetFatch, { createFatch } from '../get';
// ------------------------------------------ 

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else if (action.type === "AvailableTimeSlots") return { ...state, AvailableTimeSlots: action.payload };
    else if (action.type === "nextPart") {
        console.log(action);

        return { ...state, nextPart: action.payload };
    }
    else return state;
}

// ------------------------------------------

const FormPart4 = () => {

    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    const [state, dispatch] = useReducer(reducer, { defaultData: data, AvailableTimeSlots: [], nextPart: 1 });
    // useReducer end

 

    return (
        <div className='*:py-2 mb-10 '   >
            {state.nextPart == 1 && <LastPage state={state} dispatch={dispatch} />}
            {state.nextPart == 2 && <EndPage state={state} dispatch={dispatch} />}
            <AdditionalFieldsValue page={4} />
            <br />
        </div>
    );
}

function LastPage({ state, dispatch }: any) {
    let { data, setData } = useContext(FormDataContext)
    let [loading, setLoading] = useState("جاري تحميل المواعيد")
    useEffect(() => {

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

        let UrlAvailableTimeSlots = `/Client/Project/AvailableTimeSlots?TargetDate=${formattedDate}`
        let token: any = JsCookies.get("userToken")
        GetFatch(UrlAvailableTimeSlots, token)
            .then(data => dispatch({ type: 'AvailableTimeSlots', payload: data?.data }))
            .catch((error) => Err(error))

    }, [data])

    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });
    const onSubmit = (res: any) => {
        // setData({ ...state?.defaultData, projectTitle: res.projectTitle })
        let body = { ...state?.defaultData, projectTitle: res.projectTitle }

        let additionalFieldsValue: any = localStorage.getItem("additionalFieldsValue")
        if (additionalFieldsValue) additionalFieldsValue = JSON.parse(additionalFieldsValue);
        else additionalFieldsValue = [{ id: "12", value: "12" }] // or set to a default value as needed


        let model = {
            "projectTitle": body.projectTitle,
            "projectImage": body.projectImage,
            "realEstateTypeId": Number(body.realEstateTypeId),
            "workAreaId": Number(body.workAreaId),
            "realEstateMunicipal": body.realEstateMunicipal,
            "realEstateNumber": body.realEstateNumber,
            "realEstateStreet": body.realEstateStreet,
            "longitude": "0",
            "latitude": "0",
            "projectDate": body.projectDate,
            "description": body.description,
            "startTime": body.startTime,
            "endTime": body.endTime,
            "realEstateAgesId": Number(body.realEstateAgesId),
            "numberOfFloors": Number(body.numberOfFloors),
            "buildingArea": Number(body.buildingArea),
            "projectObjectives": body.projectObjectives,
            "additionalFieldsValue": additionalFieldsValue
        }
        let token: any = JsCookies.get("userToken")
        createFatch("/Client/Assessment", model, token)
            .then((res: any) => {
                console.log(res);
                dispatch({ type: 'nextPart', payload: 2 })

            })
        localStorage.removeItem("additionalFieldsValue")
    };
    function Loading() {
        if (state?.AvailableTimeSlots) {
            if (state.AvailableTimeSlots?.length == 0) {
                setTimeout(() => setLoading("لا يوجد مواعيد متاحة حاليا"), 10000)
                return <p  > {loading}</p>
            }
        } else return <p className={`${loading == "فشل التحميل" && "text-red-700"}`}> {loading}</p>
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            <Field title="اختيار موعد" className='flex flex-col w-full lap:mx-4 '>
                <>
                    <div className="flex flex-wrap w-full m-auto justify-center select-none">
                        {state.AvailableTimeSlots?.map((a: any) => <SelectRadio key={a.date} data={a} register={register} dispatch={dispatch} state={state} />)}

                        <Loading />
                    </div>
                </>
            </Field>
            <AdditionalFieldsValue page={4} />

            <input type='submit' value="انهاء تقديم الطلب" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
    );
}


function EndPage({ state, dispatch }: any) {
    let { data, setData } = useContext(FormDataContext)
    return (
        <div className='*:py-2 mb-10 w-full flex justify-center items-center min-h-[200px]'>  تم  انهاء تقديم الطلب      </div >
    );
}


function SelectRadio({ data, register, dispatch, state }: any) {
    let [Time, setTime] = useState(data.times[0])

    function setTimes(data: any) {
        function to24(time12: string): string {
            // Split the time string into hours, minutes, and period (AM/PM)
            const [time, period] = time12.split(' ');
            const [hours, minutes] = time.split(':').map(Number);

            // Convert hours to 24-hour format
            let hours24 = hours;
            if (period.toUpperCase() === 'PM' && hours !== 12) hours24 += 12;
            else if (period.toUpperCase() === 'AM' && hours === 12) hours24 = 0;


            // Convert hours and minutes to string with leading zeros if necessary
            const hoursStr = hours24.toString().padStart(2, '0');
            const minutesStr = minutes.toString().padStart(2, '0');

            // Return the time in 24-hour format
            return `${hoursStr}:${minutesStr}:00.0000000`
        }

        // Example usage
        let [startTime, endTime] = data.times[0].split(" - ")
        dispatch({ type: 'data', payload: { ...state?.defaultData, "projectDate": data.date, "startTime": to24(startTime), "endTime": to24(endTime) } })
    }
    return (
        <div className='m-4 w-[300px]' onClick={() => setTimes(data)}>
            <input type="radio" id={`a${data.date.replaceAll('-', "b")}`} {...register("startTime")} value={`a${data.date.replaceAll('-', "b")}`} className="hidden peer" defaultChecked={state.defaultData.projectDate == data.date} />
            <label htmlFor={`a${data.date.replaceAll('-', "b")}`} className=" flex flex-col items-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 text-center h-full ">
                <div className="w-full lap:text-lg tap:text-base text-xs font-bold  peer-aria-checked:text-safety-700  peer-checked:text-blue-600 p-2">{data?.lable}</div>
                <div className="w-full font-medium lap:text-lg tap:text-base text-xs">{data?.date}</div>
                <div className='peer/list'>
                    {data?.times?.map((time: any, i: number) => (
                        <div key={i} className={` flex items-center p-4 border border-gray-200 rounded m-2 w-full ms-2 lap:text-sm tap:text-sm text-xs font-medium text-gray-900 ${state.defaultData?.projectDate == data.date && Time == time && "border-blue-600 bg-blue-700 text-white"}`} style={{ direction: 'ltr' }} onClick={(a: any) => setTimeout(() => {
                            setTimes({ ...data, times: [time] })
                            setTime(time)
                        }, 100)}>
                            {time}
                        </div>
                    ))}
                </div>
            </label >
        </div >
    )
}
export default FormPart4
