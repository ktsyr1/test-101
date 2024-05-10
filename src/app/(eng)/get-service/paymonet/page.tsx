"use server"
import LoginApp from "@/component/auth";
import CheckCountService from "@/component/froms/service/counts";
import Forms from "@/component/froms/service/form";
import SizeBox from "@/component/size-box";
import { cookies } from 'next/headers'


export default async function GetService() {
    const cookieStore = cookies()
    const auth = cookieStore.get('userToken')
    let token = auth?.value || ""

    return (
        <div className="flex flex-col justify-center items-center">

        </div>
    )
}
