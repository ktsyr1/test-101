"use server"

import Link from "next/link";
import AdminBlogsList from "@/component/admin/blog/home";
import axios from "axios";

export default async function AdminBlogsPage() {
    // const { data }: any = await axios.get(`${process.env.NEXT_PUBLIC_apis}/admin/blog`)

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl"  >المدونة</h1>
                <Link href={`/admin/blog/add`} className="text-white bg-prussian-800 hover:bg-white hover:text-prussian-800 border-2 hover:border-prussian-800 rounded-xl p-3 mx-4" >أضافة تدوينة</Link>
            </div>
            {/* <AdminBlogsList data={data} /> */}
        </div>
    )
}