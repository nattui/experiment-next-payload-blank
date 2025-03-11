import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import RichText from "@/components/rich-text-renderer"
import { draftMode } from "next/headers"
import { LivePreviewListener } from "@/app/(frontend)/blog/[slug]/live-preview-listener"
import "@/app/(frontend)/blog/[slug]/page.css"

export interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

const payload = await getPayload({ config: configPromise })

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { isEnabled: draft } = await draftMode()

  const { slug } = await params

  const result = await payload.find({
    collection: "blog-post",
    draft,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = result.docs?.[0] || null

  if (!post) return notFound()

  return (
    <div className="mt-64 flex flex-col">
      {draft && <LivePreviewListener />}

      <div className="mx-auto mt-48 mb-36 flex w-full max-w-[63.6rem] flex-col px-20">
        <Link
          className="text-14 mb-16 w-fit text-[#8e8c8f] transition-colors hover:text-[#111013]"
          href="/blog"
        >
          ← Back
        </Link>

        <h1 className="font-400 text-36/125 mb-24">{post.title}</h1>

        <div className="flex gap-x-8">
          <div className="size-48 bg-gray-100" />
          <div className="flex flex-col items-start">
            {post.author &&
              typeof post.author === "object" &&
              "name" in post.author && (
                <p>
                  By {post.author.name}{" "}
                  <span className="text-[#8e8c8f]">· {post.author.title}</span>
                </p>
              )}

            {post["date-published"] && (
              <p className="text-14 text-[#8e8c8f]">
                {new Date(post["date-published"]).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · 0 min read
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="aspect-16-9 mx-auto mb-36 flex h-full w-full max-w-[96rem] flex-col">
        <div className="h-full w-full bg-gray-100" />
      </div>

      {/* Content */}
      {post.content && (
        <div className="mx-auto flex w-full max-w-[63.6rem] flex-col px-20">
          <div className="content">
            <RichText data={post.content} />
          </div>
        </div>
      )}

      {/* Share */}
      <div className="mx-auto flex w-full max-w-[63.6rem] flex-col px-20">
        <div className="mb-128 border-t-2 border-solid border-gray-300 pt-24">
          <p className="text-24">Share</p>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await payload.find({
    collection: "blog-post",
    limit: 1000,
  })

  const params = posts.docs.map((post) => ({
    slug: post.slug,
  }))

  return params
}
