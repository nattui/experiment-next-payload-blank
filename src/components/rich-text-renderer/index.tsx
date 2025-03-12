import {
  type DefaultNodeTypes,
  type DefaultTypedEditorState,
  type SerializedLinkNode,
} from "@payloadcms/richtext-lexical"
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"

type NodeTypes = DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== "object") {
    throw new TypeError("Expected value to be an object")
  }
  const slug = value.slug
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {},
})

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState
}

export default function RichText(props: Props) {
  const { ...rest } = props
  return <ConvertRichText converters={jsxConverters} {...rest} />
}
