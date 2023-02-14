import type { NextApiRequest, NextApiResponse } from "next";
import { getSinglePost } from "utils/fetchArticlesFromNotion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  res.status(200).json({ data: await getSinglePost(slug as string) });
}
