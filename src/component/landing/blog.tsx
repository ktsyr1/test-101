"use client"
import Link from "next/link";
import { IconArrow } from "../icons";
import { useState } from "react";
import { dataBlogs } from "@/component/blog/demo";
import Btn from "../btns";
// import { BlogCardBeta } from "@/app/(def)/blog/page";

export default function BlogPart() {

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className=" flex flex-col items-center w-full bg-[#eee] pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <BlogHeader />
                <div className=" flex flex-col items-center justify-center  w-full bg-[#eee]">
                    {/* <BlogCard data={posts[0]} type={CardType.full} /> */}
                    <div className="flex flex-wrap items-center justify-center  my-8">
                        {dataBlogs.slice(0, 3).map(post => <BlogCardBeta data={post} key={post.title} />)}

                        {/* {posts.map((post, i) => <BlogCard data={post} key={i} />)} */}
                    </div>
                    <div onMouseEnter={enter} onMouseLeave={leave} className="rounded-full w-full bg-white border-2 border-safety-700 flex lap:px-8 px-6 text-prussian-600 justify-between shadow-none max-w-[500px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white ">
                        <Btn title="استكشف المدونة" to={`/blog`} className="rounded-full w-full flex  p-0 !m-0 text-prussian-600 justify-between shadow-none max-w-[500px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end"  >
                            <IconArrow color={btnHover ? "#fff" : "#032DA6"} />
                        </Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function BlogHeader() {
    return (
        <div className="flex flex-row items-center justify-between px-4 mt-14 w-full">
            <h2 className="text-safety-700 tap:text-6xl font-black my-4 text-3xl ">المدونة</h2>
            {/* <Link href="blog" prefetch={false} className="flex flex-row justify-center items-center" >
                <p className="p-4 text-emerald-400 lap:text-2xl text-base font-normal">استكشف المدونة </p>
                <IconArrow color={"#34d399"} className={"fill-emerald-400 p-1"} />
            </Link> */}
        </div>
    )
}
export function BlogCardBeta({ data }: any) {

    let [btnHover, SetBtnHover] = useState(false)
    let enter = () => SetBtnHover(true)
    let leave = () => SetBtnHover(false)
    return (
        <div className={`flex  m-4 shadow-sm hover:shadow-xl bg-white rounded-3xl flex-col lap:min-w-[350px] min-w-[250px] w-full max-w-[350px] lap:max-w-[421px]"} `}>
            <img src={data.image} loading="lazy" alt={data.title}
                className={` rounded-t-3xl min-h-[200px] bg-slate-100 border-safety-700 w-full rounded-b-none card/w-[50%]  border-b `} />
            <div className={`flex flex-col max-h-[432px]   `}>
                <div className="flex flex-col p-4 pb-0">
                    <b className="text-safety-700 lap:text-xl text-lg font-extrabold   ">{data.title}</b>
                    <p className="lap:py-4 py-2 lap:text-sm text-xs font-medium text-slate-500 overflow-hidden text-overflow-ellipsis lap:h-[78px] h-[57px] ">{data.bio}</p>
                </div>
                <div onMouseEnter={enter} onMouseLeave={leave}>
                    <Btn to={`/blog/${data.url}`} className="rounded-full border-2 border-safety-700 flex lap:px-8 px-6 text-prussian-600 justify-between shadow-none max-w-[400px] lap:text-xl text-base hover:bg-safety-700 hover:text-white hover:*:!fill-white " childSort="end" title="إقرأالمزيد" >
                        <IconArrow color={btnHover ? "#fff" : "#032DA6"} />
                    </Btn>
                </div>
            </div>
        </div>
    )
}