"use client"

import Link from "next/link";
import Icon, { IconArrow } from "../icons";
import { useState } from "react";

export default function OurClientsTestimonials() {
    let [one, setOne] = useState(clints[0])
    return (
        <div className=" flex flex-col items-center w-full bg-white pb-16">
            <div className=" flex flex-col items-center w-full lap:max-w-[1360px] max-w-[1000px] ">
                <Header />
                <div className=" flex flex-col items-center justify-center  w-full ">
                    <Gallery data={one} />
                    <hr className="border-2 border-safety-700 w-full mt-6" />
                    <div className="flex flex-row items-start my-4 w-full">
                        <IconArrow color={"#34d399"} className={"fill-emerald-400 rotate-180"} />

                        <div className="flex flex-row mx-2 justify-between w-full overflow-x-scroll lap:overflow-x-hidden  ">
                            {clints.map(clint => clint?.image ?
                                <img src={clint.image} alt={clint.name} loading="lazy" className={` mx-2 hover:shadow-lg rounded-2xl lap:h-[100px] h-[80px] hover:grayscale-0	cursor-pointer  hover:border-4 hover:border-safety-700  ${clint.name !== one.name && "grayscale"}  `} key={clint.image} onClick={() => setOne(clint)} />
                                : <p className={` mx-2 hover:shadow-lg rounded-2xl lap:h-[100px] h-[80px] p-4 hover:grayscale-0	cursor-pointer  hover:border-4 hover:border-safety-700 text-safety-700 tap:text-5xl text-3xl w-32 justify-center px-5 bg-[#F0F0F0] flex  items-center font-bold ${clint.name !== one.name && "grayscale"}  `} key={clint.name} onClick={() => setOne(clint)} >{clint.letter}</p>

                            )}
                        </div>
                        <IconArrow color={"#34d399"} className={"fill-emerald-400  "} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function Gallery({ data }: { data: OurClientsTestimonialsCardType }) {
    let [more, setMore] = useState(225)

    let body
    if (data.content.length > 225) body = <p className="tap:py-8 py-4 lap:text-xl text-base w-full" onClick={() => setMore(1000)} dangerouslySetInnerHTML={{ __html: `${data.content.slice(0, more)}...<b>اقراء المزيد</b>` }} />
    else if (data.content.length > 225) body = <p className="tap:py-8 py-4 lap:text-xl text-base w-full" onClick={() => setMore(1000)} dangerouslySetInnerHTML={{ __html: `${data.content.slice(0, more)}...<b>اقراء المزيد</b>` }} />
    else body = <p className="tap:py-8 py-4 lap:text-xl text-base w-full" dangerouslySetInnerHTML={{ __html: data.content }} />

    return (
        <div className="flex mt-4 px-8 flex-col justify-center lap:flex-row tap:flex-col tap:justify-center ">
            <div className="flex justify-center">

                <p className={`bg-[#F0F0F0] shadow-xl  flex font-bold h-[200px] items-center justify-center mx-2 px-5 rounded-3xl text-6xl text-center text-safety-700 tap:w-96 min-w-[250px] `}  >{data.letter}</p>
                <Icon.Coteshen className={'mt-[-33px] mr-[-50px] hidden md:flex m-4'} />
            </div>
            <div className="flex flex-col px-4">
                <div className="flex flex-row items-center tap:mb-8 w-full my-4 m-auto lap:mx-4 justify-between max-w-[500px]">
                    <h2 className="lap:px-4 text-xl font-bold text-safety-700  ml-10 ">{data.name}</h2>
                    <Rank data={data.rank} />
                </div>
                {body}
            </div>
        </div>
    )
}
function Rank({ data }: any) {
    let [list, setList] = useState([1, 2, 3, 4, 5])

    return (
        <div className="flex flex-row" >
            {list.map(a => <Icon.Star color={data >= a ? "#FFAE43" : "#DAE0E6"} key={a} />)}
        </div>
    )
}
interface OurClientsTestimonialsCardType {
    name: string;
    rank: number;
    content: string;
    image?: string;
    letter?: string;
}

function Header() {
    return (
        <div className="flex flex-row items-center justify-between px-4 mt-14 w-full">
            <h2 className="text-safety-700 lap:text-4xl font-bold  text-2xl max-[700px]:text-2xl ">شهادات عملائنا</h2>
            {/* <Link href="blog" className="flex flex-row justify-center items-center rounded-full px-4  " >
                <p className="lap:p-3 text-emerald-400 font-normal lap:text-2xl  text-lg  p-2 ">إقرأ المزيد </p>
                <IconArrow color={"#34d399"} className={"fill-emerald-400"} />
            </Link> */}
        </div>
    )
}
let clints: OurClientsTestimonialsCardType[] = [
    {
        name: "ماجد الرميح",
        rank: 5,
        content: "الخدمة اكثر من رائعة وفكرة جديدة ومفيدة جدا لتقييم المنزل الجديد او القائم، إستفدت من تقريرهم و كذلك من خبرات المهندسين. التقرير رائع ومفصل ويعطيك التكاليف اللازمة للإصلاح اذا احتجتها. أشكركم جدا على هذه الفكرة وكذلك على الخدمة المتميزة ",
        letter: "م"
    },
    {
        name: "نورا العتيبي",
        rank: 5,
        content: " تجربتبي جداً رائعة شركة متميزة وتعامل راقي ومهندسين رائعين ومحترفين كلاً في تخصصه وملتزمين بالوقت ، كان فحص جداً دقيق للڤيلا ، وتقرير شامل واضح ومفصل مع الحلول لكل مشكلة ، السعر مناسب جداً للخدمة المقدمة وللأجهزة الحديثة المستخدمة في الفحص. شكراً لكل العاملين في الشركة من موظفة التنسيق والحجوزات ،  شكراً للأستاذ ايمن ولجميع المهندسين وفقكم الله جهود جبارة وانصح الجميع بهذه الشركة وبقوة ",
        letter: "ن",
        // image: "/images/user/100.jpg",
    }, {
        name: "فهد الزهراني",
        rank: 5,
        content: "كلمتهم لفحص فلة جديدة قبل الشراء وللامانة كانوا مرنين معاي في المواعيد لاني اجلت الموعد اكثر من مره . حضروا للفلة ثلاث مهندسين قمة في الاحترام واحد مختص بالهيكل الانشائي والارضيات والعزل الحراري والمائي وواحد مختص بالكهرباء والثالث للسباكة. فحصوا الفلة من الى وقدمو لي تقرير عن حالة الفلة والايجابيات والسلبيات والقيمة التقديرية للاصلاحات. وبكل صراحة فتحو عيني على اشياء كثير كنت غافل عنها لما قررت اشتري الفلة        ",
        letter: "ف"
    }, {
        name: "عبدالله الخضيري",
        rank: 5,
        content: "تجربة جداً جداً جميلة ومهمة ، التعامل والإستقبال راقي ، طلبت منهم فحص فيلا قبل الشراء شامل كل العناصر ( الانشائي المدني - الميكانيكي - الكهربائي ) كلفوا فريق فحص من ٣ مهندسين  مختصين ووقفت معهم في الموقع مجهزين بأجهزة مختصة منها اختبار صلابة الخرسانة ومنها اجهزة حرارية لكشف الرطوبة واجهزة لفحص العزل الحراري وكاميرات تلسكوبية لفحص انابيب الصرف ودورات المياة وغيرها ، وكانوا دقيقين جداً جداً في الفحص واعطوني تقرير من ٨٠ صفحة مفصل فيه كل شي وجميع الملاحظات على الفيلا بالصور ، مع توضيح نوع الملاحظة وطريقة اصلاحها وتكلفت الإصلاح ، مما جعل لي هذا التقرير رؤية واضحة جداً عن الفيلا ، استفدت منه كثيراً ، انصح كل من يرغب بشراء عقار جاهز ان يتعامل معهم قبل ان يدفع مبالغ كبيرة في عقار قد تكون فيه عيوب مخفية تظهر لاحقاً ، شكراً لهم    ",
        letter: "ع"
    }, {
        name: "دلال سفيان",
        rank: 5,
        content: " رهيبين فعلاً يبردون القلب خدمتهم احترافية صدق ومريحين بشكل عجيب ما تلاحقهم ولا اي شيء عطوك كلهم خلاص اعتمدها ما يغيرون كلامهم ولا يلفون ويدورون وبالنسبه للسعر على الخدمة الخطيرة اللي يقدمونها اشوفه جداً جداً مناسب للامانه يعني واكثر شيء حبيته ١. انهم رجعوا فحصوا لي الخزان وهم جابوا الاداة اللي تفتح لان ما كانت موجودة عندي.  ٢. انه لو رممتوا البيت او عدلتوا الاخطاء يجون يشيكون على الشغل مجاناً بصراحه جبارين صدق 👍🏼👍🏼👍🏼",
        letter: "د"
    }, {
        name: "ليال فهد",
        rank: 5,
        content: "شركة ذات مصداقيه عاااالية وجدية في العمل ومتابعه في التقرير باجود الأدوات فريق عمل اكرمني الله بأن كان اختياري صحيح شكرا لكم وشكري للأستاذ أيمن خرجت بتقرير كامل عن المبنى سواء للشراء أو حتى لإثبات الحقوق القانونية",
        letter: "ل"
    }, {
        name: "نوره عبدالله",
        rank: 5,
        content: " ماشاء الله تبارك الرحمن.. ألف شكر لجهودكم ولعملكم وفحصكم الدقيق اللي شمل جميع ارجاء الفله وطريقة كتابة التقرير النهائي جدا واضحه ومفصله والحلول اللي تقدمونها للإصلاح والتعديل جدا مفيده وتختصر علي كثير من الوقت.. لكل مجال مهندس مختص فاهم كويس لشغله وينصحك بالأفضل، انصح وبشدة بالتعامل معهم مارح تندمون اطلاقاً.. يعطيكم العافيه وبارك الله في جهودكم وزادكم من فضله.. بالتوفيق للجميع. ",
        letter: "ن"
    },
]