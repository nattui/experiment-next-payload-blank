"use client"

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react"
import { useRouter } from "next/navigation"
import React from "react"

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={getClientSideURL()}
    />
  )
}

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = "http://localhost:3000"
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = globalThis.location.protocol
    const domain = globalThis.location.hostname
    const port = globalThis.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ""}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ""
}

export const canUseDOM = !!(
  globalThis.window !== undefined &&
  globalThis.document &&
  globalThis.document.createElement
)
