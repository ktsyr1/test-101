"use client"
import { message } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import { createContext, forwardRef, useEffect, useRef, useState } from 'react';
import { createFatch } from "../froms/get"
import { SendLogin } from "./login";


export const AuthContext = createContext({});

export default function OTPPhone({ route }: any) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    let [err, seterr] = useState<any>()
    let PN = useRef<any>()
    const Register: SubmitHandler<any> = (res) => {
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        seterr(null)
        if (userData) {
            let body = { userId: userData.userId, otp: res.code }
            createFatch("/Authorization/PhoneVerification", body)
                .then((data) => {
                    console.log(data);

                    if (data.code === 200) {
                        let body = {
                            email: sessionStorage.getItem("email"),
                            password: sessionStorage.getItem("password")
                        }
                        SendLogin(body)
                    } else seterr(data.messages)
                })
        }
    }
    const resendOTP = () => {
        let ph: any = PN.current?.value
        message.info('جاري طلب كود جديد')
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        if (userData) createFatch(`/Authorization/ResendOTP`, { phoneNumber: ph || userData.phoneNumber, userId: userData.userId })
            .then((data) => {
                if (data?.code === 200) message.success('تم طلب كود جديد')
                else message.error('حدث خطأ ما')
            })
        setSeconds(60)
        setPHV(false)
    }
    const [seconds, setSeconds] = useState(60);
    const [PHV, setPHV] = useState(false);
    useEffect(() => {
        if (seconds > 0) {
            const intervalId: any = setInterval(() => setSeconds(prevSeconds => prevSeconds - 1), 1000);
            return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }
    }, [seconds]);
    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <div>
                <p>الكود *</p>
                <input className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" {...register("code", {
                    required: true,
                    minLength: { value: 6, message: "يرجى التأكد من الكود  " },
                    maxLength: { value: 6, message: "يرجى التأكد من الكود" }
                })} type="test" />
                <p className="text-safety-700 px-4 cursor-pointer w-full text-end" onClick={() => setPHV(!PHV)} > تغيير رقم الهاتف</p>

            </div>


            {PHV && <div>
                <p>تغيير رقم الهاتف   *</p>
                <input className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" name="phoneNumber" onChange={e => {
                    if (/^05\d{8}$/.test(e.target.value)) {
                        setSeconds(0)
                        seterr(null)
                    } else {
                        setSeconds(30)
                        seterr('يرجى التأكد من رقم الجوال')
                    }
                }} type="text"
                    ref={PN} />
            </div>}
            {/* /Authorization/ResendOTP */}
            {seconds != 0 && <p>يمكنك اعادة الطلب  {seconds > 0 ? `بعد ${seconds} ثانية` : "الان"} </p>}
            {seconds == 0 && <p>يمكنك   <span className="text-safety-700 py-4 cursor-pointer" onClick={resendOTP} >اعادة طلب كود جديد</span> </p>}
            {err && <p className="text-red-600">{err}</p>}
            {errors.code && <p className="text-red-600">{errors.code.message as string}</p>}
            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تحقق  " />

        </form>
    )
}

const Field = forwardRef((props: any, ref) => {
    return (
        <div>
            <p>{props.title} *</p>
            <input type="text" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" {...props} ref={ref} />
        </div>
    )
})

Field.displayName = 'Field'
// --- start funs lib 