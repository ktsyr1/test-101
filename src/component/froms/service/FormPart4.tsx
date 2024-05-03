import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Err } from './form';
import { FormDataContext } from '../contextApi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ConfigApi } from '@/component/lib';
import backup from './backup.json';
import AdditionalFieldsValue from './AdditionalFieldsValue';

// ------------------------------------------ 

const reducer = (state: any, action: any) => {
    if (action.type === "data") return { ...state, defaultData: action.payload };
    else if (action.type === "AvailableTimeSlots") return { ...state, AvailableTimeSlots: action.payload };
    else if (action.type === "nextPart") return { ...state, nextPart: action.payload };
    else return state;
}

// ------------------------------------------

const FormPart4 = () => {

    let { data, setData } = useContext(FormDataContext)
    // useReducer start 
    const [state, dispatch] = useReducer(reducer, { defaultData: data, AvailableTimeSlots: backup.AvailableTimeSlots, nextPart: 1 });
    // useReducer end

    useEffect(() => {
        async function Cities() {
            let { url, headers } = ConfigApi()
            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

            let UrlAvailableTimeSlots = url + `/Client/Project/AvailableTimeSlots?TargetDate=${formattedDate}`
            axios.get(UrlAvailableTimeSlots, { headers })
                .then(({ data }) => dispatch({ type: 'AvailableTimeSlots', payload: data?.data }))
                .catch((error) => Err(error))

            return

        }
        Cities()
    }, [data])

    const { register, handleSubmit } = useForm({ defaultValues: state.defaultData });
    const onSubmit = (res: any) => {

        if (state.nextPart == 1) {
            setData({ ...state?.defaultData, projectTitle: res.projectTitle })
            dispatch({ type: 'nextPart', payload: 2 })

        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='*:py-2 mb-10 ' onChange={() => ""} >
            {state.nextPart == 1 && <div className="flex flex-wrap w-full m-auto justify-center select-none">
                {state.AvailableTimeSlots?.map((a: any) => <SelectRadio key={a.date} data={a} register={register} dispatch={dispatch} state={state} />)}
            </div>}
            <AdditionalFieldsValue page={4} />

            <input type='submit' value="التالي" className='p-2 mx-4 bg-safety-700 text-white rounded-lg w-full  cursor-pointer' />
            <br />
        </form >
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
            <label htmlFor={`a${data.date.replaceAll('-', "b")}`} className=" flex flex-col items-center   w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700   text-center h-full ">
                <div className="w-full text-lg font-bold  peer-aria-checked:text-safety-700  peer-checked:text-blue-600 p-2">{data?.lable}</div>
                <div className="w-full font-medium">{data?.date}</div>
                <div className='peer/list'>
                    {data?.times?.map((time: any, i: number) => (
                        <div key={i} className={` flex items-center  p-4   border border-gray-200 rounded dark:border-gray-700 m-2  w-full  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${state.defaultData?.projectDate == data.date && Time == time && "border-blue-600 bg-blue-700 text-white"}`} style={{ direction: 'ltr' }} onClick={(a: any) => setTimeout(() => {
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
