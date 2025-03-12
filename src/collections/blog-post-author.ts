import type { CollectionConfig } from "payload"

export const BlogPostAuthor: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["name", "title"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "image",
      relationTo: "media",
      type: "upload",
    },
  ],
  slug: "blog-post-author",
}
