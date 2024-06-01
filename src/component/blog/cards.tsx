'use client'
import Icon, { IconArrow } from "../icons";
import Btn from "../btns";
import { useState } from "react";
import postsData from "@/data/posts.json"
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";



enum CardType {
    full = "full"
}
export default function BlogCard({ data, type }: any) {
    let author = data.author.node
    let cat = data.categories.nodes

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className={`flex  m-4 shadow-sm hover:shadow-xl bg-white rounded-3xl flex-col lap:min-w-[350px] min-w-[250px]   w-full ${type === CardType.full && " card/post "} ${type === CardType.full ? "tap:flex-row-reverse" : "flex-col w-full max-w-[350px] lap:max-w-[421px]"} `}>
            <img src={data?.featuredImage?.node?.mediaItemUrl} loading="lazy" alt={data.title} className={` rounded-t-3xl min-h-[200px] bg-slate-100 border-safety-700 w-full rounded-b-none card/w-[50%] ${type === CardType.full ? "w-[50%] rounded-l-3xl border-safety-700 border-r" : "rounded-t-3xl border-safety-700 border-b"}`} />
            <div className={`flex flex-col max-h-[432px] ${type === CardType.full ? "mt-[60px]" : ""} `}>
                <div className="flex flex-col mt-[-40px] mx-8">
                    <img src={author?.avatar.url} alt={author.avatar.name} loading="lazy" className="rounded-full w-16 min-h-16" />
                    <b className="text-prussian-500 py-4 font-semibold lap:text-base text-sm">{author.name}</b>
                </div>
                <div className="flex flex-col p-4 pb-0">
                    <div className="flex flex-row w-full justify-end  mt-[-80px]   ">
                        <p className="text-white bg-teal-700 p-2 row-auto w-min px-8 rounded-md  font-medium text-sm">{cat[0].name}</p>
                    </div>
                    <b className="text-safety-700 lap:text-2xl text-lg font-extrabold lap:mt-8 mt-6 ">{data.title}</b>
                    <p className="lap:py-4 py-2 lap:text-base text-xs font-medium text-slate-500 overflow-hidden text-overflow-ellipsis lap:h-[66px] h-[57px] ">{data.excerpt}</p>
                    <p className="pt-4 lap:text-sm text-xs font-semibold w-full text-end text-prussian-500">{data.date.split("T")[0]}</p>
                </div>
                <div onMouseEnter={enter} onMouseLeave={leave}>
                    <Btn to={`/blogs/${data.slug}`} className="rounded-full border-2 border-safety-700 flex lap:px-8 px-6 text-prussian-600 justify-between shadow-none max-w-[400px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end" title="إقرأالمزيد" >
                        <IconArrow color={btnHover ? "#fff" : "#032DA6"} />
                    </Btn>
                </div>
            </div>
        </div>
    )
}

export function Content({ data }: any) {

    let [posts, setPosts] = useState(Array.from([0, 1, 2, 4, 5, 6].map(a => postsData[0])));
    let [limit, setLimit] = useState(3)

    return (
        <div className=" flex flex-col items-center w-full   pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <div className=" flex flex-col items-center justify-center  w-full ">
                    {/* <BlogCard data={posts[0]} type={CardType.full} /> */}
                    <div className="flex flex-wrap items-center justify-center">
                        {data.length == 0 && <div className="flex flex-wrap items-center justify-center min-h-[200px]" > لا تتوفر نتائج  </div>}
                        {data?.map((post: any) => <BlogCard data={post} key={post?.title} />)}
                    </div>
                    {data.length > 3 && <button type="button" className="flex flex-row text-safety-700 justify-center text-base font-semibold items-center mt-9" onClick={() => setLimit(limit + 3)} >
                        <p>المزيد من المقالات</p>
                        <Icon.arrowDown className={`border-2 rounded-full border-safety-700 mx-4 w-8 h-8 p-1 `} color={"#FF5C00"} />
                    </button>}
                </div>
            </div>
        </div>
    )
}

export function SearchBlog() {

    let route = useRouter()
    const { register, handleSubmit } = useForm()
    const onSubmit: SubmitHandler<any> = (res) => {
        console.log(res);
        route.push(`/blogs?q=${res.q}`)
    }
    return (
        <form className="flex flex-row justify-end w-full tap:p-4 p-2 max-w-[500px]" onSubmit={handleSubmit(onSubmit)} >
            <Icon.search className={"ml-[-30px] z-10 m-4"} />
            <input type="text" {...register("q")} className="border-2  rounded-l-none  rounded-r-lg pr-10 w-full" placeholder="بحث" />
            <input type="submit" value={"أبحث"} className="bg-safety-700 tap:py-4 py-2 px-3 tap:px-6  text-white rounded-l-lg " />
        </form>
    )
}


export function ToBlogs() {

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div onMouseEnter={enter} onMouseLeave={leave} className="rounded-full w-full bg-white border-2 border-safety-700 flex lap:px-8 px-6 text-prussian-600 justify-between shadow-none max-w-[500px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white ">
            <Btn title="استكشف المدونة" to={`/blog`} className="rounded-full w-full flex  p-0 !m-0 text-prussian-600 justify-between shadow-none max-w-[500px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end"  >
                <IconArrow color={btnHover ? "#fff" : "#032DA6"} />
            </Btn>
        </div>
    )
}