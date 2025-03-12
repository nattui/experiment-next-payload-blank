import BlogPostLayout from "@/app/(frontend)/blog/[slug]/layouts"
import configPromise from "@payload-config"
import { getPayload } from "payload"

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: "blog-post",
    limit: 1000,
    sort: "-date-published",
  })

  return (
    <BlogPostLayout className="mt-36" maxWidth={960} paddingX={20}>
      <h1 className="font-400 text-60/125 mb-96">The Enterprise GenAI Blog</h1>

      <div className="mb-128 flex flex-wrap gap-x-32 gap-y-48">
        {posts.docs.map((post) => (
          <a
            className="max-768:max-w-full flex w-full max-w-[calc(1/2*100%-16px)] flex-col transition-opacity hover:opacity-50"
            href={`/blog/${post.slug}`}
            key={post.id}
          >
            {/* Thumbnail */}
            <div className="aspect-16-9 mb-16 bg-gray-100">
              {post.thumbnail &&
                typeof post.thumbnail === "object" &&
                "url" in post.thumbnail &&
                post.thumbnail.url && (
                  <img
                    alt={post.thumbnail.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={post.thumbnail.url}
                  />
                )}
            </div>

            {/* Content */}
            <div className="flex h-full flex-col justify-between">
              {/* Category */}
              <div className="mb-16 flex flex-col">
                {post.category &&
                  typeof post.category === "object" &&
                  "name" in post.category && (
                    <p className="text-12 mb-6 text-[#fd243e]">
                      {post.category.name}
                    </p>
                  )}

                {/* Title */}
                <p className="text-20">{post.title}</p>
              </div>

              {/* Author */}
              <div className="flex gap-x-8">
                <div className="size-40 bg-gray-100">
                  {post.author &&
                    typeof post.author === "object" &&
                    "image" in post.author &&
                    post.author.image &&
                    typeof post.author.image === "object" &&
                    post.author.image.url && (
                      <img
                        alt={post.author.image.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        src={post.author.image.url}
                      />
                    )}
                </div>

                {/* Author */}
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

                  {/* Date */}
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
    </BlogPostLayout>
  )
}
