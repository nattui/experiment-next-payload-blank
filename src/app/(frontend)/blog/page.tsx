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

        <div className="mb-128 flex flex-wrap gap-x-32 gap-y-48">
          {posts.docs.map((post) => (
            <a
              className="flex w-full max-w-[calc(1/2*100%-32px)] flex-col transition-opacity hover:opacity-50"
              href={`/blog/${post.slug}`}
              key={post.id}
            >
              <div className="aspect-16-9 mb-16 bg-gray-100" />

              <p className="text-20 mb-16">{post.title}</p>

              {post.author &&
                typeof post.author === "object" &&
                "name" in post.author && <p className="">{post.author.name}</p>}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
