"use server"

import AdminSurveysList from '@/component/admin/survey';
import axios from 'axios';



export default async function AdminBlogsPage() {

    // const { data }: any = await axios.get(`${process.env.NEXT_PUBLIC_apis}/admin/surveies`)

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl my-4"  >الاستطلاع</h1>
            </div>
            {/* <AdminSurveysList data={data} /> */}
        </div>
    )
}