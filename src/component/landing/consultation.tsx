"use client"
import { useState } from "react"
import Btn from "../btns";

export default function Consultation() {
    let [email, setEmail] = useState("")
    function SendEmail() {
        console.log(email);

    }

    return (
        <div className="bg-white w-full  max-w-[1360px] m-20  max-[700px]:m-2">
            <div className="border-4 border-safety-700 rounded-xl p-6 w-full  max-[700px]:p-3  max-[700px]:rounded-none ">
                <div className="bg-gradient-to-l from-[#0694A2] to-[#003035] rounded-xl p-4 text-white flex flex-wrap justify-between items-center">
                    <h2 className="text-4xl w-[280px] p-2 max-[700px]:w-full  max-[700px]:text-2xl  max-[700px]:text-center  max-[700px]:mb-4"> سجل و احصل على إستشارة مجانية </h2>
                    <form className="flex flex-col items-end  max-[700px]:w-full">
                        <input onChange={e => setEmail(e.target.value)} className="p-2 max-w-[400px]  w-full h-[50px] rounded-xl  max-[700px]:max-w-full"/>
                        <Btn title={"إشترك"} onClick={SendEmail} className="bg-safety-700 rounded-md mx-0  max-[700px]:w-full"  /> 
                    </form>
                </div>
            </div>
        </div>
    )
}