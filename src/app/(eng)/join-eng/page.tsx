"use server"
import Forms from "@/component/froms/eng/form";
import SizeBox from "@/component/size-box";

export default async function Jobs() {

    return (
        <div className="flex flex-col">
            <div className="h-[100px] bg-slate-100" />
            <SizeBox className="   w-full flex flex-col">
                <div className="my-10 bg-white">
                    <SizeBox className="   w-full flex flex-col">
                        <div className="flex flex-col items-center m-auto w-[90%] my-20 " >
                            <h2 className="w-full text-start text-5xl font-bold text-safety-700 mr-10 mb-8 ">إنضم إلى فريقنا كمهندس </h2>
                            <p className="text-slate-700 m-4 w-full">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p>
                        </div>
                    </SizeBox>

                    <Forms />
                </div>
            </SizeBox>
        </div>
    )
}
