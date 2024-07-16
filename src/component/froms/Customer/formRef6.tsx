"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

export default function FormRef6() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [value, setValue] = useState<any>(data?.problemType)
    let list = [ 
        { i: 0, text: "نعم، واجهت بعض الصعوبات في فهم متطلبات طلب الخدمة " },
        { i: 1, text: "كانت متطلبات طلب الخدمة واضحة ومباشرة" },
        { i: 2, text: "كان شرح متطلبات طلب الخدمة كافيًا، لكن يمكن تحسينه لجعله أكثر وضوحًا" },
    ]
    const { handleSubmit, register } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => { 
        if (typeof value == 'number') {
            let model = { ...data, problemType: value }
            model["problemDescription"] = res?.problemDescription
            setData(model)
            setSelect(select + 1)
        }
    }
    let Select = ({ one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{list[one]?.text} </div>

    return (
        <Layout slug={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >هل واجهت أي صعوبات في فهم خطوات طلب الخدمة؟</FormElm.Title> 
                {list.slice(1).map((a: any,) => <Select one={a.i} key={a} onClick={() => setValue(a.i)} />)}
                <Select one={0} onClick={() => setValue(0)} /> 
                {value == 0 && <textarea className="!w-full" {...register("problemDescription")} defaultValue={data?.problemDescription} placeholder="ما هي تلك الصعوبات؟" />}
                <FormElm.Send />
            </form>
        </Layout>
    )
}
