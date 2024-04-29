
import Logo from "@/component/theme/logo1";
import Image from "next/image";
import SizeBox from "../size-box";

// icons Partners
export default function ServiceRequestMechanism() {

    return (
        <SizeBox className="flex flex-col w-full min-h-[200px] my-8  " >
            <TitlePart title="آلية العمل" className="mt-[50px] !w-full" />

            <div className="  w-full m-auto ">
                {list.map(item => <CardServiceRequestMechanism data={item} key={item.title} />)}
            </div>
        </SizeBox>
    )
}

export function TitlePart({ title, className }: { title: string, className?: string }) {
    return (
        <div className={`flex flex-row items-center m-auto w-full my-10`} >
            <Logo type="semple" />
            <h1 className="w-full text-start text-5xl font-bold text-safety-700 mr-10  ">{title}</h1>
        </div>
    )
}
// add images
type typeCardServiceRequestMechanism = {
    data: {
        title: string
        icon: string
        rtl: boolean
        about: string
        notes?: string
    },
}

function CardServiceRequestMechanism({ data }: typeCardServiceRequestMechanism) {
    return (
        <div className={`flex ${data.rtl ? " flex-row " : "flex-row-reverse"} w-full border-2 border-prussian-100 bg-white p-8 md:px-40 md:py-8  m-auto my-6 shadow-sm hover:shadow-lg mx-auto rounded-[50px] justify-center`} >
            <div className="flex flex-col justify-center w-full">
                <b className="text-3xl text-prussian-800 py-4">{data.title}</b>
                <p className=" text-xl text-gray-700">{data.about}</p>
                {data?.notes ? <p className="text-red-600 py-4 text-xl" dangerouslySetInnerHTML={{ __html: data?.notes }} /> : <></>}
            </div>
            <img src={`/icons/${data.icon}` || "house.png"} alt={data.title} className="w-72 mx-6" loading="lazy"  />

        </div>
    )
}

let list = [
    {
        title: "طلب الخدمة ",
        icon: "click.png",
        rtl: true,
        about: "يمكنك طلب خدمة الفحص المناسبة للاحتياجات من خلال الموقع الالكتروني او من خلال التواصل مباشرة معنا على ارقامنا",
    }, {
        title: "معالجة الطلب ",
        icon: "stylzd_hand_3.png",
        rtl: false,
        about: "معالجة الطلب بإسناد للفاحصين المتاحين , وتأكيد موعد الفحص يكون من خلال فرقة الفحص",
    }, {
        title: "عملية الفحص ",
        icon: "Location.png",
        rtl: true,
        about: "يصل فريقنا باموعد ومن ثم الشروع في عملية الفحص التي تستتلزم بمتوسط 3 ساعات , و التي من خلالها تغطية جميع مكونات وأنظمة العقار",
        notes: " ملاحظة: \n بإمكانكم تتبع فريقنا قبل وصوله من خلال خرائط جوجل",
    }, {
        title: "أصدار التقرير ",
        icon: "lIST.png",
        rtl: false,
        about: " وهي المرحلة النهائية , التي تعكس نتائج الفحوص والبيانات المجمعة من خلال الفاحصين  \n   يستغرق التقرير 3 ايام عمل بعد الإنتهاء من عملية الفحص . ( تسليم التقرير يتم من خلال رابط الكتروني برسالة نصية أو من خلال حسابك على التطبيق )",
    },
] 
