"use client"
import Btn from "@/component/btns";
import Icon, { IconArrow } from "@/component/icons";
import { createContext, useContext, useState } from "react";

type ThemeContextType = any | null

const AppContext = createContext<ThemeContextType>({});

export default function Jobs() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] bg-slate-100" />
            <div className="  items-center   max-w-[1360px]   tap:w-full flex flex-col">
                <ListJobs />
            </div>
        </div>
    )
}


function ListJobs() {
    let [data, setData] = useState(CardJobData)
    let search = (e: any) => {
        let { value } = e.target
        let all = CardJobData.filter(a => a.job_title.search(value) >= 0)
        setData(all)
    }
    return (
        <AppContext.Provider value={{ data, setData, }} >
            <div className="my-10 bg-white">
                <div className=" items-center w-full max-w-[1360px]    m-auto flex flex-col">
                    {/* <form className="flex flex-row justify-center   tap:w-[80%] lap:w-full  ">
                        <Icon.search className={"ml-[-30px] z-10 m-4"} />
                        <input type="text" className="border-2  rounded-l-none  rounded-r-lg pr-10 w-full" placeholder="بحث" onChange={search} />
                        <input type="submit" value={"أبحث"} className="bg-safety-700 py-4 px-6 text-white rounded-l-lg " />
                    </form> */}
                    <div className="flex flex-col items-center m-auto w-[90%] tap:my-20 my-6" >
                        <h2 className="w-full text-start lap:text-5xl tap:text-3xl text-xl  font-bold text-safety-700 tap:mr-10 tap:mb-8 ">إنضم إلى فريقنا </h2>
                        <p className="text-slate-700 m-4 w-full lap:text-xl tap:text-base text-sm ">اكتشف فرص العمل المثيرة في Inspectex، حيث نقدر الموهبة والابتكار والشغف بخدمة العملاء. انضم إلى فريقنا وكن جزءًا من تشكيل مستقبل أكثر إشراقًا في المجال العماري و الهندسي</p>
                    </div>
                    <div className="w-full tap:w-[80%] lap:w-full">
                        {/* {data.length== 0&&  */}
                        <p className="w-full text-center m-4 min-h-[200px]">لا يتوفر حاليا أي فرص عمل، و سيتم نشرها على هذه الصفحة فور توافرها.</p>
                        {/* } */}
                        {/* {data.map(job => <CardJob data={job} key={job.job_title} />)} */}
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    )
}

type CardJobType = {
    job_title: string
    location: string
    department: string
    description: string
    qualifications: string[]
}
function CardJob({ data: One }: { data: CardJobType; }) {
    const { data, setData } = useContext(AppContext);
    let [open, setOpen] = useState(false)

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className="p-2 lap:p-4 w-full ">
            <div className={` w-full flex flex-col  rounded-3xl p-4 tap:p-6 lap:!m-10 cursor-pointer  ${open ? " bg-white shadow-lg " : " bg-prussian-800  hover:px-5 hover:tap:px-7 "}  `} onClick={() => setOpen(!open)}  >
                <p className={`${open ? "text-safety-700" : " text-white"} lap:text-2xl tap:text-lg text-lg`}>{One.job_title} </p>
                <div className={`flex flex-row ${open ? "*:text-white *:rounded-full *:bg-prussian-800" : " *:bg-white *:rounded-full *:text-prussian-800 "} `}>
                    <p className="p-4 py-2 my-4 w-full  lap:text-2xl tap:text-lg text-sx">{One.department} </p>
                    <p className="  p-4 py-2 m-4 w-max">{One.location} </p>
                </div>
                {open ? <>
                    <p className="text-safety-700  lap:text-3xl tap:text-xl text-base mt-8 mb-6">عن الوظيفة</p>
                    <p className="max-w-[1000px] lap:text-lg tap:text-lg text-sx mt-8 mb-6">{One.description} </p>
                    <p className="text-safety-700 text-3xl  mt-8 mb-6">المتطلبات والمؤهلات</p>
                    {One.qualifications.map(queueMicrotask => (
                        <div className="flex flex-row" key={queueMicrotask}>
                            <Icon.Bag size={20} className={'m-4'} />
                            <p className={'my-4'} >{queueMicrotask}</p>
                        </div>
                    ))}
                    <div onMouseEnter={enter} onMouseLeave={leave}>
                        <Btn title={"تقدم بالطلب"} to={"#"} childSort="end" className="bg-white m-20 rounded-full hover:bg-safety-700 hover:text-white *:hover:fill-white group border-2 border-safety-700 justify-between text-prussian-800"  >
                            <IconArrow color={"#032DA6"} className={'  *:group-hover:fill-white'} />
                        </Btn>
                    </div>
                </> : <></>}
            </div>
        </div >
    );
}
let CardJobData: CardJobType[] = [
    {
        "job_title": "مدير العلاقات",
        "location": "الدمام",
        "department": "الخدمات المصرفية للأفراد",
        "description": "كمدير علاقات في Inspectex، ستكون مسؤولاً عن تطوير العلاقات مع عملائنا الكرام والحفاظ عليها. ستحدد احتياجاتهم المالية بشكل استباقي وتقدم حلولًا مخصصة لمساعدتهم على تحقيق أهدافهم. نحن نبحث عن أفراد يتمتعون بمهارات اتصال ممتازة وفطنة مبيعات قوية وشغف لتقديم خدمة عملاء استثنائية.",
        "qualifications": [
            "درجة البكالوريوس في الأعمال أو المالية أو مجال ذي صلة",
            "خبرة لا تقل عن 3 سنوات في مجال المبيعات أو إدارة العلاقات في القطاع المصرفي",
            "سجل حافل بتحقيق أهداف المبيعات وتجاوزها",
            "مهارات ممتازة في التعامل مع الآخرين والتفاوض",
            "معرفة قوية بالمنتجات والخدمات المصرفية",
        ]
    }, {
        "job_title": "محلل المخاطر",
        "location": "الرياض",
        "department": "دارة المخاطر",
        "description": "كمحلل للمخاطر فيInspectex، ستلعب دورًا حيويًا في تحديد وتقييم المخاطر المحتملة لمؤسستنا. ستقوم بتحليل البيانات وإجراء تقييمات المخاطر وتطوير استراتيجيات للتخفيف من المخاطر. نحن نبحث عن أفراد مهتمين بالتفاصيل ويتمتعون بمهارات تحليلية قوية وفهم قوي لمبادئ إدارة المخاطر.",
        "qualifications": [
            "درجة البكالوريوس في المالية أو الاقتصاد أو مجال ذي صلة",
            "خبرة لا تقل عن سنتين في إدارة المخاطر أو دور مماثل",
            "الكفاءة في أدوات وتقنيات تحليل المخاطر",
            "مهارة قوية في التحليل وحل المشاكل",
            "المعرفة بالمتطلبات التنظيمية وأفضل ممارسات الصناعة",
        ]
    }, {
        "job_title": "أخصائي أمن تكنولوجيا المعلومات",
        "location": "الخير",
        "department": "تكنولوجيا المعلومات",
        "description": "باعتبارك متخصصًا في أمن تكنولوجيا المعلومات في Inspectex، ستكون مسؤولاً عن ضمان أمان وسلامة أنظمة المعلومات لدينا. ستقوم بتطوير وتنفيذ بروتوكولات الأمان وإجراء تقييمات الضعف والاستجابة للحوادث الأمنية. نحن نبحث عن أفراد يتمتعون بخلفية تقنية قوية ومعرفة بأفضل ممارسات الأمن السيبراني والالتزام بالحفاظ على سرية بيانات العملاء.",
        "qualifications": [
            "درجة البكالوريوس في علوم الكمبيوتر أو أمن المعلومات، أو مجال ذي صلة",
            "خبرة لا تقل عن 5 سنوات في مجال أمن تكنولوجيا المعلومات أو دور مماثل",
            "معرفة متعمقة ببروتوكولات وتقنيات أمان الشبكات",
            "الإلمام بالأطر التنظيمية مثل PCI DSS و GDPR",
            "يفضل الشهادات المهنية مثل CISSP أو CISM",
        ]
    }



] 