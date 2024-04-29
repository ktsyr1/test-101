"use client"
import Link from "next/link";
import  menuAdmin  from "@/data/menuAdmin.json";

export default function AdminPage() {
    return (
        <div className="flex flex-wrap">
            {menuAdmin.slice(1).map(a => (
                <Link href={`/admin/${a.to}`} key={a.title} className="h-[200px] w-[200px] rounded-xl shadow-lg flex flex-col justify-center items-center m-4">
                    <img src={`/icons/${a.Icon}`} alt="" width={90} loading="lazy"  />
                    <p className="text-prussian-600 font-bold text-xl my-6">{a.title}</p>
                </Link>
            ))}
        </div>
    )
}