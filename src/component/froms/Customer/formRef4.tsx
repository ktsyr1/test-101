"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported

// isGoodGeneralLayout >> "بشكل عام, كيف تقييم الموقع "| true == "جيد, كان كل شيء واضح "/ false == "يحتاج تحسينات"

//Page-4
// "isGoodGeneralLayout": false,
// "suggestImprovements": "should have light mode and dark mode",
export default function FormRef4() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [Err, setErr] = useState<any>(null)
    let [value, setValue] = useState<any>(data?.isGoodGeneralLayout || null)
    let list = [
        { text: "جيد, كان كل شيء واضح", value: true },
        { text: "يحتاج تحسينات", value: false }
    ]
    // let other = list.slice(0, -1).filter(x => x == value).length == 0

    const { register, handleSubmit, formState: { errors } }: any = useForm<any>({ defaultValues: data })

    const onSubmit: SubmitHandler<any> = (res) => {

        setErr("")
        if (typeof value == "boolean") {
            let model = { ...data, isGoodGeneralLayout: value }
            model["suggestImprovements"] = res?.suggestImprovements
            setData(model)
            setSelect(select + 1)
        } else setErr("حدد العنصر")
    }
    let Select = ({ one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one.value ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{one.text} </div>
    let SET = (a: any) => {
        setErr("")
        setValue(a)
    }
    return (
        <Layout slug={4}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px]  *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                <FormElm.Title >بشكل عام, كيف تقييم الموقع</FormElm.Title>
                <div className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14"  >
                    {list.map((a: any) => <Select value={value} one={a} key={a.text} onClick={() => SET(a.value)} />)}
                    {value == false && <textarea className="!w-full" {...register("suggestImprovements", { required: "قم بملاء العنصر  " })} defaultValue={data?.suggestImprovements} placeholder="حدد تلك التحسينات" />}
                </div>
                {errors["suggestImprovements"] && <p className="text-red-600 my-4">{errors["suggestImprovements"]?.message}</p>}

                {Err && <p className='p-4 text-red-600 w-full mx-4'>{Err}</p>}


                <FormElm.Send />
            </form>
        </Layout>
    )
}
