"use client"
import Icon from "@/component/icons";
import { BLOG_Delete } from "@/graphql/queries/blog";
import { useMutation } from "@apollo/client";
import { Popconfirm, Table, message } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function AdminBlogsList({ data: All }: any) {

    const [deleteBlog, { data: delData, loading, error }] = useMutation(BLOG_Delete);
    let [data, setData] = useState(All)
    function Delete(id: any) {
        deleteBlog({ variables: { id: id } })
            .then(response => {
                let filter = data.filter((filter: any) => filter.id !== id)
                setData(filter)
                message.success('تم حذف التدوينة')
            })
            .catch(error => message.error('حدث خطأ أثناء حذف التدوينة:', error))
    }
    const columns = [
        {
            title: "العنوان", dataIndex: "title", key: "title",
            render: (_: any, record: any) => <a href={`/admin/blog/${record.id}`} className="mx-10 text-blue-400">  {record.title}  </a>
        },
        { title: "التصنيف", dataIndex: "categories", key: "categories", },
        // { title: "المؤالف", dataIndex: "auther", key: "auther", },
        // { title: " تاريخ الانشاء ", dataIndex: "create_at", key: "create_at", render: (_: any, record: any) => <p >{new Date(record.create_at).toLocaleDateString()}</p> },
        {
            title: "الخيارات", dataIndex: "delete", key: "delete",
            render: (_: any, record: any) => (
                <Popconfirm title="  أنت متأكدة من  حذف المستخدم" okText="نعم" cancelText="لا" onConfirm={() => Delete(record.id)} >
                    <button className="mr-10 green ml-10 box aitem" >
                        <Icon.delete />
                    </button>
                </Popconfirm >
            )
        },

    ];
    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >

            <Table dataSource={data} columns={columns} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.title} />
        </div>
    )
}
export function AdminBlogsHeader() {

    return (
        <div className="flex flex-row items-center">
            <h1 className="font-bold text-2xl"  >المدونة</h1>
            <Link href={`/admin/blog/add`} className="text-white bg-prussian-800 hover:bg-white hover:text-prussian-800 border-2 hover:border-prussian-800 rounded-xl p-3 mx-4" >أضافة تدوينة</Link>
        </div>
    )
}