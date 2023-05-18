import Head from "next/head";
import Merger from "@components/Merger";
import localFont from '@next/font/local';
const myFont = localFont({ src: './Ntpn-Regular.ttf' });
export default function Home() {
  return (
    <div>
      <Head>
        <title>Collage PDF maker NT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={myFont.className}>
        <Merger files={[]} />
      </main>
    </div>
  );
}
