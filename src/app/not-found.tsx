"use client"
import Btn from "@/component/btns";
import Icon, { IconHome } from "@/component/icons";
import { useRouter } from "next/navigation";

export default function Page404() {
    let route = useRouter()
    return (
        <div className="flex min-h-screen flex-col items-center h-full p-8  w-full justify-center  ">
            <Icon.found />
            <h1 className="flex justify-center flex-col items-center text-4xl mt-12 text-red-600  ">خطأ 404 </h1>
            <p className=" flex justify-center w-full  flex-col items-center max-w-[400px] text-center mt-5">تعذر العثور على الصفحة التي طلبتها، تعذر العثور على الصفحة المطلوبة , اما تم حذفها  او نقلها ، فيرجى الاتصال بالدعم. </p>
            <div className="flex flex-row mt-6 ">
                {/* add icon home */}
                <Btn title="الرجوع" to="/" className="border-futuristic-500 border-2 rounded-lg" childSort="start"  >
                    <IconHome />
                </Btn>
                <Btn title="محاولة مرة أخرى" onClick={() => route.refresh()} className="text-white bg-prussian-500 rounded-lg" />
            </div>
        </div>
    );
}

