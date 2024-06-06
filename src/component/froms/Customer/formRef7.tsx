"use client"

import { FormDataContext } from "../contextApi";
import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";
import { message } from "antd";
import { createFatch } from "../get";
import { useRouter } from "next/navigation";

// end imported

export default function FormRef7() {

    let { data, setData } = useContext(FormDataContext)
    let route = useRouter()

    const { handleSubmit, register } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        let model = data
        model["serviceRequestSuggestion"] = res?.serviceRequestSuggestion
        createFatch("/Guest/Surveys", model)
            .then(res => {
                if (res?.code == 200) {
                    message.success('تم ارسال الاستبيان')
                    route.push("/")
                }

            })
            .catch(error => message.error('حدث خطأ أثناء ارسال الاستبيان:', error));
    }

    return (
        <Layout slug={7}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >هل واجهت أي صعوبات في فهم خطوات طلب الخدمة؟</FormElm.Title>
                <textarea className="!w-full my-6" {...register("serviceRequestSuggestion")} defaultValue={data?.problemDescription} placeholder="اقترح تحسينات..." />
                <FormElm.Send title="ارسال" />
            </form>
        </Layout>
    )
}
