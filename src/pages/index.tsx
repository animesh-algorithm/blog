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
        <title>Animesh Sharma Blog</title>
        <meta
          name="description"
          content="Get the latest insights and tutorials on programming, development, and data science. Stay up-to-date with the latest trends and technologies."
        />
        <meta
          name="keywords"
          content="programming, development, data science, tutorials, technology, trends, insights, animesh sharma"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Animesh Sharma" />
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
