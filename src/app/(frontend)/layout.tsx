import type { PropsWithChildren } from "react"
import "@/app/(frontend)/global.css"
import Topbar from "@/components/topbar"
import { fontCssVariables } from "@/utils/fonts"

export const metadata = {
  description:
    "Typeface is an all-in-one enterprise generative AI marketing platform to create personalized, on-brand content at scale. Best generative AI for marketers to create compelling brand stories for any channel, audience and use case.",
  title:
    "Typeface - Enterprise Generative AI Platform for Marketing & Content Creation",
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className={fontCssVariables} lang="en">
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  )
}
