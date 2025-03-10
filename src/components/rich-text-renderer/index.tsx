// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  // SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

// import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

// import type {
//   BannerBlock as BannerBlockProps,
//   CallToActionBlock as CTABlockProps,
//   MediaBlock as MediaBlockProps,
// } from '@/payload-types'
// import { BannerBlock } from '@/blocks/Banner/Component'
// import { CallToActionBlock } from '@/blocks/CallToAction/Component'
// import { cn } from '@/utilities/ui'

type NodeTypes = DefaultNodeTypes
// | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {},
})

type Props = {
  data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { ...rest } = props
  return <ConvertRichText converters={jsxConverters} {...rest} />
}
