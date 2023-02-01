import { Container } from "@/components/common/Container";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>rss.roo.app</title>
        <meta name="description" content="RSS Feed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
          <Container>
            <h1 className="text-2xl font-bold leading-7 text-slate-900">
              Episodes
            </h1>
          </Container>
          <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
            <div>howdy yall</div>
          </div>
        </div>
      </main>
    </>
  );
}
