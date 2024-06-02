"use client"
import { UPDATE_USER_ONE } from "@/graphql/queries/user";
import { useMutation } from "@apollo/client";
import { message } from "antd";
import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form"

export default function FormUserOne({ data: one }: any) {
    const [update, { data: res, loading, error }] = useMutation(UPDATE_USER_ONE);
    let [data, setData] = useState(one)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        update({ variables: res })
        message.success('تم تحديث البيانات')
    }

    const upload = () => {
        
    }
    // onChange={upload}
    return (
        <div className="m-a   w-full flex j ">
            <form onSubmit={handleSubmit(onSubmit)} id="form" className="max-w-[400px] w-full m-auto p-4 mb-16 mt-32 flex flex-col justify-between shadow-lg rounded-2xl" >
                <h1 className="text-3xl font-bold text-center my-4 text-safety-700" >تعديل بيانات</h1>
                <div className="flex flex-col " >
                    <p>الاسم الكامل *</p>
                    <input type="text" placeholder="saad ..." className="p-2 border-2 rounded-lg border-slate-300 px-4 my-4" {...register("fullname", { required: true })} />
                    <p>الايميل *</p>
                    <input type="email" placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-4 my-4" {...register("email", { required: true })} />
                    <p>كلمة السر *</p>
                    <input type="password" placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-4 my-4" {...register("password", { required: true })} />
                    <p>نبذة عن المستخدم*</p>
                    <textarea   placeholder="مهندس مدني ومدون ......" className="p-2 border-2 rounded-lg border-slate-300 px-4 my-4" {...register("bio", { required: true })}  ></textarea >
                    <p>  الصورة الشخصية </p>
                    <input type="file"  {...register("bio")} className="p-2 border-2 rounded-lg border-slate-300 px-4 my-4" accept="image/png, image/gif, image/jpeg" />

                    <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={data ? "تحديث" : "اضافة"} />
                </div>
            </form >
        </div >
    )
}
