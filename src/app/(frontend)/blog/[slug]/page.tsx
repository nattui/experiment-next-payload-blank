import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/rich-text-renderer'
import styles from '@/app/(frontend)/blog/[slug]/page.module.css'

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
    <div className={styles.root}>
      <div className={styles.header}>
        <Link className={styles.backLink} href="/blog">
          ← Back
        </Link>

        <h1 className={styles.title}>{post.title}</h1>

        {post.author && (
          <p className={styles.author}>By {post.author.toString() || 'Unknown Author'}</p>
        )}

        {post['date-published'] && <p className={styles.date}>{post['date-published']}</p>}
      </div>

      {post.content && (
        <div className={styles.content}>
          <RichText data={post.content} />
        </div>
      )}
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
