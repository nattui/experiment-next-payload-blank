import configPromise from "@payload-config"
import { getPayload } from "payload"

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: "blog-post",
  })

  return (
    <div className="mt-64 flex flex-col">
      <div className="mx-auto mt-36 flex w-full max-w-[96rem] flex-col px-20">
        <h1 className="font-400 text-60/125 mb-96">
          The Enterprise GenAI Blog
        </h1>

        {posts.docs.map((post) => (
          <a href={`/blog/${post.slug}`} key={post.id}>
            {post.title}
          </a>
        ))}
      </div>
    </div>
  )
}
