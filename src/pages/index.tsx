import { Container } from "@/components/common/Container";
import { Layout } from "@/components/common/Layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Home() {
  const user = useUser();
  return (
    <>
      <Head>
        <title>rss.roo.app</title>
        <meta name="description" content="RSS Feed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
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
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
