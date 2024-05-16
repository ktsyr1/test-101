"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { forwardRef, useState } from 'react';

import { createFatch } from "@/component/froms/get"
import axios from "axios";

/* This code snippet defines a functional component called `LoginApp` in TypeScript with React. Here's
a breakdown of what the code is doing: */

export default function GetServices() {

    let [ok, setOk] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()
    const Register: SubmitHandler<any> = (res) => {
        res['password'] = 'P@ssw0rd'
        if (process.env.NEXT_PUBLIC_ENV == "development")
            createFatch("/Authorization/Client/Register", res)
                .then(() => setOk(true))
        else if (process.env.NEXT_PUBLIC_ENV === "production") {

            let data = {
                email: res.email,
                password: 'P@ssw0rd',
                fullName: res.fullName,
                phoneNumber: res.phoneNumber,
            }
            createFatch("/Authorization/Client/Register", data)
                .then(() => setOk(true))

            axios.post(`${process.env.NEXT_PUBLIC_API}/Authorization/Client/Register`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => setOk(true))
        }

    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] w-full bg-slate-100" />
            <div className=" w-full flex flex-col   items-center max-w-[1200px] p-4 tap:max-w-[90%] ">
                <div className="mt-4  bg-white">
                    <div className=" flex items-center w-full max-w-[1360px]     flex-col">
                        <div className="flex flex-col items-center m-auto w-[90%] my-20 " >
                            <div className="flex tap:flex-row flex-col justify-between w-full mb-8 items-center" >

                                <h2 className="w-full text-start lap:text-5xl tap:text-4xl text-3xl my-4 font-bold text-safety-700 mr-10">طلب الخدمة </h2>
                            </div>
                            <p className="text-slate-700 m-4 w-full">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p>
                        </div>
                    </div>

                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScedu-uK2yI5xFeTB0zgDCIwZCR9MVa9ygOkPhUSMGVzJ6tcA/viewform?embedded=true" className="m-auto border-0" width="640" height="800"    >جارٍ التحميل…</iframe>
                    <div className={`max-w-[400px] m-auto p-4 mb-16 mt-20   flex-col j min-h-[500px] shadow-lg rounded-2xl hidden ${ok && "hidden"}`}>                        {/* <Logo type="ar" className={"m-auto "} /> */}
                        <h1 className="text-3xl font-bold text-center my-4 text-safety-700  " >تسجيل الطلب</h1>

                        <form onSubmit={handleSubmit(Register)} className="w-full h-auto"  >
                            <Field title="الاسم الكامل" placeholder="Saad ..." type="text"{...register("fullName")} />
                            <Field title="الايميل" placeholder="saad@mail.com ..." {...register("email")} type="text" />
                            <Field title="الجوال" placeholder="7072323324" {...register("phoneNumber")} type="tel" />
                            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg cursor-pointer`} value="تقديم الطلب  " />
                        </form>
                    </div>
                    <div className={`text-center items-center m-auto p-4 mb-16 mt-20 flex flex-col j min-h-[500px] text-safety-700 rounded-2xl ${!ok && "hidden"} font-semibold text-xl justify-center`}>
                        تم تسجيل طلبك بنجاح <br /> سنتواصل معك في أقرب وقت لتوضيح المزيد.
                    </div>
                    <br />
                </div>
            </div>
        </div>
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