"use client"
import Logo from "@/component/theme/logo1"
import { message } from "antd"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import JsCookies from "js-cookie"
import { useRouter } from "next/navigation"
import { JobsApply } from "@/component/froms/get"
// curl -X 'POST' \
//   'https://app.inspectex.sa/Guest/JobsApply' \
//   -H 'accept: */*' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'FullName=قتيبة محمد' \
//   -F 'Email=ktsyr1@gmail.com' \
//   -F 'PhoneNumber=70723177' \
//   -F 'Files=@favicon.png;type=image/png' \
//   -F 'CareersID=404caf9c-1f0b-4960-3bef-08dc5370b840'
export default function JobsApplyPage({ searchParams: { id } }: any) {

    let route = useRouter()
    const { register, handleSubmit } = useForm<any>()

    const onSubmit: SubmitHandler<any> = (res) => {
        console.log(res);
        const formData = new FormData();
        formData.append('FullName', res?.FullName);  // Firstname
        formData.append('Email', res?.Email);  // MiddleName
        formData.append('PhoneNumber', res?.PhoneNumber);  // LastName
        formData.append('Files', new Blob([res?.Files], { type: 'application/pdf' }), `CV${new Date().getTime()}.pdf`);    // Files
        formData.append('CareersID', id);  // PhoneNumber 

        JobsApply({ data: { formData } })
            .then(RES => {
                message.success("تم تقديم الطلب بنجاح")
            })
            .catch(error => console.error(error))
        // route.push('/admin')
        // } else message.error("المعلومات غير صحيحة")
        // })
    }
    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] m-auto p-4 mb-16 mt-32 flex flex-col j min-h-[400px] hover:shadow-lg rounded-2xl" >
            <Logo type="ar" className={"m-auto "} />
            <h1 className="text-3xl font-bold text-center my-4" >تقديم الطلب</h1>
            <p>الاسم الكامل *</p>
            <input type="text"  {...register("FullName")} placeholder="Saad ..." className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>الايميل *</p>
            <input type="email" {...register("Email")} placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>رقم الهاتف *</p>
            <input type="text" {...register("PhoneNumber")} placeholder="12333223" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>   السيرة الذاتية و المستندات ذات صلة </p>
            <input type="file" {...register("Files")} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4 h-12" multiple />

            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value="تقديم الطلب" />
        </form>
    )
}
