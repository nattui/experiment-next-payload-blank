import type { CollectionConfig } from 'payload'

export const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    {
      name: 'date-published',
      type: 'date',
      defaultValue: new Date(),
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
