import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        destination: "https://www.typeface.ai/blog/:path*",
        source: "/old-blog/:path*",
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
