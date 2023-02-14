import React, { useEffect } from "react";
import Article from "./Article";

interface Props {
  articles: any;
}

const Articles: React.FC<Props> = ({ articles }) => {
  return (
    <section
      className={`mt-8 ml-2 flex flex-col justify-center w-full px-4 py-4`}
    >
      {articles?.map((article: any) => (
        <Article key={article.slug} article={article} />
      ))}
    </section>
  );
};

export default Articles;
