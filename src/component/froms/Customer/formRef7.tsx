"use client"

import { FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";
import { Surveys_Create } from "@/graphql/queries/surveies";
import { useMutation } from "@apollo/client";
import { message } from "antd";

// end imported

export default function FormRef7() {
    const [Create, { data: delData, loading, error }] = useMutation(Surveys_Create);


    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.suggest || "")

    const { handleSubmit } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        if (value?.length > 1) {
            let all = { ...data, suggest: value }
            let pram = { variables: { input: all } }
            setData(all)
            Create(pram)
                .then(res => message.success('تم ارسال الاستبيان'))
                .catch(error => message.error('حدث خطأ أثناء ارسال الاستبيان:', error));
        }
    }

    return (
        <Layout slug={7}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >هل واجهت أي صعوبات في فهم خطوات طلب الخدمة؟</FormElm.Title>
                <textarea className="!w-full !my-12" defaultValue={value} onChange={e => setValue(e.target.value)} placeholder="اقترح تحسينات..." />
                <FormElm.Send title="ارسال" />
            </form>
        </Layout>
    )
}
