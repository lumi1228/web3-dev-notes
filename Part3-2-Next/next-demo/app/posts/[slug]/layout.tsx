// app/(admin)/layout.tsx
import Link from 'next/link'

// layout 组件的参数是一个对象，包含了被包裹的页面内容 children
// 参照官方文档 https://nextjs.org/docs/app/api-reference/file-conventions/layout#layout-props-helper
export default function AdminLayout({
  children, // `children` 代表被这个布局包裹的页面内容
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen bg-gray-900 text-white">
      <nav className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-lg mb-4">文章管理</h2>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </section>
  )
}