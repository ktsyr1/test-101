"use server"

import { getClient } from '@/graphql/Apollo-client';
import { Surveys } from "@/graphql/queries/surveies";
import AdminSurveysList from '@/component/admin/survey';


let getData = () => {
    try {
        return { data: {} }
        return //async () => await getClient().query({ query: Surveys });
    } catch (error) {
        return { data: { surveys: [] } }
    }
}

export default async function AdminBlogsPage() {
    const { data }: any = await getData()

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <div className="flex flex-row items-center">
                <h1 className="font-bold text-2xl my-4"  >الاستطلاع</h1>
            </div>
            <AdminSurveysList data={data?.surveys} />
        </div>
    )
}