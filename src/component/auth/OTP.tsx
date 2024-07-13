"use client"
import { message } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import { createContext, forwardRef } from 'react';
import { createFatch } from "../froms/get"
import { SendLogin } from "./login";


export const AuthContext = createContext({});

export default function OTP({ route }: any) {
    const { register, handleSubmit } = useForm<any>()
    const Register: SubmitHandler<any> = (res) => {
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        
        if (userData) {
            let body = { userId: userData.userId, code: res.code }
            createFatch("/Authorization/EmailVerification", body)
                .then((data) => {

                    if (data.code === 200) {
                        let body = {
                            email: sessionStorage.getItem("email"),
                            password: sessionStorage.getItem("password")
                        }
                        message.success('تم التحقق من الايميل')
                        SendLogin(body)
                    } else message.error("كود التحقق من الايميل غير صالح")
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
    }
    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <Field title="الكود" placeholder="123123" {...register("code")} type="number" />
            {/* /Authorization/ResendOTP */}
            <div className="flex flex-row justify-between">

                <button className={`!w-full border border-safety-700 my-6 text-safety-700 hover:shadow-lg p-2 text-center font-bold rounded-lg ml-4`} onClick={resendOTP} >طلب كود جديد  </button>
                <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تحقق  " />
            </div>
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