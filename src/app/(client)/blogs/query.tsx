"use server"
import { getClient } from '@/graphql/Apollo-client'
import gql from "graphql-tag";

let cats = `
categories {
    nodes {
        name
        slug
    }
}
`

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
        ${cats} 
        posts {
            ${post} 
        }
    }
`
let postsBycat = gql`
    query postsBycat($slug: ID!) {
        ${cats}
        category(idType: SLUG, id: $slug) {
            posts {
                ${post} 
            }
        }
    }

`
let Search = gql`
    query Search( $search: String  ) {
        ${cats}
        posts(where: { search: $search}) {
            ${post} 
        }
    }
`
export const getAllPosts = async ({ cat, q }: any) => {

    try {
        if (q) return await getClient().query({ query: Search, variables: { search: q }, fetchPolicy: "no-cache" })
        else if (cat) return await getClient().query({ query: postsBycat, variables: { slug: cat }, fetchPolicy: "no-cache" })
        else return await getClient().query({ query: allposts, fetchPolicy: "no-cache" })
    } catch (error) {
        return { data: { posts: [] } }
    }
}

