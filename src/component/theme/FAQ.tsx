"use client"
import Btn from "../btns"
import { useState } from "react"
import Icon from "../icons"
import { usePathname } from 'next/navigation'
import FAQ from '@/data/FAQ.json'

type LayoutType = {
    children: JSX.Element
    slug: string
}

export default function QA() {
    let [part, setPart] = useState('client')
    const pathname = usePathname()

    const Layout = ({ children, slug }: LayoutType) => part === slug ? <>{children}</> : <></>
    if (pathname == "/FAQ") return <></>
    return (
        <div className="flex flex-col py-14  max-[697px]:p-4 tap:p-20 bg-[#F0F0F0]  select-none justify-center items-center  ">
            {/* add map */}
            <div className={`flex  items-center justify-center w-full flex-col h-max-xl:w-[1500px]  max-w-[1000px] lap:max-w-[1360px]`}>
                <b className="text-safety-700 mb-6 lap:text-6xl font-black  text-xl text-start w-full  tap:text-3xl  ">أسئلة شائعة</b>
                <p className="  lap:text-xl font-semibold text-slate-500  text-sm text-start  w-full   tap:text-lg">لقد أولينا المزيد من الاهتمام لتخصيص الإجابات أدناه، ولتسهيل الأمر عليك، قمنا بتصنيف الأسئلة لك</p>
                <div className=" w-full max-[697px]:p-1 justify-center">

                    <div className="flex flex-row bg-white max-w-[1000px] lap:max-w-[1360px] rounded-md p-1 m-4">
                        {dataBtns.map(btn => <Btn
                            key={btn.slug}
                            title={btn.title}
                            onClick={() => setPart(btn.slug)}
                            className={`rounded-md shadow-none cursor-pointer   hover:bg-safety-700 hover:text-white   !p-2 !m-1 text-sm max-[697px]:w-full w-full ${part === btn.slug ? "border-2 border-safety-700 text-safety-700 " : " text-slate-900 "}   `}
                        />)}
                    </div>

                    {/* list QA */}
                    <Layout slug="eng">
                        <>
                            {FAQ.filter(a => a.type == "eng").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="client">
                        <>
                            {FAQ.filter(a => a.type == "client").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>

                    <Layout slug="strategy">
                        <>
                            {FAQ.filter(a => a.type == "strategy").map(task => <Ask title={task.title} value={task.value} key={task.title} />)}
                        </>
                    </Layout>
                </div>
            </div>
        </div>
    )
}
type Asktype = {
    title: string,
    value: string[]
}
export function Ask({ title, value }: Asktype) {
    let [open, setOpen] = useState(false)

    function handleOpen() { setOpen(!open) }
    return (
        <div className="flex flex-col border-b-1 text-slate-700 w-full" >
            {/* ask */}
            <div className="flex flex-row justify-between w-full items-center cursor-pointer group" onClick={handleOpen}>
                <p className={`tap:text-xl lap:text-2xl font-medium text-[#1B2E45] text-sm max-w-[92%] py-6  group-hover:text-safety-700 ${open ? "!text-safety-700" : " "}  `}>{title}</p>
                {/* icon */}
                {open ? <Icon.arrowUp /> : <Icon.arrowDown />}
            </div>
            {/* anser */}
            <div className={`flex flex-col justify-between max-w-[90%]  text-xs  text-gray-500 font-medium tap:text-lg mt-2 ${!open ? "hidden" : "flex"}  `}>
                <ul> {value.map(a => <li className="list-disc">{a}</li>)} </ul>
                {/* icon */}
            </div>
        </div>
    )
}
export let asksData = {
    eng: [
        {
            "question": "ما هي المقومات الازمة لإنضمام الفاحص لإنسبكتكس؟",
            answer: "على الفاحص الراغب بالإنضمام لإنسبكتكس ان يكون حاصل على:شهادة البكالوريوس الهندسية في إحدى الإختصاصات التالية(مدني-ميكانيكي-كهربائي)-شهادة دورة فحص المباني الجاهزة من المعهد السعودي العقاري- حاصل على الإعتماد المهني من هيئة المهندسين السعوديين - وثيقة تأمين الأخطاء المهنية - يمتلك 3 سنوات خبرة على الأقل في مجال الفحص"
        },
        {
            "question": "كيف يتم تأهيل الفاحص للإنضمام إلى النظام ؟",
            answer: "بعد تقديم الفاحص يتم مراجعة الوثائق التي تم تزويدها، ومنحه الموافقة المبدئية، ومن ثم يتم تحديد موعد اختبار لقياس مدى ملائمته وخبراته، وعند تجاوزه للإختبار يتم الإلتحاق في ورشة عمل تهدف إلى تأهيله على استخدام تقنيات وأدوات الفحص، ومن ثم يتم منحه كلمة مرور إلى النظام الخاص بالتقييم لبدء تلقي الطلبات."
        },
        {
            "question": "ما هي مستويات الفاحصين ؟",
            answer: `من 0 - 6 أشهر = مهندس فاحص مبتدئ.
        من 6 - 12 شهر مع إتمام عدد 30 فحص فأكثر = مهندس فاحص متمرّس
        من 12 - 24 شهر مع إتمام 80 فحص = مهندس فاحص محترف`
        },
        {
            "question": "كيف أكون قائد فريق ؟",
            answer: "أن تكون مهندس مدني، خبرة في الفحص لا تقل عن 3 سنوات، تجاوز إختبار القبول والحصول على نسبة تتجاوز 90%."
        }
    ],
    client: [
        {
            "question": "لدي عميل يرغب بالخدمة، كيف يتم التعامل مع الطلب ؟",
            answer: "يقوم العميل بإدخال رقمك المرجعي كفاحص داخل خانة الخصومات عند إنشاء طلب الفحص، ليقوم النظام باحتساب خصم خاص لطالب الخدمة، وبحد أعلى 5%، ويتم منح الفاحص 5% من قيمة الفحص وفقاً للسياسات المعمول بها."
        },
        {
            "question": "ما هي الإجراءات المتبعة في حال تأخري عن موعد الفحص ؟",
            answer: "في حال تأخر الفاحص عن موعد الفحص مدة 5 - 10 دقائق، يتم خصم مبلغ 100 ريال. في حال تأخر الفاحص عن موعد الفحص مدة تزيد عن 10 د وحتى 15 دقيقة، يتم خصم مبلغ 200 ريال. عدم الحضور الكلي عن موعد الفحص يعني انسحاب الفاحص من النظام."
        }
    ],
    public: [
        {
            "question": "ما هي النسبة التي يحصل عليها الفاحص بعد إتمام عملية الفحص؟",
            answer: "تتكون عملية الفحص من فريق يضم 3 اختصاصات، يتحصّل الفريق على ما نسبته 55% من قيمة الفحص بعد اقتطاع الرسوم والضرائب، تكون حصص الفاحصين وفقاً للتالي: 1- المهندس المدني : 20% 2- مهندس الكهرباء : 15% 3- مهندس الميكانيك : 15% و5% إضافية على ما سبق لقائد الفريق."
        },
        {
            "question": "بماذا يؤثر مستوى الفاحص على النسبة المالية التي يتحصل عليها من الفحص ؟",
            answer: "كل مستوى يتحصّل على 5% إضافية من قيمة الفحص."
        },
        {
            "question": "كيف يتم سداد مستحقاتي المالية ؟",
            answer: "تظهر مستحقاتك المالية من خلال التطبيق، ويتم تحويل مبالغ الفاحصين مع نهاية كل شهر ميلادي، وبعد أن يكون مضى ما لا يقل عن أسبوع عن آخر تقرير تم تسليمه للعميل."
        }
    ]

}

let dataBtns = [
    { title: "أسئلة العملاء", slug: "client" },
    { title: "استراتيجيات الفحص", slug: "strategy" },
    { title: "أسئلة الفاحصين", slug: "eng" },
]



