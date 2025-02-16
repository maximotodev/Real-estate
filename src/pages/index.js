import Head from 'next/head';
import HomePage from './home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Real Estate </title>
        <meta name="description" content="Real Estate Platform - Browse, book, and manage properties" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <HomePage />
        </div>
      </main>
    </>
  );
}
