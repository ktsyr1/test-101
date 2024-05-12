"use server"
import LoginApp from "@/component/auth";
import CheckCountService from "@/component/froms/service/counts";
import Forms from "@/component/froms/service/form";
import SizeBox from "@/component/size-box";
import axios from "axios";
import { cookies } from 'next/headers'


export default async function GetService({ searchParams: { id } }: any) {

    const cookieStore = cookies()
    const auth = cookieStore.get('tran_ref')
    let token = auth?.value || ""
    axios.get(`${process.env.NEXT_PUBLIC_apis}/payment/query?id=${"id"}`)
        .then(({ data }) => console.log(data))
    return (
        <div className="flex flex-col justify-center items-center">

        </div>
    )
}
