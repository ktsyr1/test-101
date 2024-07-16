"use client"
import { message, notification } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import { createContext, forwardRef, useEffect, useState } from 'react';
import GetFatch, { createFatch } from "../froms/get"
import { SendLogin } from "./login";


export const AuthContext = createContext({});

export default function OTPEmail({ route }: any) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    let [err, seterr] = useState()
    const Register: SubmitHandler<any> = (res) => {
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');

        if (userData) {
            let body = { userId: userData.userId, code: res.code }
            createFatch("/Authorization/EmailVerification", body)
                .then((data) => {
                    if (data.status) {
                        route("OTPPhone")
                    } else seterr(data.messages)
                })
        }
    }
    const resendOTP = () => {
        message.info('جاري طلب كود جديد')
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        if (userData) createFatch(`/Authorization/ResendOTP`, { email: userData.createdBy })
            .then((data) => {
                if (data?.code === 200) message.success('تم طلب كود جديد')
                else message.error('حدث خطأ ما')
            })
        setSeconds(60)
    }

    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => setSeconds(prevSeconds => prevSeconds - 1), 1000);
            return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }
    }, [seconds]);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <div>
                <p>الكود *</p>
                <input className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" {...register("code", {
                    required: true,
                    minLength: { value: 6, message: "يرجى التأكد من الكود  " },
                    maxLength: { value: 6, message: "يرجى التأكد من الكود" }
                })} type="test" />
            </div>
            {errors.code && <p className="text-red-600">{errors.code.message as string}</p>}

            {/* /Authorization/ResendOTP */}
            {seconds != 0 && <p>يمكنك اعادة الطلب  {seconds > 0 ? `بعد ${seconds} ثانية` : "الان"} </p>}
            {seconds == 0 && <p>يمكنك   <span className="text-safety-700  cursor-pointer" onClick={resendOTP} >اعادة طلب كود جديد</span> </p>}

            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تحقق  " />
        </form>
    )
} 