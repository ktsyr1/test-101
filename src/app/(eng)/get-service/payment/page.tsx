"use server"
import GetFatch from "@/component/froms/service/sendpaymonet";
import axios from "axios";
import { cookies } from 'next/headers'


export default async function GetService({ searchParams: { id } }: any) {
    let store = cookies()
    let userToken: any = store.get("userToken")
    if (userToken?.value) {
        let tran_ref: any = store.get("tran_ref")
        let url = `/payment/query?id=${id}&userToken=${userToken?.value}&tran_ref=${tran_ref?.value}`
        let data = await GetFatch(url)
        return (
            <div className="flex flex-col justify-center items-center min-h-[600px]">
                <View data={data} />
            </div>
        )
    } else return (
        <div className="flex flex-col justify-center items-center min-h-[600px]">
            <p className="font-medium text-red-600 text-xl">لم تقم بتسجيل الدخول</p>
        </div>
    )
}

function View({ data }: any) {
    if (data.code == 400) return <p className="font-medium text-red-600 text-xl"> يؤسفنا إبلاغك بأن عملية الدفع لم تكن ناجحة.</p>
    if (data.code == 200) {
        if (data.data.payment_result.response_message == 'Cancelled') {
            return <p className="font-medium text-red-600 text-xl"> عملية الدفع تم الغائها.</p>
        } else return <p className="font-medium text-green-500 text-xl">  تم اتمام عملية الدفع بنجاح </p>

    }
}