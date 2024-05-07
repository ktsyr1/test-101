"use client"

import { useContext, useState } from "react"
import { FormContext, FormDataContext } from "../contextApi";
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form"
// end imported

export default function FormRef1() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        res.age = Number(res.age)
       
        setData({ ...res })
        setSelect(select + 1)
    }
    return (
        <Layout slug={1}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[1200px] *:w-[45%] *:m-2 *:lap:p-2 *:p-1 *:rounded-lg  flex flex-wrap  justify-between mt-10 *:lap:text-xl *:tap:text-base *:text-xs placeholder:*:text-xs   " >
                <FormElm.Title >أخبرنا عنك</FormElm.Title>
                <input type="text"  {...register("fullName", { required: true })} placeholder="الاسم الكامل" />
                <input type="number" {...register("age", { required: true })} placeholder="العمر" />
                <input type="text" {...register("occupation", { required: true })} placeholder="المهنة" />
                <input type="text" {...register("city", { required: true })} placeholder="المدينة" />
                <select defaultValue="male" className="lap:text-xl *:tap:text-base *:text-xs  "  {...register("gender", { required: true })}   >
                    <option value="male" >ذكر</option>
                    <option value="female" >انثى</option>
                </select>
                <FormElm.Send />
            </form>
        </Layout>
    )
}
