"use client"
import FormsCustomer from "@/component/froms/Customer/form";
import SizeBox from "@/component/size-box";

export default function Jobs() {
    return (
        <div className="flex flex-col">
            <div className="h-[100px] bg-slate-100" />
            <SizeBox className="   w-full flex flex-col my-10 bg-white">
                    <FormsCustomer /> 
            </SizeBox>
        </div>
    )
}
