
import Hero from "@/component/hero";
import SizeBox from "@/component/size-box";
// import { dataBlogs } from "@/component/blog/demo";
 

export default async function BlogOne({ params: { url }, }: any) {

    // const post: TypeBlogPost | undefined = dataBlogs?.find((post: any) => post?.url == url)
    const post = null
    if (post) {

    } else return (
        <div className="bg-white">
            <Hero className={" bg-[url(/images/pinsel.webp)]"} >
                <SizeBox className='flex flex-col'>
                    {/* <h1 className="text-white lap:text-4xl text-2xl mx-4 font-bold">{post?.title}</h1> */}
                    {/* <p className="w-full m-auto lap:text-3xl text-lg my-0 p-4  mt-6"> {post?.shortContent}</p> */}
                </SizeBox>
            </Hero>
            <div className="flex flex-col items-center   lap:text-2xl text-lg justify-between bg-white max-w-[1360px] m-auto my-8 *:p-4"  >
                {/* <img src={post?.image} className=" rounded-2xl shadow-xl !p-0 w-[80%]" alt={post?.title} />
                {post?.content} */}
            </div>
        </div>
    )
}

