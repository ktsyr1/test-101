"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { createFatch } from "../froms/get";
import { useState } from "react";

export default function Consultation() {
    const { register, handleSubmit, formState: { errors } }: any = useForm<any>();
    let [se, setSe] = useState('اشتراك')
    let [Err, setErr] = useState<any>(null)
    let [forms, setF] = useState(false)
    let [Stap, setStap] = useState(1)
    let [Data, setData] = useState({})
    const onSubmit: SubmitHandler<any> = (res) => {
        if (Stap == 1) {
            setData({ ...res })
            setSe("جاري الارسال")
            setTimeout(() => {
                setStap(2)
                setSe("ارسال")
            }, 1000)
        } else {
            setSe("جاري الارسال")
            setErr(null)
            createFatch(`/Guest/ConsultationRequest`, { ...res, ...Data })
                .then((data: any) => {
                    if (data?.status) setStap(3)
                    else setErr("حدث خطاء في التقديم")
                })
        }
    }
    let FormView = () => (
        <form className={`flex w-full max-w-[400px] tap:mx-8 flex-col items-center text-start rtl ${Stap == 1 ? "-tap:flex-row" : ""}`} onSubmit={handleSubmit(onSubmit)}>
            {Stap == 1 && <div className={`flex flex-col my-2 w-full `}>
                <input className='p-3 rounded-md  text-slate-900' placeholder="example@mail.com" type="text" {...register("email", { required: "يرجى إدخال البريد الإلكتروني", pattern: { value: /^[A-Za-z0-9.+]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i, message: "الرجاء إدخال بريد إلكتروني صحيح" } })} />
                {errors["email"] && <p className="text-red-600 mb-4">{errors["email"]?.message}</p>}
            </div>}
            {Stap == 2 && <div className={`flex flex-col my-2 w-full `}>
                <input type="tel"  {...register('fullName', { required: 'يرجى إدخال الاسم', })} placeholder="الاسم" className='p-2 rounded-md text-slate-900' style={{ direction: "rtl" }} />
                {errors["fullName"] && <p className="text-red-600 my-4 font-bold">{errors["fullName"]?.message}</p>}
            </div>}
            {Stap == 2 && <div className={`flex flex-col my-2 w-full `}>
                <input type="tel"  {...register('phoneNumber', { required: 'يرجى إدخال رقم الهاتف', pattern: { value: /^05\d{8}$/, message: "يرجى التأكد من رقم الجوال" }, })} style={{ direction: "rtl" }} placeholder="رقم الجوال" className='p-2 rounded-md  text-slate-900' />
                {errors["phoneNumber"] && <p className="text-red-600 my-4 font-bold">{errors["phoneNumber"]?.message}</p>}
            </div>}

            {Err && <p className="text-red-600 mb-4">{Err}</p>}

            <input type="submit" className={`bg-safety-700 rounded-md mx-0 w-full   cursor-pointer hover:mx-1 p-3 my-2  max-w-[400px] ${Stap == 1 ? " -tap:w-28" : ""}`} value={se} />
        </form >
    )
    let Dane = () => (
        <div className="mx-8 p-4 rounded-lg   flex w-full tap:max-w-[500px] flex-row items-center" >
            <OK />
            <div className="mr-8">
                <b className='text-3xl text-white py-8' > تهانينا</b>
                <p className="items-center py-2 rounded-lg text-xl" >لقد قمت بالتسجيل بنجاح</p>
            </div>
        </div>
    )

    let DaneEnd = () => (
        <div className="mx-8 p-4 rounded-lg   flex w-full tap:max-w-[500px] flex-row items-center" >
            <OK />
            <p className="mx-3 p-4 rounded-lg items-center text-xl text-center" > سيتواصل معك فريقنا قريبًا للحصول على استشارة مجانية</p>
        </div>
    )
    return (
        <>
            <div id="Consultation" className="m-6 text-white select-none" >.</div>
            <div className="bg-white w-full max-w-[1000px] lap:max-w-[1360px] tap:m-20 m-2">
                <div className="border-4 border-safety-700 tap:rounded-xl tap:p-6 w-full p-3 rounded-none ">
                    <div className={`bg-gradient-to-l from-[#0694A2] to-[#003035] rounded-xl p-4 text-white   flex flex-col tap:flex-row ${Stap == 3 ? "justify-center" : "justify-between "} items-center`}>
                        {Stap == 1 && <h2 className="lap:text-4xl  p-2  w-full text-2xl text-center mb-4 tap:text-start tap:text-2xl  "> اشترك عبر البريد الإلكتروني <br />واحصل على استشارة مجانية </h2>}
                        {Stap == 2 && <Dane />}
                        {Stap == 3 ? <DaneEnd /> : <FormView />}
                    </div>
                </div>
            </div>
        </>
    )
}
function OK() {
    return (
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className='m-auto my-4' xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_112_15605)">
                <path d="M32.5427 62.3406C48.8469 62.3406 62.064 49.1235 62.064 32.8193C62.064 16.5152 48.8469 3.2981 32.5427 3.2981C16.2386 3.2981 3.02148 16.5152 3.02148 32.8193C3.02148 49.1235 16.2386 62.3406 32.5427 62.3406Z" fill="#fff" />
                <path d="M32.5427 64.8193C14.8993 64.8193 0.542725 50.4652 0.542725 32.8193C0.542725 15.176 14.8993 0.819336 32.5427 0.819336C50.1886 0.819336 64.5427 15.176 64.5427 32.8193C64.5427 50.4652 50.1886 64.8193 32.5427 64.8193ZM32.5427 5.77671C17.6308 5.77671 5.5001 17.9075 5.5001 32.8193C5.5001 47.7312 17.6308 59.862 32.5427 59.862C47.4546 59.862 59.5854 47.7287 59.5854 32.8193C59.5854 17.9075 47.4546 5.77671 32.5427 5.77671Z" fill="#fff" />
                <path d="M28.6759 44.5931C28.0117 44.5931 27.3771 44.3279 26.9086 43.852L17.7622 34.5569C16.8029 33.5802 16.8153 32.0137 17.7919 31.052C18.7686 30.0952 20.3376 30.1051 21.2968 31.0817L28.6041 38.5079L43.7217 21.8585C44.6462 20.8447 46.2128 20.7729 47.2216 21.69C48.2353 22.6096 48.3097 24.1761 47.3901 25.1924L30.5102 43.7825C30.0517 44.2881 29.4072 44.5806 28.7256 44.5955C28.7082 44.5931 28.6933 44.5931 28.6759 44.5931Z" fill="#0694A2" />
            </g>
            <defs>
                <clipPath id="clip0_112_15605">
                    <rect width="64" height="64" fill="white" transform="translate(0.542725 0.819336)" />
                </clipPath>
            </defs>
        </svg>
    )
}