"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported 

export default function FormRef5() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<any>(data?.informationFoundType)
    let list = [
        { i: 0, text: "لم أجد المعلومات التي أبحث عنها " },
        { i: 1, text: "سهل جدا" },
        { i: 2, text: "سهل" },
        { i: 3, text: "صعب" }
    ]
    const { handleSubmit, register } = useForm<any>({ defaultValues: data })

    const onSubmit: SubmitHandler<any> = (res) => { 
        if (typeof value == 'number') {
            let model = { ...data, informationFoundType: value }
            model["informationFoundProblem"] = res?.informationFoundProblem
            setData(model)
            setSelect(select + 1)
            
        }
    }
    let Select = ({ one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{list[one]?.text} </div>

    return (
        <Layout slug={5}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >   ما هي انطباعاتك العامة حول سهولة الوصول للمعلومات على هذا الموقع؟</FormElm.Title>
                {list.slice(1).map((a: any,) => <Select one={a.i} key={a} onClick={() => setValue(a.i)} />)}
                <Select one={0} onClick={() => setValue(0)} />
                {/* {list.slice(1).map(a => <FormElm.Select value={value} one={a} key={a} onClick={() => setValue(a)} />)} */}
                {value == 0 && <textarea className="!w-full" {...register("informationFoundProblem")} defaultValue={data?.informationFoundProblem} placeholder="ما هي تلك المعلومات؟" />}
                <FormElm.Send />
            </form>
        </Layout>
    )
}
