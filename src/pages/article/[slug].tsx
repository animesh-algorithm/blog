import React from "react";
import fetchArticles from "utils/fetchArticles";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import ubuntu from "utils/loadFonts";

interface Props {
  item: any;
}

const ArticleDetail: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = React.useState(item);

  React.useEffect(() => {
    if (slug) {
      fetchArticles().then((articles) => {
        const article = articles.find(
          (article: any) => article.fields.slug === slug
        );
        setArticle(article);
      });
    }
  }, [article]);
  return (
    <>
      <Head>
        <title>{article?.fields.title}</title>
        <meta name="description" content={article?.fields.summary} />
        <meta name="keywords" content={article?.fields.tags} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
      </Head>
      <article
        className={`${ubuntu.className} min-h-screen container mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4`}
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 m-4 mt-8">
          {article.fields.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 m-4 mt-1 text-lg">
          {new Date(article.fields.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="flex flex-row justify-start items-center mt-2 m-4">
          {article.fields.tags.map((tag: string) => (
            <span
              key={tag}
              className="
              text-sm
              font-semibold
              text-gray-600
              dark:text-gray-400
              bg-gray-200
              dark:bg-gray-800
              rounded-full
              px-2
              py-1
              mr-2
            "
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-6 text-gray-800 dark:text-gray-400 m-4">
          <ReactMarkdown
            className=" 
            leading-8
            text-gray-800 dark:text-gray-400 
            prose prose-xl
            prose-headings:text-gray-700
            prose-headings:dark:text-gray-300
            prose-code:dark:text-gray-300
            prose-strong:dark:text-gray-300
            prose-em:dark:text-gray-300
            prose-a:dark:text-gray-300
            prose-a:hover:dark:text-gray-300
            prose-a:active:dark:text-gray-300
            prose-a:focus:dark:text-gray-300
            prose-a:visited:dark:text-gray-300
            prose-a:link:dark:text-gray-300
            prose-a:link:dark:text-gray-300   
          "
          >
            {article.fields.body}
          </ReactMarkdown>
        </section>
      </article>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;
  const items = await fetchArticles();
  const item = items.find((item: any) => item.fields.slug === slug);
  return {
    props: {
      item,
    },
  };
};

export const getStaticPaths = async () => {
  const articles = await fetchArticles();
  const paths = articles.map((article: any) => {
    return {
      params: { slug: article.fields.slug },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default ArticleDetail;
