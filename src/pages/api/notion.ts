import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPublished } from "utils/fetchArticlesFromNotion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ data: await getAllPublished() });
}
