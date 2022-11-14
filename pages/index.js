import Head from "next/head";
import Merger from "@components/Merger";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Collage PDF maker NT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Merger files={[]} />
      </main>
    </div>
  );
}
