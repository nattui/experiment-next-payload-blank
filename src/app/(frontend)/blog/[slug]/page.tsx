import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/rich-text-renderer'

export interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

const payload = await getPayload({ config: configPromise })

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const result = await payload.find({
    collection: 'blog-post',
    draft: false,
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
    <div className="blog-post-container">
      <div className="blog-post-header">
        <Link href="/blog" className="back-link">
          ← Back to all posts
        </Link>
        <h1>{post.title}</h1>

        <div className="blog-post-meta">
          {post.author && (
            <span className="author">By {post.author.toString() || 'Unknown Author'}</span>
          )}

          {post['date-published'] && <span className="date">{post['date-published']}</span>}
        </div>
      </div>

      <div className="blog-post-content">{post.content && <RichText data={post.content} />}</div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await payload.find({
    collection: 'blog-post',
    limit: 1000,
  })

  const params = posts.docs.map((post) => ({
    slug: post.slug,
  }))

  return params
}
