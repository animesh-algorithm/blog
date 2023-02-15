import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import checkEnvironment from "utils/checkEnvironment";
import { getAllPublished, getSinglePost } from "utils/fetchArticlesFromNotion";
import Image from "next/image";
import Link from "next/link";

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
        {/* Thumbnail - Make it responsive */}
        <Image
          src={article?.metadata.thumbnail}
          width={1280}
          height={720}
          alt={article?.metadata.title}
          className="rounded-lg shadow-lg
          text-center
          dark:shadow-none
          dark:rounded-lg
          dark:border-none
          dark:border-gray-800
          dark:border-opacity-20
          dark:bg-gray-800
          dark:bg-opacity-20
          dark:hover:bg-opacity-40
          dark:hover:shadow-lg
          dark:hover:border-opacity-40
          dark:transition-all
          dark:duration-300
          dark:ease-in-out
          "
        />
        <section
          className="
          text-center
        "
        >
          <h1 className="m-4 mt-8 text-5xl font-bold text-gray-800 dark:text-gray-100">
            {article?.metadata.title}
          </h1>
          <div
            className="
          lg:flex lg:flex-row md:flex md:flex-row justify-center items-center
          "
          >
            <Link
              href="https://www.linkedin.com/in/animesharma3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-row justify-center items-center text-center">
                <Image
                  src="/rain.jpeg"
                  width={50}
                  height={50}
                  alt="Animesh Sharma"
                  className="rounded-full"
                />
                <p
                  className="m-2 mt-1 mr-3 text-lg text-gray-600 dark:text-gray-400
                hover:text-gray-800 dark:hover:text-gray-200
                "
                >
                  Animesh Sharma
                </p>
              </div>
            </Link>
            <span
              className="
              invisible md:visible
             "
            >
              •
            </span>
            <p className="sm:m-1 md:m-4 sm:mt-1 md:mt-3 md:ml-3 lg:ml-3 ml-3 text-lg text-gray-600 dark:text-gray-400">
              {article?.metadata.date}
            </p>
          </div>

          <div
            className="
            m-4
           "
          >
            {article?.metadata?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-full dark:text-gray-400 dark:bg-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section
          className="m-4 mt-6 prose prose-xl text-gray-800 dark:text-gray-400 prose-headings:text-gray-700 prose-headings:dark:text-gray-300 prose-code:dark:text-gray-300 prose-strong:dark:text-gray-300 prose-em:dark:text-gray-300 prose-a:dark:text-gray-300 prose-a:hover:dark:text-gray-300 prose-a:active:dark:text-gray-300 prose-a:focus:dark:text-gray-300 prose-a:visited:dark:text-gray-300 prose-a:link:dark:text-gray-300 max-w-none break-words
        "
        >
          <ReactMarkdown className="leading-8">
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
  const item = await getSinglePost(slug as string);
  return {
    props: {
      item,
    },
  };
};

export const getStaticPaths = async () => {
  const articles = await getAllPublished();
  const paths = articles?.map((article: any) => {
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
