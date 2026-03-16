import type { AppProps } from 'next/app'

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Page = Component as NextPageWithLayout
  const getLayout = Page.getLayout ?? ((page) => page)
  return getLayout(<Page {...pageProps} />)
}