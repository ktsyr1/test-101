"use server"
import AdminUsersHeader from '@/component/admin/user/header';
import AdminUsersList from "@/component/admin/user/table";
import { getClient } from '@/graphql/Apollo-client';
import { GET_USERS } from '@/graphql/queries/user'


// let getData = async () => {
//     try {
//         return await getClient().query({ query: GET_USERS })
//     } catch (error) {
//         return { data: { users: [] } }
//     }
// }

export default async function AdminUsersPage() {
    // const { data }: any = await getData()

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8" >
            <AdminUsersHeader />
            {/* <AdminUsersList data={data?.users} /> */}
        </div>
    )
}   