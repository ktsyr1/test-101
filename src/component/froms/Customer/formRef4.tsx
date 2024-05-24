"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

export default function FormRef4() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.generalLayout || "")
    let list = ["جيد, كان كل شيء واضح", "يحتاج تحسينات"]
    let other = list.slice(0, -1).filter(x => x == value).length == 0

    const { handleSubmit } = useForm<any>({ defaultValues: data })

    const onSubmit: SubmitHandler<any> = (res) => {
        if (value?.length > 1) {
            setData({ ...data, generalLayout: value })
            setSelect(select + 1)
        }
    }

    return (
        <Layout slug={4}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >بشكل عام, كيف تقييم الموقع</FormElm.Title>
                {list.map(a => <FormElm.Select value={value} one={a} key={a} onClick={() => setValue(a)} />)}
                {other && <textarea className="!w-full" defaultValue={value} onChange={e => setValue(e.target.value)} placeholder="في موتمر او غيرها ..." />}
                <FormElm.Send />
            </form>
        </Layout>
    )
}
