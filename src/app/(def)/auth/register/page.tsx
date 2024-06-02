
"use client"
import Logo from "@/component/theme/logo1";
import { useState } from "react";

export default function VerificationPage() {
    let [data, setData] = useState({})

    const Send = () => {
        
    }
    const upload = () => {
        
    }
    return (
        <form id="form" className="max-w-[400px] m-auto p-4 mb-16 mt-32 flex flex-col j h-full  shadow-lg rounded-2xl" >

            <Logo type="ar" className={"m-auto my-8"} />
            <h1 className="text-3xl font-bold text-center my-8 text-safety-700" >استكمال بيانات التسجيل</h1>
            <p>الاسم الكامل *</p>
            <input type="text" name="fullname" placeholder="Saad ..." onChange={e => setData({ ...data, fullname: e.target.value })} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>كلمة السر *</p>
            <input type="password" name="password" placeholder="*********" onChange={e => setData({ ...data, password: e.target.value })} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" />
            <p>  الصورة الشخصية </p>
            <input type="file" name="image" onChange={upload} className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" accept="image/png, image/gif, image/jpeg" />

            <div className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} onClick={() => Send()} >تسجيل </div>
        </form>
    )
}
