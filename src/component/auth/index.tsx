"use client"
import Logo from "@/component/theme/logo1"
import Cookies from "js-cookie"
import { createContext,   useContext, useEffect, useState } from 'react';
import Login from "./login"
import OTP from "./OTP"
import SignUp from "./SignUp"
// Create a context for the authentication state
export const AuthContext = createContext({});
/* This code snippet defines a functional component called `LoginApp` in TypeScript with React. Here's
a breakdown of what the code is doing: */

export default function AuthApp({ userType = 2, required }: any) {

    const authContext = useContext(AuthContext);
    type TitleType = "login" | "Register" | "OTP"  
    let [mode, setMode] = useState<TitleType>("login")
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        let cookie = Cookies.get("userToken")
        if (required) setLoading(false)
        else if (!cookie || cookie.length < 20) setLoading(false)
    }, [])
    let title: Record<TitleType, string> = {
        login: "تسجيل الدخول",
        Register: "إشتراك",
        OTP: "التحقق من الايميل",
    }
    function View() {
        if (mode === "login") return <Login route={setMode} required={required} />
        if (mode === "Register") return <SignUp route={setMode} />
        if (mode === "OTP") return <OTP route={setMode} />
        else return <></>
    }

    if (loading) return <></>
    else return (
        <AuthContext.Provider value={authContext}>
            <div className="max-w-[400px] m-auto p-4 mb-16 mt-16 flex flex-col j min-h-[500px] w-full shadow-lg rounded-2xl" >
                <Logo type="ar" className={"m-auto "} />
                <h1 className="text-3xl font-bold text-center my-4 text-safety-700  " >{title[mode]}</h1>
                <View />
            </div>
            {mode != "OTP" &&
                <div className={`!w-full max-w-[400px] cursor-pointer m-auto border-safety-700 border-2 my-6 text-safety-700  hover:shadow-lg p-2 text-center font-bold rounded-lg`} onClick={() => setMode(mode === "login" ? "Register" : "login")}  >{title[mode === "login" ? "Register" : "login"]}</div>}
        </AuthContext.Provider>
    )
}
