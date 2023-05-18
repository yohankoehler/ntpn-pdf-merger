import Head from "next/head";
import Merger from "@components/Merger";

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>HTML 5 Boilerplate</title>
        <title>Collage PDF maker NT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Merger files={[]} />
      </main>
    </div>
  );
}
