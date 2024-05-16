"use client"
import { message } from "antd";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Consultation() {
    const { register, handleSubmit } = useForm<any>()

    const onSubmit: SubmitHandler<any> = (res) => {
        axios.post(`/api/admin/emailnews`, res)
            .then(() => message.success('تم إرسال البريد الإلكتروني بنجاح'))
    }
    return (
        <>
            <div id="Consultation" className="m-6 text-white select-none" >.</div>
            <div className="bg-white w-full     max-w-[1000px] lap:max-w-[1360px] tap:m-20 m-2">
                <div className="border-4 border-safety-700 tap:rounded-xl tap:p-6 w-full p-3 rounded-none ">
                    <div className="bg-gradient-to-l from-[#0694A2] to-[#003035] rounded-xl p-4 text-white flex flex-wrap justify-between items-center">
                        <h2 className="lap:text-4xl lap:w-[350px] p-2  w-full text-xl text-center mb-4  tap:w-[200px] "> سجل و احصل على إستشارة مجانية </h2>
                        <form className="flex tap:flex-row w-full tap:max-w-[500px] flex-col items-center " onSubmit={handleSubmit(onSubmit)}>
                            <input type="email" {...register("email")} className="p-2 lap:w-[500px] w-full h-[50px] rounded-xl mx-4 max-w-[400px] text-[#032DA6]" required />
                            <input type="submit" className="bg-safety-700 rounded-md mx-0 w-full tap:max-w-[100px] cursor-pointer hover:mx-1 p-3 my-2  max-w-[400px] " />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}