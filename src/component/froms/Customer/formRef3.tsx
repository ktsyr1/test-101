"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported 

export default function FormRef3() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.AccessChannels || "")
    let list = ["انستغرام", "سنابشات", "فيسبوك", "تويتر", " لينكد إن", "تيك توك", "جوجل", "عن طريق صديق", "آخر"]
    let other = list.slice(0, -1).filter(x => x == value).length == 0
    console.log(other);

    const { handleSubmit } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {

        if (value?.length > 1) {
            setData({ ...data, accessChannels: value })
            setSelect(select + 1)
        }
    }

    return (
        <Layout slug={3}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-2 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >كيف عرفت عن إنسبكتكس؟</FormElm.Title>
                {list.map(a => <FormElm.Select value={value} one={a} key={a} onClick={() => setValue(a)} />)}
                {other && <input type="text" onChange={e => setValue(e.target.value)} defaultValue={value} placeholder="في موتمر او غيرها ..." />}
                <FormElm.Send />
            </form>
        </Layout>
    )
} 
