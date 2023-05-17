import type { NextApiRequest, NextApiResponse } from "next";
import { summarize } from "utils/summarizeArticle";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.body;
  res.status(200).json({ summary: await summarize(text) });
}
