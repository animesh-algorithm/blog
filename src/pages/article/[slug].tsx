import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import checkEnvironment from "utils/checkEnvironment";
import { getAllPublished, getSinglePost } from "utils/fetchArticlesFromNotion";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

import remarkGfm from "remark-gfm";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import Summary from "components/Summary";

interface Props {
  item: any;
}

const ArticleDetail: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = React.useState(item);
  const [clicked, setClicked] = React.useState(false);

  const summarizeArticle = async () => {
    // POST request to /api/summarize
    setClicked(true);
    // setArticle((article: any) => {
    //   return {
    //     ...article,
    //     summary: "Generating Summary...",
    //   };
    // });
    // const response = await fetch(checkEnvironment().concat("/api/summarize"), {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     text: article?.markdown,
    //   }),
    // });
    // const { summary } = await response.json();
    // setArticle((article: any) => {
    //   return {
    //     ...article,
    //     summary,
    //   };
    // });
  };

  // React.useEffect(() => {
  //   const intervedId = setInterval(async () => {
  //     try {
  //       const res = await fetch(
  //         checkEnvironment().concat(`/api/notion/article?slug=${slug}`)
  //       );
  //       const article = await res.json();
  //       setArticle(article["data"]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, 60000);

  //   return () => clearTimeout(intervedId);
  // }, []);

  return (
    <>
      <Head>
        <title>{article?.metadata.title}</title>
        <meta name="description" content={article?.metadata.description} />
        <meta name="keywords" content={article?.metadata.tags} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
        <meta
          name="image"
          property="og:image"
          content={article?.metadata.thumbnail}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://blog.animesharma3.com/${article?.metadata.slug}`}
        />
        <meta property="og:title" content={article?.metadata.title} />
        <meta
          property="og:description"
          content={article?.metadata.description}
        />
        <link rel="preload" as="image" href={article?.metadata.thumbnail} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3628126824154315"
          crossOrigin="anonymous"
        />
      </Head>
      <article
        className={`min-h-screen text-justify container mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4`}
      >
        {/* Thumbnail - Make it responsive */}
        <Image
          src={article?.metadata.thumbnail}
          width={1280}
          height={720}
          alt={article?.metadata.title}
          className="text-center rounded-lg shadow-lg dark:shadow-none dark:rounded-lg dark:border-none dark:border-gray-800 dark:border-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 dark:hover:bg-opacity-40 dark:hover:shadow-lg dark:hover:border-opacity-40 dark:transition-all dark:duration-300 dark:ease-in-out "
        />
        <section className="text-center ">
          <h1 className="m-4 mt-8 text-5xl font-bold text-gray-800 break-words dark:text-gray-100">
            {article?.metadata.title}
          </h1>
          <div className="items-center justify-center lg:flex lg:flex-row md:flex md:flex-row">
            <Link
              href="https://www.linkedin.com/in/animesharma3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-row items-center justify-center text-center">
                <Image
                  src="/rain.jpeg"
                  width={50}
                  height={50}
                  alt="Animesh Sharma"
                  className="rounded-full"
                />
                <p className="m-2 mt-1 mr-3 text-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 ">
                  Animesh Sharma
                </p>
              </div>
            </Link>
            <span className="invisible md:visible">•</span>
            <p className="ml-3 text-lg text-gray-600 sm:m-1 md:m-4 sm:mt-1 md:mt-3 md:ml-3 lg:ml-3 dark:text-gray-400">
              {article?.metadata.date}
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-center m-4">
            {article?.metadata?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-full dark:text-gray-400 dark:bg-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="space-x-1 text-center ">
            <FacebookShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              quote={article?.metadata.title}
              hashtag="#animeshsharma"
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              title={article?.metadata.title}
              hashtags={["animeshsharma"]}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              title={article?.metadata.title}
              summary={article?.metadata.description}
              source="https://blog.animesharma3.com"
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <RedditShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              title={article?.metadata.title}
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
            <WhatsappShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              title={article?.metadata.title}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
              url={`https://blog.animesharma3.com/${article?.metadata.slug}`}
              subject={article?.metadata.title}
              body={article?.metadata.description}
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
        </section>

        {/* Summarize */}
        <section>
          {/* Summarize Button */}
          <div className="flex flex-row items-center justify-center m-4">
            <button
              className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={summarizeArticle}
            >
              Click here to Summarize
            </button>
          </div>
          {/* Summarize Text */}
          {clicked && <Summary summary={article?.metadata.description} />}
        </section>

        <section className="m-4 mt-6 prose prose-xl text-gray-800 break-words dark:text-gray-400 prose-headings:text-gray-700 prose-headings:dark:text-gray-300 prose-code:dark:text-gray-300 prose-strong:dark:text-gray-300 prose-em:dark:text-gray-300 prose-a:dark:text-gray-300 prose-a:hover:dark:text-gray-300 prose-a:active:dark:text-gray-300 prose-a:focus:dark:text-gray-300 prose-a:visited:dark:text-gray-300 prose-a:link:dark:text-gray-300 prose-table:dark:text-blue-500 max-w-none prose-blockquote:dark:text-gray-300 prose-blockquote:font-bold prose-img:mx-auto prose-img:shadow-lg prose-img:dark:shadow-none prose-img:dark:rounded-lg prose-img:dark:border-none prose-img:dark:border-gray-800 prose-img:dark:border-opacity-20 prose-img:dark:bg-gray-800 prose-img:dark:bg-opacity-20 prose-img:dark:hover:bg-opacity-40 prose-img:dark:hover:shadow-lg prose-img:dark:hover:rounded-lg prose-img:dark:hover:border-opacity-40 prose-img:dark:hover:ring-2 prose-img:dark:hover:ring-offset-2 prose-img:dark:hover:ring-offset-gray-800 prose-img:dark:hover:ring-offset-opacity-20 prose-img:dark:hover:ring-gray-300 prose-img:dark:hover:ring-opacity-60 prose-img:dark:hover:ring-inset ">
          <ReactMarkdown
            className="leading-8 text-justify"
            remarkPlugins={[remarkGfm]}
          >
            {article?.markdown}
          </ReactMarkdown>
        </section>
      </article>
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
    revalidate: 10,
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
