"use client"
import AuthApp from "@/component/auth"
import Forms from "./form"
import cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function AuthGetServise() {
    let [Loading, setLoading] = useState(false)
    const token = cookies.get('userToken')
    let loginTime: any = cookies.get('userloginTime')
    useEffect(() => setLoading(true), [])
    if (!Loading) return <div className="loader m-auto my-48  border-[6px] border-safety-700 "></div>
    else {
        if (!token) return <AuthApp required={true} />
        else if (token?.length > 20 && loginTime != null) {
            let newData = new Date().getTime()
            let last = Number(loginTime)
            let s = (newData - last) / 60 / 1000

            if (s <= 40) return <Forms />
            else return <AuthApp required={true} />
        } else return <AuthApp required={true} />
    }
}