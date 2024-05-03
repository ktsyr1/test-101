"use client" 
import { Ask, asksData } from "@/component/theme/FAQ"

export default function QA() {

    return (
        <div className="flex flex-col py-14  max-[697px]:p-4 p-20 bg-[#F0F0F0] pt-[100px] tap:pt-4 select-none justify-center items-center ">
            {/* add map */}
            <div className={`flex  items-center justify-center w-full flex-col h-max  max-w-[1000px] lap:max-w-[1360px]  xl:w-[1500px] `}>
                <b className="text-safety-700 mb-6 lap:text-6xl tap:text-3xl font-black max-[697px]:text-xl text-start w-full  ">أسئلة شائعة</b>
                <p className="  lap:text-xl tap:text-base font-semibold text-slate-500 max-[697px]:text-sm text-start  w-full  ">لقد أولينا المزيد من الاهتمام لتخصيص الإجابات أدناه، ولتسهيل الأمر عليك، قمنا بتصنيف الأسئلة لك</p>
                <div className=" w-full max-[697px]:p-1 justify-center">

                    {/* list QA */}
                    <div >
                        <b className="text-safety-700 lap:my-6 tap:my-4 my-2  flex lap:text-4xl tap:text-2xl text-lg font-black max-[697px]:text-xl text-start w-full  ">  مهندسين</b>
                        {asksData.eng.map(task => <Ask title={task.question} answer={task.answer} key={task.question} />)}
                        <b className="text-safety-700 lap:my-6 tap:my-4 my-2 flex lap:text-4xl tap:text-2xl text-lg  font-black max-[697px]:text-xl text-start w-full  ">  عملاء</b>
                        {asksData.client.map(task => <Ask title={task.question} answer={task.answer} key={task.question} />)}
                        <b className="text-safety-700 lap:my-6 tap:my-4 my-2 flex lap:text-4xl tap:text-2xl text-lg  font-black max-[697px]:text-xl text-start w-full  ">  عامة</b>
                        {asksData.public.map(task => <Ask title={task.question} answer={task.answer} key={task.question} />)}

                    </div>
                </div>
            </div>
        </div>
    )
}
