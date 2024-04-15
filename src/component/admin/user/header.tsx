"use client"
import Btn from "@/component/btns"

import { useState } from "react"
export default function AdminUsersHeader() {
    let [invit, setInvit] = useState(false)

    return (
        <    >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl"  >المستخدمين</h1>
                <Btn onClick={() => setInvit(!invit)} title="دعوة مسؤول" className="text-white bg-prussian-800 hover:bg-white hover:text-prussian-800 border-2 hover:border-prussian-800 rounded-xl" />
            </div>
            {invit && <div className="w-full max-w-[500px] absolute bg-white rounded-xl p-4 shadow-xl z-30" >
                <p className="font-semibold text-lg">دعوة مسؤول</p>
                <div className="w-full flex flex-row mx-0">
                    <input className="w-full m-4 p-4 mr-0 border-2 border-slate-800 rounded-lg " type="text" placeholder="info@gmail.com" />
                    <Btn onClick={() => setInvit(false)} title="دعوة " className="text-white bg-prussian-800 hover:bg-white hover:text-prussian-800 border-2 hover:border-prussian-800 rounded-xl" />
                </div>
            </div>}
        </>
    )
}  