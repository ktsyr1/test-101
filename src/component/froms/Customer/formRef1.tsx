"use client"

import { useContext, useEffect, useState } from "react"
import { FormContext, FormDataContext } from "../contextApi";
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form"
import GetFatch from "../get";
// end imported

export default function FormRef1() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [cities, setCities] = useState<any>([])

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        res.age = Number(res.age)
        res.cityId = Number(res.cityId)
        res.gender = Number(res.gender)

        setData({ ...res })
        setSelect(select + 1)
    }
    useEffect(() => {
        async function get() {

            return GetFatch("/Lookup/Cities").then(data => setCities(data?.data))
        }
        get()
    }, [])

    return (
        <Layout slug={1}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14" >
                <FormElm.Title >أخبرنا عنك</FormElm.Title>
                <input type="text"  {...register("fullName", { required: true })} placeholder="الاسم الكامل" />
                <input type="number" {...register("age", { required: true })} placeholder="العمر" />
                <input type="text" {...register("occupation", { required: true })} placeholder="المهنة" />
                {/* <input type="text" {...register("city", { required: true })} placeholder="المدينة" /> */}
                <select defaultValue="المدينة" className="lap:text-xl *:tap:text-base *:text-xs  "   {...register("cityId", { required: true })}   >
                    {cities?.map((city: any) => <option value={Number(city.value)} key={city.value} >{city.text}</option>)}
                    {/* <option value="female" >انثى</option> */}
                </select>
                <select defaultValue="male" className="lap:text-xl *:tap:text-base *:text-xs  "  {...register("gender", { required: true })}   >
                    <option value={1} >ذكر</option>
                    <option value={2} >انثى</option>
                </select>
                <FormElm.Send />
            </form>
        </Layout>
    )
}
