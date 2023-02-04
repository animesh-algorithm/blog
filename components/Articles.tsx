import React, { useEffect } from "react";
import fetchArticles from "utils/fetchArticles";
import Article from "./Article";
import ubuntu from "utils/loadFonts";

interface Props {
  articles: any;
}

const Articles: React.FC<Props> = ({ articles }) => {
  return (
    <section
      className={`${ubuntu.className} mt-8 ml-2 flex flex-col justify-center w-full px-4 py-4`}
    >
      {articles?.map((article: any) => (
        <Article key={article.fields.slug} article={article} />
      ))}
    </section>
  );
};

export default Articles;
