import Link from "next/link";
import { IconArrow } from "../icons";
import Btn from "../btns";

interface PostType {
    title: string;
    cat: string;
    shortContent: string;
    date: string;
    image: string;
    url: string;
    author: {
        image: string;
        name: string;
    }
}
enum CardType {
    full = "full"
    }
export default function BlogCard({ data, type }: { data: PostType, type?: CardType }) {
    return (
        <div className={`flex  m-4 shadow-sm hover:shadow-xl bg-white rounded-3xl flex-col lap:min-w-[350px] min-w-[250px] lap:max-w-[421px] max-w-[350px] w-full ${type === CardType.full&&" card/post "} ${type === CardType.full ? "flex-row-reverse" : "flex-col w-full"} `}>
            <img src={data.image} loading="lazy" alt={data.title} className={` rounded-t-3xl border-safety-700 w-full rounded-b-none card/w-[50%] ${type === CardType.full ? "w-[50%] rounded-l-3xl border-safety-700 border-r" : "rounded-t-3xl border-safety-700 border-b"}`} />
            <div className={`flex flex-col max-h-[432px] ${type === CardType.full ? "mt-[60px]" : ""} `}>

                <div className="flex flex-col mt-[-40px] mx-8">
                    <img src={data.author.image} alt={data.author.name} loading="lazy" className="rounded-full w-16" />
                    <b className="text-prussian-500 py-4 font-semibold lap:text-base text-sm">{data.author.name}</b>
                </div>
                <div className="flex flex-col p-4 pb-0">
                    <div className="flex flex-row w-full justify-end  mt-[-80px]   ">
                        <p className="text-white bg-teal-700 p-2 row-auto w-min px-8 rounded-md  font-medium text-sm">{data.cat}</p>
                    </div>
                    <b className="text-safety-700 lap:text-2xl text-lg font-extrabold lap:mt-8 mt-6 ">{data.title}</b>
                    <p className="lap:py-4 py-2 lap:text-base text-xs font-medium text-slate-500 overflow-hidden text-overflow-ellipsis lap:h-[66px] h-[57px] ">{data.shortContent}</p>
                    <p className="pt-4 lap:text-sm text-xs font-semibold w-full text-end text-prussian-500">{data.date}</p>
                </div>
                <Btn to={`/blog/${data.url}`} className="rounded-full border-2 border-safety-700 flex lap:px-8 px-6 text-prussian-600 justify-between shadow-none max-w-[400px] lap:text-xl text-base" childSort="end" title="إقرأالمزيد" >
                    <IconArrow />
                </Btn>
            </div>
        </div>
    )
} 