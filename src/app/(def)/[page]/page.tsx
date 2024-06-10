
"use server" 
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";
import "@/component/styles/style.css"

const query = gql`
    query Posts($uri: String ) {
        pageBy(uri: $uri) {
            slug
            title
            content
        } 
    }
`

let getData = async (uri: string) => {
    uri = `/${uri}/`
    try {
        return await getClient().query({ query, variables: { uri }, fetchPolicy: "no-cache" })
    } catch (error) {
        return { data: { post: [] } }
    }
}

export default async function PageOne({ params: { page } }: { params: { page: string } }) {

    const { data }: any = await getData(decodeURI(page))
    let post: any = data?.pageBy

    return (
        <div className="bg-white">
            <div className="flex flex-col items-center   lap:text-2xl text-lg justify-between bg-white max-w-[1360px] m-auto mt-8 *:p-4" >
                {/* {post && <p className="pt-4 lap:text-sm text-xs font-semibold *:text-wrap  w-[80%] text-end text-prussian-500">{post.date.split("T")[0]}</p>} */}
                <div className="flex flex-col items-center lap:text-2xl text-lg justify-between bg-white max-w-[1360px] w-[90%] m-auto mb-8 *:p-4 blogPage">
                    <h1 className="text-4xl text-start w-full font-bold my-4 text-safety-700  "> {post?.title}</h1>
                    {post && <div className=" lap:text-2xl text-lg  mb-8 *:p-4" dangerouslySetInnerHTML={{ __html: post?.content }} />}
                </div>
            </div>
        </div>
    )
} 