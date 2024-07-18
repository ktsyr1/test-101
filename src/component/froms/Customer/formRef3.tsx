"use client"

import { FormContext, FormDataContext } from "../contextApi";
import { useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form";

// end imported 

// enum EnumAccessChannelType {
//     Other = 0,
//     Instagram = 1,
//     SnapChat = 2,
//     Facebook = 3,
//     Twitter = 4,
//     LinkedIn = 5,
//     TikTok = 6,
//     Google = 7,
//     ThroughFriend = 8,
// }
// "accessChannelType": 0,
// "otherAccessChannels": "TV",

export default function FormRef3() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [Err, setErr] = useState<any>(null)
    let [value, setValue] = useState<number>(data?.accessChannelType)
    let list = ["آخر", "انستغرام", "سنابشات", "فيسبوك", "تويتر", " لينكد إن", "تيك توك", "جوجل", "عن طريق صديق"]

    const { handleSubmit, register } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        console.log(value);
        setErr("")

        if (value) {
            let model = { ...data, accessChannelType: value }
            model["otherAccessChannels"] = res?.otherAccessChannels

            setData(model)
            setSelect(select + 1)
            if (value == 0) ""
            else setErr("حدد العنصر")
        }
        let Select = ({ one, onClick, className }: any) => <div className={`p-4 rounded-full lap:text-base tap:text-sm text-xs  font-semibold ${value == one ? "bg-[#001D6C] text-white" : "text-[#001D6C] bg-white"} !pr-6 hover:shadow-lg ${className} `} onClick={onClick} >{list[one]} </div>
        let SET = (a: any) => {
            setErr("")
            setValue(a)
        }
        return (
            <Layout slug={3}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px]  *:w-full *:m-2 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-6" >
                    <FormElm.Title >كيف تعرفت على إنسبكتكس؟</FormElm.Title>
                    <div className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14"  >
                        {list.slice(1).map((a: any, i) => <Select one={i + 1} key={a} onClick={() => SET(i + 1)} />)}
                        <Select one={0} onClick={() => setValue(0)} />
                        {value == 0 && <input type="text" {...register("otherAccessChannels")} defaultValue={data?.otherAccessChannels} placeholder=" يرجى تحديد الطريقة" />}
                    </div>
                    {Err && <p className='p-4 text-red-600 w-full mx-4'>{Err}</p>}
                    <FormElm.Send />
                </form>
            </Layout>
        )
    }
}