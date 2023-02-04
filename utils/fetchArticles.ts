import { createClient } from "contentful";

const fetchArticles = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY!,
  });
  const res = await client.getEntries({
    content_type: "article",
  });
  return res.items;
};

export default fetchArticles;
