import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import checkEnvironment from "utils/checkEnvironment";

interface Props {
  item: any;
}

const ArticleDetail: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = React.useState(item);

  React.useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(
        checkEnvironment().concat("/api/notion/article?slug=" + slug)
      );
      const item = await res.json();
      setArticle(item["data"]);
    }
    if (slug) {
      fetchArticle();
    }
  }, [article]);
  return (
    <>
      <Head>
        <title>{article?.metadata.title}</title>
        <meta name="description" content={article?.metadata.description} />
        <meta name="keywords" content={article?.metadata.tags} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
      </Head>
      <article
        className={`min-h-screen container mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4`}
      >
        <h1 className="m-4 mt-8 text-5xl font-bold text-gray-800 dark:text-gray-100">
          {article.metadata.title}
        </h1>
        <p className="m-4 mt-1 text-lg text-gray-600 dark:text-gray-400">
          {article.metadata.date}
        </p>
        <div className="flex flex-row items-center justify-start m-4 mt-2">
          {article.metadata.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-full dark:text-gray-400 dark:bg-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="m-4 mt-6 text-gray-800 dark:text-gray-400">
          <ReactMarkdown className="leading-8 prose prose-xl text-gray-800 dark:text-gray-400 prose-headings:text-gray-700 prose-headings:dark:text-gray-300 prose-code:dark:text-gray-300 prose-strong:dark:text-gray-300 prose-em:dark:text-gray-300 prose-a:dark:text-gray-300 prose-a:hover:dark:text-gray-300 prose-a:active:dark:text-gray-300 prose-a:focus:dark:text-gray-300 prose-a:visited:dark:text-gray-300 prose-a:link:dark:text-gray-300">
            {article.markdown}
          </ReactMarkdown>
        </section>
      </article>
      <div className="mt-36"></div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;
  const res = await fetch(
    checkEnvironment().concat("/api/notion/article?slug=" + slug)
  );
  const item = await res.json();
  return {
    props: {
      item: item["data"],
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(checkEnvironment().concat("/api/notion"));
  const items = await res.json();
  const articles = items["data"];
  const paths = articles.map((article: any) => {
    return {
      params: { slug: article.slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export default ArticleDetail;
