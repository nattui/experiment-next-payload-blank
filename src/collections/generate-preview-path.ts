import { CollectionSlug, PayloadRequest } from "payload"

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  "blog-post": "/blog",
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  req: PayloadRequest
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || "",
    slug,
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
