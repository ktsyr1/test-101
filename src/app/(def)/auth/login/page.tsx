"use client"
import Logo from "@/component/theme/logo1"
import { useState } from "react"


export default function LoginPage() {
    let [data, setData] = useState({})
    const Send = () => {
        console.log(data); 
    } 
    return (
        <form id="form" className="max-w-[400px] m-auto p-4 mb-16 mt-32 flex flex-col j h-[500px] hover:shadow-lg rounded-2xl" >
            <Logo type="ar" className={"m-auto "} />
            <h1 className="text-3xl font-bold text-center my-4" >تسجيل الدخول</h1>
            <p>الايميل *</p>
            <input type="email" name="email" placeholder="user@mail.com" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" onChange={e => setData({ ...data, email: e.target.value })} />
            <p>كلمة السر *</p>
            <input type="password" name="password" placeholder="*********" className="p-2 border-2 rounded-lg border-slate-300 px-6 my-4" onChange={e => setData({ ...data, password: e.target.value })} />
            <div className={`!w-full bg-safety-700 my-6 text-white hover:shadow-lg p-2 text-center font-bold rounded-lg`} onClick={() => Send()} >تسجيل الدخول</div>
        </form>
    )
}