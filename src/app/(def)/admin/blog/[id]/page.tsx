"use client"
import BlogForm from "@/component/admin/blog/one";
import { Blog_Get } from "@/graphql/queries/blog";
import { useQuery } from "@apollo/client";

// let getData = () => getClient().query({ query: GET_BLOG })

// export default function BlogFormEdit({ params: { id } }: { params: { id: string } }) {
//     const mode = id !== 'add'; // More descriptive variable name 

//     const res: any = mode && useQuery(Blog_Get, { variables: { id } });
//     let data = res?.data?.blog

//     return (
//         <div className="m-a   w-full flex justify-start">
//             {/* <BlogForm data={data} mode={mode} /> */}
//         </div>
//     )
// }

export default function BlogFormEdit({ params: { id } }: { params: { id: string } }) {
    const mode = id !== 'add'; // More descriptive variable name 

    // const { data } = useQuery(Blog_Get, { variables: { id }, skip: !mode }); // تجاهل الاستعلام إذا كانت الوضعية غير صحيحة


    return (
        <div className="m-a   w-full flex justify-start">
            <BlogForm data={{}} mode={mode} />
        </div>
    )
}
