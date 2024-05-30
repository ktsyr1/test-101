"use server"
import Hero from "@/component/hero";
import SizeBox from "@/component/size-box";
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";

const query = gql`
    query PostOne($slug: String!) {
        postBy(slug: $slug) {
            title
            content
            date
            categories {
                nodes {
                    slug
                    name
                }
            }
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
            author {
                node {
                name
                avatar {
                    url
                }
                }
            }
        }
    }
`

let getData = async (slug: string) => {
    try {
        console.log({ query, variables: { slug } });

        return await getClient().query({ query, variables: { slug }, fetchPolicy: "no-cache" })
    } catch (error) {
        console.log(error)
        return { data: { post: [] } }
    }
}

export default async function BlogOne({ params: { url } }: { params: { url: string } }) {

    const { data }: any = await getData(decodeURI(url))
    console.log(data)
    let post: any = data?.postBy
    let author = post?.author?.node
    let cat = post?.categories?.nodes
    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.webp)]"} >
                <SizeBox className='flex flex-col'>
                    <h1 className="text-white lap:text-4xl text-2xl mx-4 font-bold">{post?.title}</h1>
                </SizeBox>
            </Hero>
            <div className="flex flex-col items-center   lap:text-2xl text-lg justify-between bg-white max-w-[1360px] m-auto mt-8 *:p-4" >
                <img src={post?.featuredImage.node.mediaItemUrl} className=" rounded-2xl shadow-xl !p-0 w-[80%]" alt={post?.title} />
                <div className="flex flex-row justify-between items-center p-4 pb-0 w-[80%] *:text-nowrap mt-4">
                    <div className="flex items-center ">
                        <img src={author?.avatar?.url} alt={author?.avatar?.name} loading="lazy" className="rounded-full w-16 min-h-16 shadow-lg" />
                        <b className="text-prussian-500 py-4 font-semibold lap:text-lg text-base mx-3 ">{author?.name}</b>
                    </div>
                    {cat && <p className="bg-teal-700 flex font-medium items-center tap:px-8 px-4 p-2 h-min rounded-md row-auto text-sm text-white">{cat[0]?.name}</p>}
                </div>
                {post && <p className="pt-4 lap:text-sm text-xs font-semibold *:text-wrap  w-[80%] text-end text-prussian-500">{post.date.split("T")[0]}</p>}
                <div className="flex flex-col items-center lap:text-2xl text-lg justify-between bg-white max-w-[1360px] w-[90%] m-auto mb-8 *:p-4">
                    {post && <div className=" lap:text-2xl text-lg  mb-8 *:p-4" dangerouslySetInnerHTML={{ __html: post?.content }} />}
                </div>
            </div>
        </div>
    )
} 