import type { CollectionConfig } from "payload"
import { generatePreviewPath } from "@/collections/generate-preview-path"
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

export const BlogPost: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "slug", "author", "date-published"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          collection: "blog-post",
          req,
          slug: typeof data?.slug === "string" ? data.slug : "",
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        collection: "blog-post",
        req,
        slug: typeof data?.slug === "string" ? data.slug : "",
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      name: "slug",
      required: true,
      type: "text",
    },
    {
      hasMany: false,
      name: "author",
      relationTo: "blog-post-author",
      required: true,
      type: "relationship",
    },
    {
      defaultValue: new Date(),
      name: "date-published",
      required: true,
      type: "date",
    },
    {
      hasMany: false,
      name: "category",
      relationTo: "blog-post-category",
      required: false,
      type: "relationship",
    },
    {
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      name: "content",
      type: "richText",
    },
  ],
  slug: "blog-post",
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
