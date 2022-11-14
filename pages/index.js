import Head from "next/head";
import Merger from "@components/Merger";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Merger files={[]} />
      </main>
    </div>
  );
}
