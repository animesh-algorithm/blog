import Head from "next/head";
import Header from "components/Header";
import React from "react";
import Articles from "components/Articles";
import fetchArticles from "utils/fetchArticles";
import ubuntu from "utils/loadFonts";

interface Props {
  items: any;
}

const Home: React.FC<Props> = ({ items }) => {
  const [articles, setArticles] = React.useState(items);
  React.useEffect(() => {
    fetchArticles().then((articles) => setArticles(articles));
  }, [articles]);
  return (
    <>
      <Head>
        <title>Animesh Sharma - Blog</title>
        <meta name="title" content="Animesh Sharma Blog" />
        <meta name="description" content="Animesh Sharma Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.animesharma3.com" />
        <meta property="og:title" content="Animesh Sharma Blog" />
        <meta property="og:description" content="Animesh Sharma Blog" />
        <meta property="twitter:url" content="https://blog.animesharma3.com" />
        <meta property="twitter:title" content="Animesh Sharma Blog" />
        <meta property="twitter:description" content="Animesh Sharma Blog" />
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="animesh sharma blog, programming, development, data science, tutorials, technology, trends, insights, animesh sharma, animesharma3, programming courses, programming tutorials,web development courses, web development tutorials,javascript courses, html courses, web design courses,web design tutorials, learn web development, free programming courses"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="icon" href="/rain.jpeg" />
      </Head>
      <main
        className={`
          ${ubuntu.className}
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
  const items = await fetchArticles();
  return {
    props: {
      items,
    },
  };
};

export default Home;
