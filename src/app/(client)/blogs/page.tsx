"use server"
import { Content, SearchBlog } from "@/component/blog/cards";
import Hero from "@/component/hero";
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";
import Link from "next/link";
let cats = `
categories {
    nodes {
    name
    slug
    }
}
`
let allposts = gql`
    query Posts { 
        categories {
            nodes {
                name
                slug
            }
        }
        posts {
            nodes {
                title
                content
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
let postsBycat = gql`
    query postsBycat($slug: ID!) {
        categories {
            nodes {
                name
                slug
                }
            }
        category(idType: SLUG, id: $slug) {
            posts {
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
    }

`
let Search = gql`
    query Search( $search: String  ) {
        ${cats}
        posts(where: { search: $search}) {
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
let getData = async ({ cat, q }: any) => {

    try {
        let query: any
        if (q) query = { query: Search, variables: { search: q } }
        else if (cat) query = { query: postsBycat, variables: { slug: cat } }
        else query = { query: allposts }
        console.log(query)

        return await getClient().query({ ...query, fetchPolicy: "no-cache" })
    } catch (error) {
        return { data: { posts: [] } }
    }
}


export default async function BlogAll({ searchParams: { cat, q } }: any) {

    const { data }: any = await getData({ cat, q })
    // console.log(data)
    let categories = data.categories?.nodes
    let posts: any //= !cat ? data.posts.nodes : 
    if (q) posts = data.posts.nodes
    else if (cat) posts = data.category?.posts?.nodes
    else posts = data.posts.nodes 

    return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.webp)] min-h-[400px]"} >
                <>
                    <h1 className="text-white lap:text-6xl  text-4xl  font-semibold">المدونة</h1>
                    <p className="w-full m-auto lap:text-2xl  text-base font-semibold my-0 p-4 max-w-[1000px]">هذا هو مركز الأخبار الخاص بنا، حيث نشارك خبرتنا ونصائحنا ومقالاتنا حول كل ما يتعلق بالعقارات، وكيفية البدء بالفحص، وكيفية تقييم ما إذا كنت بحاجة إلى واحدة أم لا.</p>
                    <p className="rounded-tl-[32px] lap:text-2xl  text-base font-bold  rounded-br-3xl my-0 px-16 m-auto bg-white p-4 text-safety-700 w-max"> لكن أولاً، فنجان قهوة.</p>
                </>
            </Hero>
            <div className="flex  flex-col  items-center text-sm justify-between   max-w-[1360px] m-auto my-8 w-[90%] tap:w-[80%]">
                <SearchBlog />
                <div className="flex flex-row items-center overflow-x-scroll tap:overflow-hidden w-full my-8 select-none">

                    <Link href={`/blogs`} className={`py-2 bg-slate-100 tap:text-sm text-sx  border-2 border-slate-100 cursor-pointer ${!cat ? "!text-white !bg-safety-700" : "hover:text-safety-700  hover:border-safety-700 "} font-medium rounded-md px-4 mx-2 text-nowrap`}> الكل</Link>
                    {categories
                        ?.map((a: any) => <Link
                            href={`/blogs?cat=${a.slug}`}
                            key={a}
                            className={`py-2 bg-slate-100 tap:text-sm text-sx  border-2 border-slate-100 cursor-pointer  font-medium rounded-md px-4 mx-2 text-nowrap ${cat == a.slug ? "text-white !bg-safety-700" : "hover:text-safety-700  hover:border-safety-700 "}`}
                        > {a.name}</Link>
                        )}
                </div>
            </div>
            <Content data={posts} />
        </div>
    )
}

