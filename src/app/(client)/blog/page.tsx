"use client"
import BlogCard from "@/component/blog/cards";
import Hero from "@/component/hero";
import Icon from "@/component/icons";
import BlogPart, { CardType } from "@/component/landing/blog";
import postsData from "@/data/posts.json"
import { useState } from "react";

export default function BlogAll() {
    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.jpeg)] min-h-[400px]"} >
                <>
                    <h1 className="text-white lap:text-6xl  text-4xl  font-semibold">المدونة</h1>
                    <p className="w-full m-auto lap:text-2xl  text-base font-semibold my-0 p-4 max-w-[1000px]">هذا هو مركز الأخبار الخاص بنا، حيث نشارك خبرتنا ونصائحنا ومقالاتنا حول كل ما يتعلق بالعقارات، وكيفية البدء بالفحص، وكيفية تقييم ما إذا كنت بحاجة إلى واحدة أم لا.</p>
                    <p className="rounded-tl-[32px] lap:text-2xl  text-base font-bold  rounded-br-3xl my-0 px-16 m-auto bg-white p-4 text-safety-700 w-max"> لكن أولاً، فنجان قهوة.</p>
                </>
            </Hero>
            <div className="flex tap:flex-row flex-col  items-center text-sm justify-between   max-w-[1360px] m-auto my-8">
                <div className="flex flex-row items-center overflow-x-scroll w-full my-8">
                    {["مؤخرًا", "مقابلات", "خطوط إرشاد", "مقالات"].map(a => <p key={a} className="py-2 bg-slate-100 text-sm  font-medium rounded-md px-4 mx-2"> {a}</p>)}
                    {/* <div className="w-[44px] h-[44px] bg-safety-700 rounded-md text-white text-xl items-center flex justify-center mx-4">
                        +
                    </div> */}
                </div>
                <form className="flex flex-row justify-center w-full p-4 max-w-[500px]">
                    <Icon.search className={"ml-[-30px] z-10 m-4"} />
                    <input type="text" className="border-2  rounded-l-none  rounded-r-lg pr-10 w-full" placeholder="بحث" />
                    <input type="submit" value={"أبحث"} className="bg-safety-700 py-4 px-6 text-white rounded-l-lg " />
                </form>
            </div>
            <Content />
        </div>
    )
}

function Content() {
    let [posts, setPosts] = useState(Array.from([0, 1, 2, 4, 5, 6].map(a => postsData[0])));
    let [limit, setLimit] = useState(3)


    return (
        <div className=" flex flex-col items-center w-full   pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <div className=" flex flex-col items-center justify-center  w-full ">
                    <BlogCard data={posts[0]} type={CardType.full} />
                    <div className="flex flex-wrap items-center justify-center">
                        {posts.slice(0, limit).map(post => <BlogCard data={post} key={post.title} />)}
                    </div>
                    <button type="button" className="flex flex-row text-safety-700 justify-center text-base font-semibold items-center mt-9" onClick={() => setLimit(limit + 3)} >
                        <p>المزيد من المقالات</p>
                        <Icon.arrowDown className={`border-2 rounded-full border-safety-700 mx-4 w-8 h-8 p-1 `} color={"#FF5C00"} />
                    </button>
                </div>
            </div>
        </div>
    )
}