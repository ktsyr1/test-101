"use client"

import Icon from "@/component/icons";
import { Popconfirm, Table } from "antd";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { DELETE_USER_ONE } from "@/graphql/queries/user";
import { useState } from "react";
export default function AdminUsersList({ data: all }: any) {
    const [Delete, { data: res, loading, error }] = useMutation(DELETE_USER_ONE);
    let [data, setData] = useState(all)
    function DeleteHandler(id: any) {
        Delete({ variables: { id } })
        let filter = data.filter((filter: any) => filter.id!== id)
        setData(filter)
    }
    const columns = [
        {
            title: "الاسم", dataIndex: "fullname", key: "fullname",
            render: (_: any, record: any) => <Link href={`/admin/users/${record.id}`} className="mx-10 text-blue-400">  {record.fullname}  </Link>
        },
        {
            title: "الايميل", dataIndex: "email", key: "email",
            render: (_: any, record: any) => <Link href={`/admin/users/${record._id}`} className="mx-10 text-blue-400">  {record.email}  </Link>
        },
        { title: "تاريخ الانشاء", dataIndex: "create_at", key: "create_at", },
        {
            title: "الحالة", dataIndex: "delete", key: "delete",
            render: (_: any, record: any) => <p className="mx-10">  {record.verify_User ? "✔ تم التفعيل" : "🧐 قيد دعوة "}  </p>
        },
        {
            title: "حذف المستخدم", dataIndex: "delete", key: "delete",
            render: (_: any, record: any) => (
                <Popconfirm title="  أنت متأكدة من  حذف المستخدم" okText="نعم" cancelText="لا"
                    onConfirm={() => DeleteHandler(record.id)}
                >
                    <button className="mr-10 green ml-10 box aitem" >
                        <Icon.delete />
                    </button>
                </Popconfirm>
            )
        },

    ];
    return <Table dataSource={data} columns={columns} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.email} />
} 