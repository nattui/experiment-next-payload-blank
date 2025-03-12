import type { CollectionConfig } from "payload"

export const BlogPostCategory: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["name"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
  ],
  slug: "blog-post-category",
}
