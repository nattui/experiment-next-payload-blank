import configPromise from "@payload-config"
import Image from "next/image"
import { getPayload } from "payload"

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: "blog-post",
    limit: 1000,
    sort: "-date-published",
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

              <div className="flex h-full flex-col justify-between">
                <p className="text-20 mb-16">{post.title}</p>

                <div className="flex gap-x-8">
                  <div className="size-40 bg-gray-100">
                    {post.author &&
                      typeof post.author === "object" &&
                      "image" in post.author &&
                      post.author.image &&
                      typeof post.author.image === "object" &&
                      post.author.image.url && (
                        <Image
                          alt={post.author.image.alt}
                          height={40}
                          src={post.author.image.url}
                          width={40}
                        />
                      )}
                  </div>

                  <div className="flex flex-col">
                    {post.author &&
                      typeof post.author === "object" &&
                      "name" in post.author && (
                        <p>
                          {post.author.name}{" "}
                          {post.author.title && (
                            <span className="text-[#8e8c8f]">
                              · {post.author.title}
                            </span>
                          )}
                        </p>
                      )}

                    <p className="text-14 text-[#8e8c8f]">
                      {new Date(post["date-published"]).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}{" "}
                      · 0 min read
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
