"use server"
import { Content, ToBlogs } from "@/component/blog/cards";
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";
let allposts = gql`
    query Posts {  
        posts(first: 3) {
            nodes { 
                title
                date
                slug
                excerpt
                author {
                    node {
                        name
                        avatar {
                            url
                        }
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                featuredImage {
                    node { 
                        mediaItemUrl
                    }
                }
            } 
        }
    }
`
let getData = async () => {
    try {
        return await getClient().query({ query: allposts })
    } catch (error) {
        return { data: { posts: [] } }
    }
}

export default async function BlogPart() {

    const { data }: any = await getData()
    let posts: any = data.posts.nodes
    return (
        <div className=" flex flex-col items-center w-full bg-[#eee] pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <BlogHeader />
                <div className=" flex flex-col items-center justify-center  w-full bg-[#eee]">
                    <Content data={posts} />
                    <ToBlogs />
                </div>
            </div>
        </div>
    )
}
function BlogHeader() {
    return (
        <div className="flex flex-row items-center justify-between px-4 my-14 w-full ">
            <h2 className="text-safety-700 tap:text-6xl font-black my-4 text-3xl ">المدونة</h2>
        </div>
    )
} 