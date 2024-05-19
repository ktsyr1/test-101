"use server"
import gql from "graphql-tag";
import BlogCard from "../blog/cards";
import { dataBlogs } from "../blog/demo";
import { BlogHeader } from "./blog";
import { getClient } from "@/graphql/Apollo-client";

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
        return await getClient().query(query)
    } catch (error) {
        return { data: { posts: [] } }
    }
}

export default function BlogServer() {
    return (
        <div className=" flex flex-col items-center w-full bg-[#eee] pb-16">
            <div className=" flex flex-col items-center   max-w-[1360px]">
                <BlogHeader />
                <div className=" flex flex-col items-center justify-center  w-full bg-[#eee]">
                    {/* <BlogCard data={posts[0]} type={CardType.full} /> */}
                    <div className="flex flex-wrap items-center justify-center  my-8">
                        {/* {dataBlogs.slice(0, 3).map(post => <BlogCard data={post} key={post.title} />)} */}

                        {/* {posts.map((post, i) => <BlogCard data={post} key={i} />)} */}
                    </div>
                </div>
            </div>
        </div>
    )
} 