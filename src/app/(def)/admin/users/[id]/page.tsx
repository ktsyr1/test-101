"use server"
import { GET_USER_ONE } from '@/graphql/queries/user';
import { getClient } from "@/graphql/Apollo-client";
import FormUserOne from "@/component/admin/user/form";


// let getData = () => getClient().query({ query: GET_USER_ONE })
export default async function UserOne() {
    // const { data } = await getData()
// 
    return (
        <div className="m-a   w-full flex j ">
            {/* <FormUserOne data={data.users[0]} /> */}
        </div>
    )
}
