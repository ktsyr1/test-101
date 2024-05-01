"use server"

import Link from "next/link";
import { getClient } from '@/graphql/Apollo-client';
import AdminBlogsList from "@/component/admin/blog/home";
import { Blogs_Get } from "@/graphql/queries/blog";


let getData =async () => {
    try {
        return { data: {} }
        return //async () => await getClient().query({ query: Blogs_Get });
    } catch (error) {
        return { data: {  } }
    }
}

export default async function AdminBlogsPage() {
    const { data }: any = await getData()

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl"  >المدونة</h1>
                <Link href={`/admin/blog/add`} className="text-white bg-prussian-800 hover:bg-white hover:text-prussian-800 border-2 hover:border-prussian-800 rounded-xl p-3 mx-4" >أضافة تدوينة</Link>
            </div>
            <AdminBlogsList data={data?.blogs} />
        </div>
    )
}