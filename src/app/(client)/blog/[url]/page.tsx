"use client"
import BlogCard from "@/component/blog/cards";
import Hero from "@/component/hero";
import Icon from "@/component/icons";
import BlogPart, { CardType } from "@/component/landing/blog";
import SizeBox from "@/component/size-box";
import postsData from "@/data/posts.json"
import { useState } from "react";
import MarkdownIt from 'markdown-it'

function getBlogId(url: string) {
    return postsData.find(post => post?.url === url)
}
export default async function BlogOne({ params: { url }, }: { params: { url: string } }) {

    const post = await getBlogId(url)
    let md = new MarkdownIt()
    let content = md.render(post?.content || " ")

    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.jpeg)]"} >
                <SizeBox className='flex flex-col'>
                    <h1 className="text-white lap:text-6xl text-3xl font-bold">{post?.title}</h1>
                    <p className="w-full m-auto lap:text-3xl text-lg my-0 p-4  mt-6"> {post?.shortContent}</p>
                </SizeBox>
            </Hero>
            <div className="flex flex-col items-center lap:text-2xl text-lg justify-between bg-white max-w-[1360px] m-auto my-8 *:p-4" dangerouslySetInnerHTML={{ __html: content || "" }} />
        </div>
    )
} 