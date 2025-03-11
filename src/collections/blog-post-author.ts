import type { CollectionConfig } from "payload"

export const BlogPostAuthor: CollectionConfig = {
  slug: "blog-post-author",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title"],
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "title",
      required: true,
      type: "text",
    },
  ],
}
