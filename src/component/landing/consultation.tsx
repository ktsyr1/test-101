"use client"
import { useState } from "react"
import Btn from "../btns";

export default function Consultation() {
    let [email, setEmail] = useState("")
    function SendEmail() {
        console.log(email);

    }

    return (
        <div className="bg-white w-full  max-w-[1360px] m-20">
            <div className="border-4 border-safety-700 rounded-xl p-6 w-full">
                <div className="bg-gradient-to-l from-[#0694A2] to-[#003035] rounded-xl p-4 text-white flex flex-wrap justify-between items-center">
                    <h2 className="text-4xl w-[280px] p-2"> سجل و احصل على إستشارة مجانية </h2>
                    <form className="flex flex-col items-end">
                        <input onChange={e => setEmail(e.target.value)} className="p-2 max-w-[400px] w-full h-[50px] rounded-xl"/>
                        <Btn title={"إشترك"} onClick={SendEmail} className="bg-safety-700 rounded-md mx-0"  /> 
                    </form>
                </div>
            </div>
        </div>
    )
}