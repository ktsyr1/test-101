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
        <div className="flex flex-col">
            <div className="h-[100px] bg-slate-100" />
            <SizeBox className=" w-full flex flex-col max-[1000px]:!m-0">
                <div className="mt-10 bg-white">
                    <SizeBox className="  max-[1000px]:!m-0 w-full flex flex-col">
                        <div className="flex flex-col items-center m-auto w-[90%] my-20 " >
                            <div className="flex flex-row justify-between w-full mb-8 items-center" >

                                <h2 className="w-full text-start lap:text-5xl tap:text-3xl text-2xl font-bold text-safety-700 mr-10">طلب الخدمة </h2>
                                <CheckCountService />
                            </div>
                            <p className="text-slate-700 m-4 w-full">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p>
                        </div>
                    </SizeBox>
                    {/* <LoginApp /> */}
                    {/* <Forms /> */}
                    {token?.length > 20 ? <Forms /> : <LoginApp />}
                    <br />
                </div>
            </SizeBox>
        </div>
    )
}
