"use client"
import Link from "next/link";
import { IconArrow } from "../icons";
import BlogCard from "../blog/cards";
import postsData from "@/data/posts.json"
import { useState } from "react";

export enum CardType {
    full = "full"
}
export default function BlogPart() {
    let [posts, setPosts] = useState([postsData[0], postsData[0], postsData[0]])
    return (
        <div className=" flex flex-col items-center w-full bg-[#eee] pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <Header />
                <div className=" flex flex-col items-center justify-center  w-full bg-[#eee]">
                    {/* <BlogCard data={posts[0]} type={CardType.full} /> */}
                    <div className="flex flex-wrap items-center justify-center">
                        {posts.map((post, i) => <BlogCard data={post} key={i} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
function Header() {
    return (
        <div className="flex flex-row items-center justify-between px-4 mt-14 w-full">
            <h2 className="text-safety-700 tap:text-6xl font-black my-4 text-3xl ">المدونة</h2>
            <Link href="blog" prefetch={false} className="flex flex-row justify-center items-center" >
                <p className="p-4 text-emerald-400 lap:text-2xl text-base font-normal">استكشف المدونة </p>
                <IconArrow color={"#34d399"} className={"fill-emerald-400 p-1"} />
            </Link>
        </div>
    )
}
