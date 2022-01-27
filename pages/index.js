import Head from 'next/head'
import { PostCard, PostWidget, Categories} from "../components"
import { FeaturedPosts } from "../sections"
import { getPosts } from "../services"

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-10">
      <Head>
        <title> Graphql Blog </title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 col-span-1">
            { posts.map(post => <PostCard post={post.node} key={post.node.title} />
            )}
         </div>
         <div className="lg:col-span-3 col-span-1">
           <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
           </div>
         </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
   const posts = (await getPosts()) || [];

   return {
     props: { posts }
   }
} 
