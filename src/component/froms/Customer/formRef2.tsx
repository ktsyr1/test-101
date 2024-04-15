"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

export default function FormRef2() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.typeUser || "")
    let list = ["زائر", "صاحب عقار", "مالك مكتب هندسي", "مطور عقاري", "فاحص", "مقاول", "مكتب عقاري"]

    const { handleSubmit } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {

        if (value?.length > 1) {
            setData({ ...data, typeUser: value })
            setSelect(select + 1)
        }
    }

    return (
        <Layout slug={2}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] *:w-[45%] *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14" >
                <FormElm.Title > هل انت </FormElm.Title>
                {list.map(a => <FormElm.Select value={value} one={a} key={a} onClick={() => setValue(a)} />)}
                <FormElm.Send />
            </form>
        </Layout>
    )
}
