"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

export default function FormRef6() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.problem || "")
    let list = [
        "كانت متطلبات طلب الخدمة واضحة ومباشرة",
        "كان شرح متطلبات طلب الخدمة كافيًا، لكن يمكن تحسينه لجعله أكثر وضوحًا",
        "نعم، واجهت بعض الصعوبات في فهم متطلبات طلب الخدمة "
    ]
    let other = list.slice(0, -1).filter(x => x == value).length == 0
    const { handleSubmit } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {

        if (value?.length > 1) {
            setData({ ...data, problem: value })
            setSelect(select + 1)
        }
    }

    return (
        <Layout slug={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px]  *:w-[48%] *:m-2 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >هل واجهت أي صعوبات في فهم خطوات طلب الخدمة؟</FormElm.Title>
                {list.map(a => <FormElm.Select value={value} one={a} key={a} onClick={() => setValue(a)} />)}
                {other && <textarea className="!w-full" defaultValue={value !== list[-1] ? value : "."} onChange={e => setValue(e.target.value)} placeholder="هناك مشكلة في  ..." />}
                <FormElm.Send />
            </form>
        </Layout>
    )
}
