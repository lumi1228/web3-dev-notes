// pages/posts/[slug].tsx
import { useRouter } from 'next/router'

export default function PostDetail() {
  const { query } = useRouter()
  const slug = query.slug as string
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">正在查看文章：{slug}</h1>
      <p>这里是文章的具体内容...</p>
    </div>
  )
}