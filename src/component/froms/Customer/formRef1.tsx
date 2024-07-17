"use client"

import { useContext, useEffect, useState } from "react"
import { FormContext, FormDataContext } from "../contextApi";
import { useForm, SubmitHandler } from "react-hook-form"
import { FormElm, Layout } from "./form"
import GetFatch from "../get";
import { Field } from "../service/form";
// end imported

export default function FormRef1() {
    let { select, setSelect, } = useContext(FormContext)
    let { data, setData } = useContext(FormDataContext)
    let [gender] = useState<any>([
        { text: "ذكر", value: "1" },
        { text: "انثى", value: "2" }
    ])

    let [cities, setCities] = useState<any>(null)
    let [Err, setErr] = useState<any>(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({ defaultValues: data })
    const onSubmit: SubmitHandler<any> = (res) => {
        res.age = Number(res.age)
        res.cityId = Number(res.cityId)
        res.gender = Number(res.gender)

        if (!data?.gender) setErr("حدد الجنس")
        setData({ ...res })
        setSelect(select + 1)
    }
    useEffect(() => {
        async function get() {
            return GetFatch("/Lookup/Cities").then(data => setCities(data?.data))
        }
        get()
    }, [])
    let [selector, setSelector] = useState<any>(null)

    return (
        <Layout slug={1}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[1200px] tap:*:w-[45%] *:w-full *:m-4 *:p-2 *:rounded-lg  flex flex-wrap  justify-between mt-14" >
                <FormElm.Title >أخبرنا عنك</FormElm.Title>
                <input type="text"  {...register("fullName", { required: true })} placeholder="الاسم الكامل" />
                <input type="number" {...register("age", { required: true })} placeholder="العمر" />
                <input type="text" {...register("occupation", { required: true })} placeholder="المهنة" />
                <Select
                    selector={selector}
                    name={"cityId"}
                    setSelector={setSelector}
                    list={cities}
                    title={cities?.filter((A: any) => A?.value === data.cityId)[0]?.text || "حدد المدينة"}
                    set={(s: any) => setData({ ...data, "cityId": s.value })}
                // err={error?.realEstateAgesId}
                />
                <Select
                    selector={selector}
                    name={"gender"}
                    setSelector={setSelector}
                    list={gender}
                    title={gender?.filter((A: any) => A?.value === data.gender)[0]?.text || "حدد الجنس"}
                    set={(s: any) => setData({ ...data, "gender": s.value })}
                // err={error?.realEstateAgesId}
                />
                {Err && <p className='p-4 text-red-600'>{Err}</p>}

                <FormElm.Send />
            </form>
        </Layout>
    )
}

export function Select({ list = [], title, name, set, className, err, selector, setSelector }: any) {
    function onClick(e: any) {
        if (selector != name) setSelector(name)
        else setSelector("")
    }
    return (
        <div className={`  ${className}`}>
            <button onClick={onClick} className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 lap:text-xl tap:text-sm text-xs font-medium text-center text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-100 w-full rounded-lg`} type="button">
                {title}
            </button>
            {err?.text && <p className='p-4 text-red-600'>{err.text}</p>}

            <ul className={`${name != selector && "hidden"} py-2  text-sm text-gray-700 dark:text-gray-200 absolute bg-white   rounded-lg z-40 -tap:w-full w-[300px] max-w-[500px] max-h-[300px] overflow-y-scroll`}>
                {name == selector && list?.map((a: any) => (
                    <li key={a}>
                        <button type="button" onClick={(() => {
                            set(a);
                            setSelector("")

                            // m.current?.classList.toggle("hidden")
                        })} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white items-center" > {a.text} </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}
