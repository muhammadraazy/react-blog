import { request, gql } from "graphql-request"

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

// fetch data with graphql and graphcms 
export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
    `

    const result = await request(graphqlApi, query)

    return result.postsConnection.edges;
}

// get new post
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlApi, query)

  return result.posts;
}


// get similar post by categories
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlApi, query, { slug, categories });

  return result.posts;
};

// get categories
export const getCategories = async () => {
   const query = gql`
     query GetCategories {
       categories {
         name
         slug
       }
     }
   `

   const result = await request(graphqlApi, query)

   return result.categories
}

// get post details
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.post;
};

// post comment to our backend server /api/comments
export const submitComment = async (obj) => {
   const result = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
   })

   return result.json();
}


// get comments
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        comment
        createdAt
      }
    }
  `

  const result = await request(graphqlApi, query, { slug })

  return result.comments
}

// get featuredPosts
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage { 
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlApi, query);

  return result.posts;
};


// get category post
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.postsConnection.edges;
};