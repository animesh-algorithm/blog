import Head from "next/head";
import React, { useMemo } from "react";
import Articles from "components/Articles";
import checkEnvironment from "utils/checkEnvironment";
import { getAllPublished } from "utils/fetchArticlesFromNotion";
import { keywords } from "utils/keywords";

interface Props {
  items: any;
}

const Home: React.FC<Props> = ({ items }) => {
  const [articles, setArticles] = React.useState(items);
  const AllKeywords = useMemo(() => {
    return keywords;
  }, []);
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(checkEnvironment().concat("/api/notion"));
        const items = await res.json();
        setArticles(items["data"]);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Head>
        <title>Animesh Sharma's Blog</title>
        <meta name="title" content="Animesh Sharma Blog" />
        <meta name="description" content="Animesh Sharma Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.animesharma3.com" />
        <meta property="og:title" content="Animesh Sharma Blog" />
        <meta property="og:description" content="Animesh Sharma Blog" />
        <meta name="image" property="og:image" content="/rain.jpeg" />
        <meta property="twitter:url" content="https://blog.animesharma3.com" />
        <meta property="twitter:title" content="Animesh Sharma Blog" />
        <meta property="twitter:description" content="Animesh Sharma Blog" />
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content={`${
            AllKeywords.length > 0 ? AllKeywords.join(",") : ""
          } animesh sharma blog, animesh sharma, Animesh Sharma, ANIMESH SHARMA, dear dev diary, dev diary, programming, development, data science, tutorials, technology, trends, insights, programming courses, programming tutorials,web development courses, web development tutorials,javascript courses, html courses, web design courses,web design tutorials, learn web development, free programming courses`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`
          min-h-screen
          container mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4
        `}
      >
        {/* Articles */}
        <Articles articles={articles} />
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const items = await getAllPublished();
  return {
    props: {
      items,
    },
    revalidate: 2,
  };
};

export default Home;
