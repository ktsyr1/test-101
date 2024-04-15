"use client"
import Logo from "@/component/theme/logo1"
import { message } from "antd"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Cookies from "js-cookie"
import axios from "axios"

export default function LoginApp({ userType = 2 }: any) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    let [mode, setMode] = useState("login")
    let url = process.env.NEXT_PUBLIC_API

    const onSubmit: SubmitHandler<any> = async (res) => {
        let body = { ...res, userType }
        console.log(body);
        let data = await axios.post(`${url}/Authorization/Login`, body)
            .then(({ data }) => data?.data)
        // alert
        message.success('تم تحديث البيانات')
        // setCookies
        Cookies.set("userInformation", JSON.stringify(data?.userInformation))
        console.log(JSON.stringify(data?.userInformation));
        
        Cookies.set("refreshToken", data?.refreshToken)
        console.log(data?.refreshToken);
        
        Cookies.set("userToken", data?.userToken)
        console.log(data?.userToken);

        // refresh
    }
    const Register: SubmitHandler<any> = (res) => {
        console.log(res);
        // send api 
        // alert
        // setCookies
        // let token = "2-------------------------------------------------"
        // Cookies.set('x-token', token)
        // refresh
        message.success('تم تحديث البيانات')
    }
    function View() {

        if (mode === "login") {
            return (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full" >
                    <p>الايميل *</p>
                    <input type="email"  {...register("email")} placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                    <p>كلمة السر *</p>
                    <input type="password"  {...register("password")} placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                    <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تسجيل الدخول" />
                </form>
            )
        } else {
            return (
                <form onSubmit={handleSubmit(Register)} className="w-full"    >
                    <p>الاسم الكامل *</p>
                    <input type="text"     {...register("email")} placeholder="Saad ..." className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                    <p>كلمة السر *</p>
                    <input type="password"   {...register("email")} placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 w-full" />
                    {/* <p>  الصورة الشخصية </p> */}
                    {/* <input type="file" name="image"  {...register("email")} onChange={upload} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" accept="image/png, image/gif, image/jpeg" /> */}
                    <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تسجيل  " />
                </form>
            )
        }
    }
    return (
        <div >

            <div onSubmit={handleSubmit(onSubmit)} id="form" className="max-w-[400px] m-auto p-4 mb-16 mt-16 flex flex-col j h-[500px] shadow-lg rounded-2xl" >
                <Logo type="ar" className={"m-auto "} />
                <h1 className="text-3xl font-bold text-center my-4 text-safety-700  " >{mode === "login" ? "تسجيل الدخول" : "تسجيل "}</h1>
                <View />
            </div>
            <div className={`!w-full max-w-[400px] m-auto border-safety-700 border-2 my-6 text-safety-700  hover:shadow-lg p-2 text-center font-bold rounded-lg`} onClick={() => setMode(mode === "login" ? "Register" : "login")}  >{mode !== "login" ? "تسجيل الدخول" : "تسجيل "}</div>
        </div>
    )
}
 