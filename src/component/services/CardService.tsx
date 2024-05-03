import Image from "next/image"
import { loaderProp } from "../lib"

type CardType = {
    data: {
        icon: string
        ar: string
        en: string
        i: any
        description: string
        report: string[]
        ReportingObjectives: string[]
    }
    type: string
    set: Function
}
// color en 
export default function CardService({ data, set, type }: CardType) {
    return (
        <div onClick={() => set(data)} className="flex flex-col items-center cursor-pointer *:hover:!fill-[#fff] shadow-sm hover:shadow-xl hover:border-2 hover:border-[#00A5A5] bg-white text-[#002D9C] w-[330px] justify-center rounded-3xl m-1 py-8 p-6 border-2" >
            <Image src={`/icons/gif/${data.icon}`} alt={data.ar} loading="lazy" width={90} height={90} className="m-4 mt-0" loader={loaderProp} />
            <p className="text-center text-xl font-bold">{data.ar}</p>
            <p className={`text-center  font-bold ${type === "page" ? "text-[#00A5A5]" : " "}`}>{data.en}</p>
        </div>
    )
}
