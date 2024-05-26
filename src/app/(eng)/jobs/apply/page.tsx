"use client"
import Logo from "@/component/theme/logo1"
import { message } from "antd"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import JsCookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    let route = useRouter()
    const { register, handleSubmit } = useForm<any>()

    const onSubmit: SubmitHandler<any> = (res) => {
        // axios.post(`/api/admin/user`, res)
        //     .then(({ data }) => {
        //         console.log(data)
        //         if (data?.token) {
        //             JsCookies.set('--token', data.token)
        message.success('تم تقديم الطلب البريد الإلكتروني بنجاح')
        // route.push('/admin')
        // } else message.error("المعلومات غير صحيحة")
        // })
    }
    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] m-auto p-4 mb-16 mt-32 flex flex-col j min-h-[400px] hover:shadow-lg rounded-2xl" >
            <Logo type="ar" className={"m-auto "} />
            <h1 className="text-3xl font-bold text-center my-4" >تقديم الطلب</h1>
            <p>الاسم الكامل *</p>
            <input type="text"  {...register("fullname")} placeholder="Saad ..." className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>الايميل *</p>
            <input type="email" {...register("email")} placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>رقم الهاتف *</p>
            <input type="text" {...register("PhoneNumber")} placeholder="12333223" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>  السيرة الذاتية </p>
            <input type="file" {...register("cv")} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 h-12" />

            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تقديم الطلب" />
        </form>
    )
}

function verifyPhoneNumber(phoneNumber: string) {
    // يمكنك تعديل هذا النمط حسب التنسيق المطلوب
    const phonePattern = /^(\+?961)?(3|70|71|76|78|79)\d{6}$/;

    if (phonePattern.test(phoneNumber)) {
        console.log("تنسيق رقم الهاتف صحيح.");
    } else {
        console.log("تنسيق رقم الهاتف غير صحيح.");
    }
}

// اختبار الشيفرة البرمجية
verifyPhoneNumber("+96171234567"); // تنسيق رقم الهاتف صحيح.
verifyPhoneNumber("71234567"); // تنسيق رقم الهاتف غير صحيح.
