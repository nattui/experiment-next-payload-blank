import type { CollectionConfig } from "payload"
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { generatePreviewPath } from "@/collections/generate-preview-path"

export const BlogPost: CollectionConfig = {
  slug: "blog-post",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "author", "date-published"],
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "blog-post",
        req,
      }),
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "blog-post",
          req,
        }),
    },
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
      type: "relationship",
    },
    {
      defaultValue: new Date(),
      name: "date-published",
      type: "date",
    },
    {
      name: "content",
      type: "richText",
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
    },
  ],
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
