import type { PropsWithChildren } from "react"

interface BlogPostLayoutProps extends PropsWithChildren {
  className?: string
  maxWidth?: 640 | 960 | 1280 | number
  paddingX?: number
}

export default function BlogPostLayout(props: BlogPostLayoutProps) {
  const { children, className = "", maxWidth = 640, paddingX = 20 } = props

  return (
    <div
      className={className}
      style={{ paddingLeft: paddingX, paddingRight: paddingX }}
    >
      <div
        className="mx-auto flex w-full flex-col"
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    </div>
  )
}
