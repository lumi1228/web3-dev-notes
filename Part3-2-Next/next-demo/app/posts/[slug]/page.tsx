// app/posts/[slug]/page.tsx

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 将组件改为 async 函数，以便使用 await
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // 模拟 2 秒的数据获取延迟
  await sleep(2000);

  return (
    <div>
      <h1>正在查看文章：{slug}</h1>
      <p>这里是文章的具体内容...</p>
    </div>
  )
}