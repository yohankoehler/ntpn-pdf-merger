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
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <Merger
          files={[
            "http://localhost:3000/pdfs/K.pdf",
            "http://localhost:3000/pdfs/L.pdf",
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
