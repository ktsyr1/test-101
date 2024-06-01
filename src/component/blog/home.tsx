"use server"
import { Content, SearchBlog } from "@/component/blog/cards";
import Hero from "@/component/hero";
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";
import Link from "next/link";

let post = ` 
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
`
let allposts = gql`
    query Posts {  
        posts {
            ${post} 
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


export default async function BlogAll() {

    const { data }: any = await getData()
    let categories = data.categories?.nodes
    let posts: any = data.posts.nodes

    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.webp)] min-h-[400px]"} >
                <>
                    <h1 className="text-white lap:text-6xl  text-4xl  font-semibold">المدونة</h1>
                    <p className="w-full m-auto lap:text-2xl  text-base font-semibold my-0 p-4 max-w-[1000px]">هذا هو مركز الأخبار الخاص بنا، حيث نشارك خبرتنا ونصائحنا ومقالاتنا حول كل ما يتعلق بالعقارات، وكيفية البدء بالفحص، وكيفية تقييم ما إذا كنت بحاجة إلى واحدة أم لا.</p>
                    <p className="rounded-tl-[32px] lap:text-2xl  text-base font-bold  rounded-br-3xl my-0 px-16 m-auto bg-white p-4 text-safety-700 w-max"> لكن أولاً، فنجان قهوة.</p>
                </>
            </Hero>

            <Content data={posts} />
        </div>
    )
}

