import Head from 'next/head';

import Docs from './docs';

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <Head>
        <title>Text Editor</title>
        <meta name="description" content="Simple Text Editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Docs />
      </main>
    </div>
  )
}
