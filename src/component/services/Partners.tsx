
import Image from "next/image";

// icons Partners
export default function Partners() {
    return (
        <div className="bg-prussian-800 w-full min-h-96 py-40" >
            <h2 className="w-full text-center text-6xl text-white  mt-20">شركاؤنا</h2>
            <div className="flex flex-wrap justify-center items-center my-8 ">
                {list.map(card => <SubPartner data={card} key={card.title} />)}
            </div>
        </div>
    )
}
type typeSubPartner = {
    data: {
        title: string
        image: string
    }
}
function SubPartner({ data }: typeSubPartner) {
    return (
        <div className="bg-white w-44 rounded-2xl p-2 text-center flex flex-col py-6 justify-center items-center m-2 h-[220px]">
            {/* icon */}
            <Image src={`${data.image}` || "house.png"} alt={data.title} width={90} height={90} className="m-auto mb-2" />

            <p className="text-safety-500 my-4 text-lg font-bold" >{data.title} </p>
        </div>
    )
}
let list = [
    {
        "title": "الموردون و المصنعون لخامات التشييد",
        image: "/icons/bricks.png"
    },
    {
        "title": "مختبرات فحص التربة والخرسنة",
        image: "/icons/architecture.png"
    },
    {
        "title": "مكاتب الاستشارات الهندسية",
        image: "/icons/gif/blueprint.gif"
    },
    {
        "title": "المكاتب العقارية",
        image: "/icons/gif/real-estate-agent.gif"
    },
    {
        "title": "المقاولون",
        image: "/icons/insurance.png"
    },
    {
        "title": "المكاتب الفنية",
        image: "/icons/budgeting.png"
    },
    {
        "title": " المهندسون المستقلون",
        image: "/icons/repair-tools.png"
    },
]
