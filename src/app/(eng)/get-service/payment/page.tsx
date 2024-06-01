"use server"
import axios from "axios";
import { cookies } from 'next/headers'


export default async function GetService({ searchParams: { id } }: any) {
    let store = cookies()
    let userToken: any = store.get("userToken")
    if (userToken?.value) {
        let tran_ref: any = store.get("tran_ref")
        let { data } = await axios.get(`${process.env.NEXT_PUBLIC_apis}/payment/query?id=${id}&userToken=${userToken?.value}&tran_ref=${tran_ref?.value}`)

        return (
            <div className="flex flex-col justify-center items-center min-h-[600px]">
                {data.code == 400 && <p className="font-medium text-red-600 text-xl"> يؤسفنا إبلاغك بأن عملية الدفع لم تكن ناجحة.</p>}
                {data.code == 200 && <p className="font-medium text-green-500 text-xl"> {data?.messages}</p>}
            </div>
        )
    } else return (
        <div className="flex flex-col justify-center items-center min-h-[600px]">
            <p className="font-medium text-red-600 text-xl">لم تقم بتسجيل الدخول</p>
        </div>
    )
}
