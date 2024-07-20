"use client"

import { FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";
import { message } from "antd";
import { createFatch } from "../get";
import { useRouter } from "next/navigation";

// end imported

export default function FormRef7() {

    let { data, setData } = useContext(FormDataContext)
    let route = useRouter()

    let [dane, setDane] = useState<any>(false)
    let [Err, setErr] = useState<any>(null)
    let [Send, setSend] = useState<any>("ارسال")
    const { register, handleSubmit, formState: { errors } }: any = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        setErr("")
        setSend("جاري الارسال ...")
        let model = data
        model["serviceRequestSuggestion"] = res?.serviceRequestSuggestion
        if (res?.serviceRequestSuggestion.length <= 1) setErr("هذا الطلب ضروري")
        else {
            createFatch("/Guest/Surveys", model)
                .then(res => {
                    if (res?.code == 200) {
                        message.success('تم ارسال الاستبيان')
                        sessionStorage.setItem("Surveys", new Date().getTime().toString())
                        setDane(true)
                        setSend("تم الارسال")
                        setTimeout(() => route.push("/"), 3000)
                    }
                })
                .catch(error => setErr('حدث خطأ أثناء ارسال الاستبيان'));
        }
        setSend("ارسال")
    }

    return (
        <Layout slug={7}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] *:w-full *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                {dane ? <div className="my-20 text-center">
                    <h1 className="text-green-700 font-bold text-3xl lap:text-6xl" > شكًرا على تعبئة االستبيان! </h1>
                    <p className="my-4 font-bold text-lg lap:text-xl"> سيتواصل معك فريقنا قريبًا للحصول على استشارة مجانية.</p>
                </div>
                    : <>
                        <FormElm.Title >كيف يمكننا تحسين تجربتك على الموقع؟ </FormElm.Title>
                        <textarea className="!w-full my-6" {...register("serviceRequestSuggestion", { required: "قم بملاء العنصر  " })} defaultValue={data?.serviceRequestSuggestion} placeholder="اقترح تحسينات" />
                        {errors["serviceRequestSuggestion"] && <p className="text-red-600 my-4">{errors["serviceRequestSuggestion"]?.message}</p>}

                        {Err && <p className='p-4 text-red-600 w-full mx-4'>{Err}</p>}
                        <FormElm.Send title={Send} />
                    </>}
            </form>
        </Layout>
    )
}
