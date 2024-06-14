"use client"
import Logo from "@/component/theme/logo1"
import { message } from "antd"
import { useForm, SubmitHandler } from "react-hook-form"
import Cookies from "js-cookie"
import axios from "axios"
import { createContext, forwardRef, useContext, useEffect, useState } from 'react';

import JsCookies from 'js-cookie';
import { createFatch } from "./froms/get"
import { Err } from "./froms/service/form"
// Create a context for the authentication state
export const AuthContext = createContext({});
/* This code snippet defines a functional component called `LoginApp` in TypeScript with React. Here's
a breakdown of what the code is doing: */

export default function AuthApp({ userType = 2, required }: any) {

    const authContext = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<any>()
    type TitleType = "login" | "Register" | "OTP";
    let [mode, setMode] = useState<TitleType>("login")
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let cookie = Cookies.get("userToken")
        if (required) {
            setLoading(false)
        } else if (!cookie || cookie.length < 20) {
            setLoading(false)
        }
    }, [])
    let title: Record<TitleType, string> = {
        login: "تسجيل الدخول",
        Register: "تسجيل",
        OTP: "التحقق من الايميل"
    }
    function View() {
        if (mode === "login") return <Login route={setMode} required={required} />
        if (mode === "Register") return <SignUp route={setMode} />
        if (mode === "OTP") return <OTP route={setMode} />
        else return <></>
    }

    if (loading) return <></>
    else return (
        <AuthContext.Provider value={authContext}>
            <div className="max-w-[400px] m-auto p-4 mb-16 mt-16 flex flex-col j min-h-[500px] shadow-lg rounded-2xl" >
                <Logo type="ar" className={"m-auto "} />
                <h1 className="text-3xl font-bold text-center my-4 text-safety-700  " >{title[mode]}</h1>
                <View />
            </div>
            {mode != "OTP" &&
                <div className={`!w-full max-w-[400px] m-auto border-safety-700 border-2 my-6 text-safety-700  hover:shadow-lg p-2 text-center font-bold rounded-lg`} onClick={() => setMode(mode === "login" ? "Register" : "login")}  >{title[mode === "login" ? "Register" : "login"]}</div>}
        </AuthContext.Provider>
    )
}

function Login({ userType = 2, route, required }: any) {
    let [se, setSe] = useState("تسجيل الدخول ")

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    let url = process.env.NEXT_PUBLIC_API
    const onSubmit: SubmitHandler<any> = async (res) => {
        let body = { ...res, userType }
        setSe("جاري تسجيل الدخول ...")

        // -------------------- start ----------------
        let token: any = JsCookies.get("userToken")

        if (process.env.NEXT_PUBLIC_ENV == "development") {

            createFatch("/Authorization/Login", body)
                .then((data: any) => {

                    if (data?.code === 400) {
                        let { user } = data
                        if (!user?.isEmailVerified) message.info(' لم يتم التحقق من البريد الإلكتروني')
                    }
                    else if (data.code === 200) {
                        data = data.data
                        message.success('تم  تسجيل الدخول  ')

                        Cookies.set("userInformation", JSON.stringify(data?.userInformation))
                        Cookies.set("refreshToken", data?.refreshToken)
                        Cookies.set("userToken", data?.userToken)
                        Cookies.set("userloginTime", new Date().getTime().toString())
                        location.reload()
                    }
                })
                .catch((error) => Err(error))

        } else if (process.env.NEXT_PUBLIC_ENV === "production") {
            let headers: any = { "Content-Type": "application/json" }
            if (token) headers["Authorization"] = `Bearer ${token}`
            let api = process.env.NEXT_PUBLIC_API

            createFatch("/Authorization/Login", body)
                .then((data: any) => {

                    if (data?.code === 400) {
                        let { user } = data
                        if (!user?.isEmailVerified) message.info(' لم يتم التحقق من البريد الإلكتروني')
                    }
                    else if (data.code === 200) {
                        data = data.data
                        message.success('تم  تسجيل الدخول  ')

                        Cookies.set("userInformation", JSON.stringify(data?.userInformation))
                        Cookies.set("refreshToken", data?.refreshToken)
                        Cookies.set("userToken", data?.userToken)
                        Cookies.set("userloginTime", new Date().getTime().toString())
                        location.reload()
                    }
                })
                .catch((error) => Err(error))

            axios.post(`${api}/Authorization/Login`, body, { headers })
                .then(({ data }: any) => {

                    if (data?.code === 400) {
                        let { user } = data
                        if (!user?.isEmailVerified) message.info(' لم يتم التحقق من البريد الإلكتروني')
                    }
                    else if (data.code === 200) {
                        data = data.data
                        message.success('تم  تسجيل الدخول  ')

                        Cookies.set("userInformation", JSON.stringify(data?.userInformation))
                        Cookies.set("refreshToken", data?.refreshToken)
                        Cookies.set("userToken", data?.userToken)
                        Cookies.set("userloginTime", new Date().getTime().toString())
                        location.reload()
                    }
                })
                .catch((error) => Err(error))
        }
        // -------------------- end ----------------

        // refresh
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" >
            <p>الايميل *</p>
            <input type="email"  {...register("email")} placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
            <p>كلمة السر *</p>
            <input type="password"  {...register("password")} placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={se} />
        </form>
    )
}

function SignUp({ route }: any) {
    let [se, setSe] = useState("تسجيل  ")
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    const Register: SubmitHandler<any> = (res) => {
        setSe("جاري التسجيل ...")
        createFatch("/Authorization/Client/Register", res)
            .then((data) => {
                console.log(data);

                if (data?.code === 200) {
                    localStorage.setItem("userData", JSON.stringify(data?.data))
                    message.success('تم تسجيل الحساب')
                    route("OTP")
                } else if (data.code === 400) {
                    message.error('الحساب مستخدم من قبل')
                }
            })
    }
    return (
        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
            <Field title="الاسم الكامل" placeholder="Saad ..." type="text"{...register("fullName")} />
            <Field title="الايميل" placeholder="saad@mail.com ..." {...register("email")} type="text" />
            <Field title="كلمة السر" placeholder="*********" {...register("password")} type="password" />
            <Field title="الجوال" placeholder="7072323324" {...register("phoneNumber")} type="tel" />
            {/* <Field title="الصورة الشخصية" placeholder="string" {...register("profileImage")} type="file" accept="image/png, image/gif, image/jpeg" /> */}
            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={se} />
        </form>
    )
}


function OTP({ route }: any) {

    const { register, handleSubmit } = useForm<any>()
    const Register: SubmitHandler<any> = (res) => {
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        if (userData) {
            let body = { userId: userData.userId, code: res.code }
            createFatch("/Authorization/EmailVerification", body)
                .then((data) => {

                    if (data.code === 200) {
                        localStorage.setItem("userData", JSON.stringify(data))
                        message.success('تم التحقق من الايميل')
                        route("login")
                    } else message.error("كود التحقق من الايميل غير صالح")
                })
        }
    }
    const resendOTP = () => {
        message.info('جاري طلب كود جديد')
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        if (userData) createFatch(`/Authorization/ResendOTP`, { email: userData.createdBy })
            .then((data) => {
                console.log({ data });

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