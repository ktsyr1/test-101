"use client"
// import BlogCard from "@/component/blog/cards";
import Hero from "@/component/hero";
import Icon, { IconArrow } from "@/component/icons";
import postsData from "@/data/posts.json"
import { useState } from "react";
import Btn from "@/component/btns";
import { dataBlogs } from "./[url]/page";

export default function BlogAll() {
    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.webp)] min-h-[400px]"} >
                <>
                    <h1 className="text-white lap:text-6xl  text-4xl  font-semibold">المدونة</h1>
                    <p className="w-full m-auto lap:text-2xl  text-base font-semibold my-0 p-4 max-w-[1000px]">هذا هو مركز الأخبار الخاص بنا، حيث نشارك خبرتنا ونصائحنا ومقالاتنا حول كل ما يتعلق بالعقارات، وكيفية البدء بالفحص، وكيفية تقييم ما إذا كنت بحاجة إلى واحدة أم لا.</p>
                    <p className="rounded-tl-[32px] lap:text-2xl  text-base font-bold  rounded-br-3xl my-0 px-16 m-auto bg-white p-4 text-safety-700 w-max"> لكن أولاً، فنجان قهوة.</p>
                </>
            </Hero>
            {/* <div className="flex  flex-col  items-center text-sm justify-between   max-w-[1360px] m-auto my-8 w-[90%] tap:w-[80%]">
                <form className="flex flex-row justify-end w-full tap:p-4 p-2 max-w-[500px]">
                    <Icon.search className={"ml-[-30px] z-10 m-4"} />
                    <input type="text" className="border-2  rounded-l-none  rounded-r-lg pr-10 w-full" placeholder="بحث" />
                    <input type="submit" value={"أبحث"} className="bg-safety-700 tap:py-4 py-2 px-3 tap:px-6  text-white rounded-l-lg " />
                </form>
                <div className="flex flex-row items-center overflow-x-scroll tap:overflow-hidden w-full my-8 select-none">
                    {["مؤخرًا", "مقابلات", "خطوط إرشاد", "مقالات"].map(a => <p key={a} className="py-2 bg-slate-100 tap:text-sm text-sx  border-2 border-slate-100 cursor-pointer hover:text-safety-700  hover:border-safety-700  font-medium rounded-md px-4 mx-2 text-nowrap"> {a}</p>)}
                </div>
            </div> */}
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
                    {/* <BlogCard data={posts[0]} type={CardType.full} /> */}
                    <div className="flex flex-wrap items-center justify-center my-8">
                        {/* {posts.slice(0, limit).map(post => <BlogCard data={post} key={post.title} />)} */}
                        {dataBlogs.slice(0, limit).map(post => <BlogCard2 data={post} key={post.title} />)}
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


enum CardType {
    full = "full"
}
export function BlogCard2({ data, type }: any) {

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