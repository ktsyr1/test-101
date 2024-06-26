"use server"
import LoginApp from "@/component/auth";
import CheckCountService from "@/component/froms/service/counts";
import Forms from "@/component/froms/service/form";
import { cookies } from 'next/headers'

export default async function GetService() {

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] w-full bg-slate-100" />
            <div className=" w-full flex flex-col   items-center max-w-[1200px] p-4 tap:max-w-[90%] ">
                <div className="mt-4  bg-white">
                    <div className=" flex items-center w-full max-w-[1360px]     flex-col">
                        <div className="flex flex-col items-center m-auto w-[90%] my-20 " >
                            <div className="flex tap:flex-row flex-col justify-between w-full mb-8 items-center" >
                                <h2 className="w-full text-start lap:text-5xl tap:text-4xl text-3xl my-4 font-bold text-safety-700 mr-10">طلب الخدمة </h2>
                                <CheckCountService />
                            </div>
                            {/* <p className="text-slate-700 m-4 w-full">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p> */}
                        </div>
                    </div>
                    <View />
                    <br />
                </div>
            </div>
        </div>
    )
}


function View() {
    const cookieStore = cookies()

    const auth = cookieStore.get('userToken')
    let loginTime: any = cookieStore.get('userloginTime')
    let token = auth?.value

    if (!token) return <LoginApp required={true} />
    else if (token?.length > 20 && loginTime != null) {
        let newData = new Date().getTime()
        let last = Number(loginTime.value)
        let s = (newData - last) / 60 / 1000

        if (s <= 40) return <Forms />
        else return <LoginApp required={true} />
    } else return <LoginApp required={true} />
}