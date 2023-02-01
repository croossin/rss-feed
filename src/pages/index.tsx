import { Container } from "@/components/common/Container";
import { Layout } from "@/components/common/Layout";
import AddFeedModal from "@/components/feed/AddFeedModal";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const user = useUser();
  const [addFeedOpen, setAddFeedOpen] = useState(false);

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
          <AddFeedModal open={addFeedOpen} setOpen={setAddFeedOpen} />
          <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <Container>
              <div className="flex flex-row">
                <h1 className="text-2xl font-bold leading-7 text-slate-900 flex-grow">
                  Feed
                </h1>
                <div>
                  <div
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 hover:cursor-pointer"
                    onClick={() => {
                      setAddFeedOpen(true);
                    }}
                  >
                    <span className="sr-only">Add RSS Feed</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
              </div>
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
