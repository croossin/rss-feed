// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";
const parser = new Parser();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  // Check that the user is authorized, if not return 401
  if (!user) return res.status(401).json({ status: "unauthorized" });

  // Grab all of their links
  const { data } = await supabaseServerClient
    .from("links")
    .select("*")
    .filter("user_id", "eq", user.id);

  const rssLinks = data?.map((obj) => obj.link);

  const rssItems = await Promise.allSettled(
    (rssLinks ?? []).map((link) => parser.parseURL(link))
  );

  // @ts-ignore
  res.status(200).json({ feed: rssItems.map((item) => item.value) });
}
