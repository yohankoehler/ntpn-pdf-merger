import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Merger from "@components/Merger";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Merger
          files={[
            // "http://localhost:3000/pdfs/K.pdf",
            // `${window.location.protocol}//${window.location.host}/pdfs/L.pdf`,
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
