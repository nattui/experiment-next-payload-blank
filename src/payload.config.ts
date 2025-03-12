import { BlogPost } from "@/collections/blog-post"
import { BlogPostAuthor } from "@/collections/blog-post-author"
import { BlogPostCategory } from "@/collections/blog-post-category"
import { Media } from "@/collections/media-2"
import { Users } from "@/collections/users-1"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { uploadthingStorage } from "@payloadcms/storage-uploadthing"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildConfig } from "payload"
import sharp from "sharp"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: "/components/logomark",
        Logo: "/components/logo",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [
        {
          rel: "icon",
          url: "/favicon.ico",
        },
      ],
    },
    user: Users.slug,
  },
  collections: [Users, Media, BlogPost, BlogPostAuthor, BlogPostCategory],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor(),
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        acl: "public-read",
        token: process.env.UPLOADTHING_TOKEN,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
