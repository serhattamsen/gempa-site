import { client } from '@/lib/sanity'
import Blocks from '../../components/Blocks'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      blocks
    }`,
    { slug }
  )

  if (!page) return <div style={{ padding: 40 }}>Sayfa bulunamadı</div>

  return <Blocks blocks={page.blocks} />
}