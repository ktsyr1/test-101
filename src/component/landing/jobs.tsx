import Btn from "../btns";
import { IconArrow } from "../icons";
import SizeBox from "../size-box";
// hover btn
// bg mode white

export default function JobsPart({ className, title, to }: any) {
    return (
        <div className={`bg-slate-100  bg-[url(/images/bg-jobs.jpg)] bg-center w-full h-[940px] ${className} justify-center items-center flex max-[700px]:p-0 max-[700px]:m-0`}>
            {/* <div className="absolute bg-white h-full opacity-65 w-full z-10" >.</div> */}
            <SizeBox className="relative z-10 w-full h-[570px] rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none border-b-256 px-8 py-0 gap-8 max-[700px]:p-0 max-[700px]:m-0" >
                <div className="w-full m-auto flex flex-col justify-start rounded-3xl text-start my-16 max-[700px]:m-4">
                    <div className="flex flex-col rounded-t-3xl max-[700px]:flex-col-reverse" 
                    style={{ backgroundImage: 'linear-gradient(to left, #fff, #fff, #fff, #ff5c00)' }}
                    >
                        <div className="flex flex-col p-10 max-[700px]:p-6 max-[700px]:m-0">
                            <p className="text-safety-700 text-5xl max-[700px]:text-xl font-black">تقدم للعمل معنا وساهم في</p>
                            <p className="text-prussian-800 text-5xl max-[700px]:text-xl font-black mt-4">تطوير مستدام لخبراتك.</p>
                        </div>
                        <img src={"/images/jobs-koba.png"} loading="lazy" className="w-96 absolute mt-0 filter mr-10 max-[700px]:w-52 max-[700px]:relative m-auto left-4 max-[700px]:left-auto max-[700px]:mr-auto max-[700px]:mb-[-20px]" alt="" />
                    </div>
                    <div className="  bg-prussian-800 text-white p-4 rounded-b-3xl w-full flex justify-start max-[700px]:p-0 max-[700px]:m-0 ">
                        <div className="flex flex-col w-[50%] max-[700px]:w-full">
                            <p className="p-4 m-4 text-xl">كن امتدادًا لاحتياجات مجتمعك من أجل اتخاذ قرار مستنير يزيد من الأمان والوعي أثناء الصفقات العقارية.</p>
                            <Btn title={title ? title : "تعرف على آلية تقديم طلبات فرص العمل"} to={to ? to : "/join"} className="bg-white text-lg max-[700px]:text-sm !justify-between  text-prussian-800 rounded-full   max-[700px]:m-4" childSort="end" >
                                <IconArrow className={'fill-prussian-800'} />
                            </Btn>
                        </div>
                    </div>
                </div>
            </SizeBox>
        </div>
    )
} 