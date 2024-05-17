"use client"

import { Blog_Create } from "@/graphql/queries/blog";
import { useMutation } from "@apollo/client";
import { message } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

export default function BlogForm({ mode }: any) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>()

    // const [update, { data: res, loading, error }] = useMutation(Blog_Create);

    let className = "p-2 border-2 rounded-lg border-slate-300 px-4 my-4"
    const onSubmit: SubmitHandler<any> = (res) => {
        // update({ variables: res })
        message.success('تم تحديث البيانات')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} id="form" className="max-w-[400px] w-full p-4 mb-16 mt-32 flex flex-col justify-between shadow-lg rounded-2xl" >
            <h1 className="text-3xl font-bold text-center my-4 text-safety-700" >{mode ? "تعديل" : "اضافة"} المقالة</h1>
            <div className="flex flex-col " >
                <p>العنوان *</p>
                <input type="text" placeholder="الطباعة ثلاثية الأبعاد..." className={className} {...register("title", { required: true })} />
                <p>وصف قصير *</p>
                <textarea placeholder="استكشف عالم الطباعة ثلاثية الأبعاد..." className={className}  {...register("shortContent", { required: true })}   ></textarea >
                <p>التصنيف *</p>
                <input type="text" placeholder="علم وتكنولوجيا..." className={className}  {...register("category", { required: true })} />
                <p>الرابط *</p>
                <input type="text" placeholder="الطباعة-ثلاثية-الأبعاد..." className={className}  {...register("slug", { required: true })} />
                <p>صورة المقال *</p>
                <input type="file" placeholder="saad..." className={className}  {...register("image", { required: true })} />

                <p>content *</p>
                <textarea placeholder=" تُعدّ الطباعة ثلاثية الأبعاد تقنية ثورية تُغيّر قواعد اللعبة..." className="p-2 min-h-[300px] border-2 rounded-lg border-slate-300 px-4 my-4" {...register("content", { required: true })} ></textarea >
                <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`}  >{mode ? "تعديل" : "اضافة"}</input>
            </div>
        </form>
    )
}
