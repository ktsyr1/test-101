"use server"
import AdminUsersHeader from '@/component/admin/user/header';
import { Table } from 'antd';
import axios from 'axios';


export default async function AdminUsersPage() {

    // const { data }: any = await axios.get(`${process.env.NEXT_PUBLIC_apis}/admin/emailnews`)
    // console.log(data);

    const columns = [
        { title: "الايميل", dataIndex: "email", key: "email", },
        { title: "تاريخ الانشاء", dataIndex: "create_at", key: "create_at", },
    ];
    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl"  >الايميلات</h1>
            </div>

            {/* <Table
                dataSource={data?.emailNews}
                columns={columns}
                pagination={false}
                className="flex flex-col items-center *:w-full my-8"
            // rowKey={(record: any) => record.id}
            /> */}
        </div>
    )
}
