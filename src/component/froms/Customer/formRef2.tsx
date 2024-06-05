"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

export default function FormRef2() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<string>(data?.guestType)
    let list = [
        { i: 1, text: "زائر" },
        { i: 2, text: "صاحب عقار" },
        { i: 3, text: "مالك مكتب هندسي" },
        { i: 4, text: "مطور عقاري" },
        { i: 5, text: "فاحص" },
        { i: 6, text: "مقاول" },
        { i: 7, text: "مكتب عقاري" }
    ]

    const { handleSubmit } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {

        if (value) {
            setData({ ...data, guestType: value + 1 })
            setSelect(select + 1)
        }
    }
    let Select = ({ value, one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one.i ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{one.text} </div>

    return (
        <Layout slug={2}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14" >
                <FormElm.Title > هل انت </FormElm.Title>
                {list.map((a: any) => <Select value={value} one={a} key={a.i} onClick={() => setValue(a.i)} />)}
                <FormElm.Send />
            </form>
        </Layout>
    )
}

