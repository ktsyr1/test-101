"use client"
import Logo from "@/component/theme/logo1"
import { Alert, message } from "antd"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import JsCookies from "js-cookie"
import { useRouter } from "next/navigation"
import { JobsApply } from "@/component/froms/get"
import { useState } from "react"
export default function JobsApplyPage({ searchParams: { id } }: any) {

    let route = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    // const { register, handleSubmit } = useForm<any>()
    let [SendEnable, setSendEnable] = useState(true)
    let [SendText, setSendText] = useState("تقديم الطلب")
    let [P, setP] = useState(false)
    let [Dane, setDane] = useState(false)

    const onSubmit: SubmitHandler<any> = (res) => {
        if (SendEnable) {
            setSendEnable(false)
            setSendText("جاري التقديم ...")
            const formData = new FormData();
            formData.append('FullName', res?.FullName);  // Firstname
            formData.append('Email', res?.Email);  // MiddleName
            formData.append('PhoneNumber', res?.PhoneNumber);  // LastName
            formData.append('Files', new Blob([res?.Files], { type: 'application/pdf' }), `CV${new Date().getTime()}.pdf`);    // Files
            formData.append('CareersID', id);  // PhoneNumber 

            JobsApply({ data: { formData } })
                .then(RES => {
                    if (RES.messages == "The job has been applied successfully.") {
                        setDane(true)
                        setSendText("تقديم الطلب")
                        setTimeout(() => route.push('/jobs'), 2000)
                    } else {
                        setSendEnable(true)
                        setSendText("تقديم الطلب")
                    }
                })
                .catch(error => console.error(error))
        }
    }
    function addCv(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) setP(true)
        else setP(false)

    }
    return (
        <form id="form" onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] m-auto p-4 mb-16 mt-32 flex flex-col j min-h-[400px] hover:shadow-lg rounded-2xl" >
            <Logo type="ar" className={"m-auto "} />
            <h1 className="text-3xl font-bold text-center my-4" >تقديم الطلب</h1>

            <p>الاسم الكامل *</p>
            <input type="text" {...register("FullName", { required: "يرجى إدخال الاسم الكامل" })} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            {errors.FullName && <p className="text-red-600">{errors.FullName.message as string}</p>}

            <p>الايميل *</p>
            <input
                type="email"
                {...register("Email", {
                    required: "يرجى إدخال البريد الإلكتروني",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "الرجاء إدخال بريد إلكتروني صحيح"
                    }
                })}
                placeholder="example@mail.com"
                className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4"
            />
            {errors.Email && <p className="text-red-600">{errors.Email.message as string}</p>}

            <p>رقم الهاتف *</p>
            <input
                type="text"
                {...register("PhoneNumber", {
                    required: "يرجى إدخال رقم الهاتف",
                    pattern: {
                        value: /^\d{6,15}$/,
                        message: "الرجاء إدخال رقم هاتف صحيح يتكون من 10 إلى 15 رقمًا"
                    }
                })}
                className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4"
            />
            {errors.PhoneNumber && <p className="text-red-600">{errors.PhoneNumber.message as string}</p>}

            <p>   السيرة الذاتية و المستندات ذات صلة </p>

            <div className="flex items-center justify-center w-full py-4">
                <label htmlFor="Files" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                    {!P ? <BoxFiles /> : <DaneFile />}
                    <input type="file" {...register("Files")} id='Files' className="hidden p-2 border-2 rounded-lg border-slate-300 px-6 my-4 h-12" multiple onChange={addCv} />
                </label>
            </div>
            {Dane && <Alert message="تم تقديم الطلب بنجاح" type="success" showIcon />}

            <input type="submit" className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} value={SendText} />
        </form>
    )
}

function DaneFile() {
    return (
        <div className='font-semibold h-full tap:min-h-[300px] min-h-[200px]  mt-32 text-center text-prussian-800 text-xl'>

            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className='m-auto my-4' xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_112_15605)">
                    <path d="M32.5427 62.3406C48.8469 62.3406 62.064 49.1235 62.064 32.8193C62.064 16.5152 48.8469 3.2981 32.5427 3.2981C16.2386 3.2981 3.02148 16.5152 3.02148 32.8193C3.02148 49.1235 16.2386 62.3406 32.5427 62.3406Z" fill="#4FC262" />
                    <path d="M32.5427 64.8193C14.8993 64.8193 0.542725 50.4652 0.542725 32.8193C0.542725 15.176 14.8993 0.819336 32.5427 0.819336C50.1886 0.819336 64.5427 15.176 64.5427 32.8193C64.5427 50.4652 50.1886 64.8193 32.5427 64.8193ZM32.5427 5.77671C17.6308 5.77671 5.5001 17.9075 5.5001 32.8193C5.5001 47.7312 17.6308 59.862 32.5427 59.862C47.4546 59.862 59.5854 47.7287 59.5854 32.8193C59.5854 17.9075 47.4546 5.77671 32.5427 5.77671Z" fill="#4FC262" />
                    <path d="M28.6759 44.5931C28.0117 44.5931 27.3771 44.3279 26.9086 43.852L17.7622 34.5569C16.8029 33.5802 16.8153 32.0137 17.7919 31.052C18.7686 30.0952 20.3376 30.1051 21.2968 31.0817L28.6041 38.5079L43.7217 21.8585C44.6462 20.8447 46.2128 20.7729 47.2216 21.69C48.2353 22.6096 48.3097 24.1761 47.3901 25.1924L30.5102 43.7825C30.0517 44.2881 29.4072 44.5806 28.7256 44.5955C28.7082 44.5931 28.6933 44.5931 28.6759 44.5931Z" fill="#F5F6F8" />
                </g>
                <defs>
                    <clipPath id="clip0_112_15605">
                        <rect width="64" height="64" fill="white" transform="translate(0.542725 0.819336)" />
                    </clipPath>
                </defs>
            </svg>
            <b className='text-xl text-green-600 py-8' >تم رفع الملف</b>
        </div>
    )
}
function BoxFiles() {
    return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">انقر للتحميل</span> أو اسحب وافلات</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX</p>
        </div>
    )
}