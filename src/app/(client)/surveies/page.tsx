"use client"
import FormsCustomer from "@/component/froms/Customer/form";
import SizeBox from "@/component/size-box";

export default function Jobs() {
    let title = " املاء الاستطلاع واحصل على استشارة مجانية"
    return (
        <div className="flex flex-col">

            <div className="h-[100px] bg-slate-100" />
            <SizeBox className="   w-full flex flex-col my-10 bg-white">
                <div className="   items-center   max-w-[1360px]    w-full flex flex-col">
                    <div className="flex flex-col  m-auto w-[90%] my-20 " >
                        <h2 className="  text-start lap:text-5xl tap:text-3xl text-xl font-bold text-safety-700  mb-8 ">{title} </h2>
                    </div>
                </div>
                <FormsCustomer />
            </SizeBox>
        </div>
    )
}
