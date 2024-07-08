"use client"
import { message } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import { createContext, useContext, useEffect, useState } from 'react';

import GetFatch, { createFatch } from "@/component/froms/get"
import Logo from "@/component/theme/logo1";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
// Create a context for the authentication state
export const AuthContext = createContext({});
/* This code snippet defines a functional component called `LoginApp` in TypeScript with React. Here's
a breakdown of what the code is doing: */

export default function ForgotPassword({ userType = 2, required }: any) {

    const authContext = useContext(AuthContext);
    type TitleType = "SendEmail" | "ReCode" | "NewPassword"
    let [mode, setMode] = useState<TitleType>("SendEmail")
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        let cookie = Cookies.get("userToken")
        if (required) setLoading(false)
        else if (!cookie || cookie.length < 20) setLoading(false)
    }, [])
    let title: Record<TitleType, string> = {
        SendEmail: "نسيت كلمة المرور",
        ReCode: "كود التحقق",
        NewPassword: " كلمة المرور الجديدة"
    }
    function View() {
        if (mode === "ReCode") return <ReCode route={setMode} />
        if (mode === "NewPassword") return <NewPassword />
        else return <SendEmail route={setMode} />
    }

    if (loading) return <></>
    else return (
        <AuthContext.Provider value={authContext}>
            <div className="max-w-[400px] mt-20 m-auto p-4 mb-16   flex flex-col j min-h-[500px] w-full shadow-lg rounded-2xl" >
                <Logo type="ar" className={"m-auto "} />
                <h1 className="text-3xl font-bold text-center my-4 text-safety-700  " >{title[mode]}</h1>
                <View />
            </div>
        </AuthContext.Provider>
    )
}

function SendEmail({ route }: any) {
    const { register, handleSubmit, watch, formState: { errors } }: any = useForm<any>();
    let [Errors, setErrors] = useState(null)
    let [Send, setSend] = useState("ارسال  ")
    //  end vars
    const Register: SubmitHandler<any> = (res) => {
        setSend("جاري الارسال ...")
        createFatch("/Authorization/ForgotPassword", { email: res.email })
            .then((data) => {
                setErrors(null)
                if (data.code === 200) {
                    sessionStorage.setItem("email", res.email)
                    message.success('تم التحقق من الايميل')
                    route("ReCode")
                } else setErrors(data.messages)
                setSend("ارسال  ")
            })
    }


    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <div className={`flex flex-col my-4 w-full `}>
                <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">الايميل</p>
                <input className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" placeholder="example@mail.com" type="text"
                    {...register("email", {
                        required: "يرجى إدخال البريد الإلكتروني",
                        pattern: {
                            value: /^[A-Za-z0-9.+]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "الرجاء إدخال بريد إلكتروني صحيح"
                        }
                    })}
                />
                {errors["email"] && <p className="text-red-600 mb-4">{errors["email"]?.message}</p>}
            </div>
            {Errors && <p className="text-red-600 mb-4">{Errors}</p>}

            <div className="flex flex-row justify-between">
                <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={Send} />
            </div>
        </form>
    )
}

function ReCode({ route }: any) {
    const { register, handleSubmit, watch, formState: { errors } }: any = useForm<any>();
    let [Errors, setErrors] = useState<any>(null)
    let [Send, setSend] = useState("ارسال  ")
    //  end vars
    const Register: SubmitHandler<any> = (res) => {
        let email = sessionStorage.getItem("email")
        setSend("جاري الارسال ...")

        if (email) GetFatch(`/Authorization/CheckOTP?Email=${email}&OTP=${res.code}`)
            .then((data) => {
                console.log(data);

                if (data.code === 200) {

                    sessionStorage.setItem("key", data.data)
                    message.success('تم التحقق من الكود')
                    route("NewPassword")
                } else setErrors("كود التحقق من الايميل غير صالح")
                setSend("ارسال  ")
            })
    }

    const resendOTP = () => {
        message.info('جاري طلب كود جديد')
        setErrors(null)
        let email = sessionStorage.getItem("email")
        if (email) createFatch(`/Authorization/ResendOTP`, { email })
            .then((data) => {
                if (data?.code === 200) message.success('تم طلب كود جديد')
                else setErrors(data?.messages)
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
    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <div className={`flex flex-col my-4 w-full `}>
                <p className=" lap:text-xl tap:text-sm text-xs  font-bold text-prussian-800 my-2 mr-4">الكود</p>
                <input className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" placeholder="" type="text"
                    {...register("code", {
                        required: "يرجى إدخال الكود",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "الرجاء إدخال كود صحيح"
                        }
                    })}
                />
                {errors["code"] && <p className="text-red-600 mb-4">{errors["code"]?.message}</p>}
            </div>
            {Errors && <p className="text-red-600 mb-4">{Errors}</p>}

            {/* /Authorization/ResendOTP */}
            {seconds != 0 && <p>يمكنك اعادة الطلب  {seconds > 0 ? `بعد ${seconds} ثانية` : "الان"} </p>}
            {seconds == 0 && <p>يمكنك   <span className="text-safety-700  cursor-pointer" onClick={resendOTP} >اعادة طلب كود جديد</span> </p>}

            <div className="flex flex-row justify-between">

                <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={Send} />
            </div>
        </form>
    )
}


function NewPassword() {
    let route = useRouter()
    let [se, setSe] = useState("اراسل ")
    let [Pass, setPass] = useState("password")
    let [err, seterr] = useState()
    let show = () => Pass == "password" ? setPass("test") : setPass("password")

    const { register, handleSubmit, watch, formState: { errors } }: any = useForm<any>()
    const newPassword = watch('newPassword');

    const onSubmit: SubmitHandler<any> = async (res) => {
        let key = sessionStorage.getItem("key")
        setSe("جاري اراسل ...")

        let body = {
            "forgetPasswordToken": key,
            "newPassword": res.newPassword,
            "confirmNewPassword": res.confirmNewPassword
        }
        if (key) createFatch(`/Authorization/ResetPassword`, body)
            .then((data) => {
                if (data?.code === 200) {
                    route.push("/get-service")
                    message.success('تم تغيير كلمة المرور')
                } else seterr(data?.messages)
            })
        setSe(" ارسال ")

    }
    // -------------------- end ----------------
    // refresh 
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " >
            <p>كلمة السر الجديدة *</p>
            <div className="flex items-center row select-none">
                <input type={Pass}  {...register("newPassword", {
                    required: "يرجى إدخال كلمة المرور الجديدة",
                    minLength: {
                        value: 6,
                        message: "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"
                    }
                })
                } placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                <div className="mr-[-40px] " onClick={show}>
                    <Show state={Pass} />
                </div>
            </div>
            {errors?.newPassword && <span className="text-red-600 mb-4">{errors["newPassword"].message}</span>}

            <p>تأكيد كلمة المرور الجديدة *</p>
            <div className="flex items-center row select-none">
                <input type={Pass}  {...register("confirmNewPassword", {
                    required: "يرجى تأكيد كلمة المرور الجديدة",
                    validate: (value: string) => value === newPassword || "كلمة المرور وتأكيدها لا تتطابقان"
                })} placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                <div className="mr-[-40px] " onClick={show}>
                    <Show state={Pass} />
                </div>
            </div>

            {errors.confirmNewPassword && <span className="text-red-600 mb-4">{errors.confirmNewPassword.message}</span>}

            {err && <p className="text-red-600 mb-4">{err}</p>}
            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={se} />
        </form>
    )
}

function Show({ state }: any) {
    if (state == "password") return (
        <svg viewBox="0 0 24 24" fill="none" width={30} xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.60603 6.08062C2.11366 5.86307 2.70154 6.09822 2.9191 6.60585L1.99995 6.99977C2.9191 6.60585 2.91924 6.60618 2.9191 6.60585L2.91858 6.60465C2.9183 6.604 2.91851 6.60447 2.91858 6.60465L2.9225 6.61351C2.92651 6.62253 2.93339 6.63785 2.94319 6.65905C2.96278 6.70147 2.99397 6.76735 3.03696 6.85334C3.12302 7.02546 3.25594 7.27722 3.43737 7.58203C3.80137 8.19355 4.35439 9.00801 5.10775 9.81932C5.28532 10.0105 5.47324 10.2009 5.67173 10.3878C5.68003 10.3954 5.68823 10.4031 5.69633 10.4109C7.18102 11.8012 9.25227 12.9998 12 12.9998C13.2089 12.9998 14.2783 12.769 15.2209 12.398C16.4469 11.9154 17.4745 11.1889 18.3156 10.3995C19.2652 9.50815 19.9627 8.54981 20.4232 7.81076C20.6526 7.44268 20.8207 7.13295 20.9299 6.91886C20.9844 6.81192 21.0241 6.72919 21.0491 6.67538C21.0617 6.64848 21.0706 6.62884 21.0758 6.61704L21.0808 6.60585C21.2985 6.0985 21.8864 5.86312 22.3939 6.08062C22.9015 6.29818 23.1367 6.88606 22.9191 7.39369L22 6.99977C22.9191 7.39369 22.9192 7.39346 22.9191 7.39369L22.9169 7.39871L22.9134 7.40693L22.9019 7.43278C22.8924 7.4541 22.879 7.48354 22.8618 7.52048C22.8274 7.59434 22.7774 7.69831 22.7115 7.8275C22.5799 8.08566 22.384 8.44584 22.1206 8.86844C21.718 9.5146 21.152 10.316 20.4096 11.1241L21.2071 11.9215C21.5976 12.312 21.5976 12.9452 21.2071 13.3357C20.8165 13.7262 20.1834 13.7262 19.7928 13.3357L18.9527 12.4955C18.3884 12.9513 17.757 13.3811 17.0558 13.752L17.8381 14.9544C18.1393 15.4173 18.0083 16.0367 17.5453 16.338C17.0824 16.6392 16.463 16.5081 16.1618 16.0452L15.1763 14.5306C14.4973 14.7388 13.772 14.8863 13 14.9554V16.4998C13 17.0521 12.5522 17.4998 12 17.4998C11.4477 17.4998 11 17.0521 11 16.4998V14.9556C10.2253 14.8864 9.50014 14.7386 8.82334 14.531L7.83814 16.0452C7.53693 16.5081 6.91748 16.6392 6.45457 16.338C5.99165 16.0367 5.86056 15.4173 6.16177 14.9544L6.94417 13.7519C6.24405 13.3814 5.61245 12.9515 5.04746 12.4953L4.20706 13.3357C3.81654 13.7262 3.18337 13.7262 2.79285 13.3357C2.40232 12.9452 2.40232 12.312 2.79285 11.9215L3.59029 11.1241C2.74529 10.2043 2.12772 9.292 1.71879 8.605C1.5096 8.25356 1.35345 7.95845 1.2481 7.74776C1.19539 7.64234 1.15529 7.55783 1.12752 7.49771C1.11363 7.46765 1.10282 7.44366 1.09505 7.42618L1.08566 7.4049L1.08267 7.39801L1.0816 7.39553L1.08117 7.39453C1.08098 7.39409 1.08081 7.39369 1.99995 6.99977L1.08117 7.39453C0.863613 6.8869 1.0984 6.29818 1.60603 6.08062Z" fill="#1C274C"></path>
        </svg>
    )
    else return (
        <svg viewBox="0 0 24 24" fill="none" width={30} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}