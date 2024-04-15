import gql from "graphql-tag";
  

// Blogs query ======================= 

export const Blogs_Get = gql`
    query Blogs {
        blogs {
            id
            title
            slug
            categories
        }
    }
`

export const Blog_Get = gql`
    query Blog($id: ID!) {
        blog(id: $id) {
            id
            title
            content
            image
            shortContent
            categories
            slug
        }
    }
`
// mutation Blog
export const Blog_Create = gql`
    mutation BlogCreate($title: String!, $content: String!, $image: String!, $shortContent: String!, $categories: String!, $slug: String!) {
        BlogCreate(title: $title, content: $content, image: $image, shortContent: $shortContent, categories: $categories, slug: $slug) {
            id
            title
            content
            image
            shortContent
            categories
            slug
        }
    }
`

export const Blog_Update = gql`
    mutation BlogUpdate($id: ID!, $title: String!, $content: String!, $image: String!, $shortContent: String!, $categories: String!, $slug: String!) {
        BlogUpdate(id: $id, title: $title, content: $content, image: $image, shortContent: $shortContent, categories: $categories, slug: $slug) {
            id
            title
            content
            image
            shortContent
            categories
            slug
        }
    }
`
export const BLOG_Delete = gql`
    mutation DeleteBlog($id: ID!) {
        BlogDelete(id: $id)
    }
`
