import Link from "next/link";
import React from "react";
interface Props {
  article: any;
}

const Article: React.FC<Props> = ({ article }) => {
  return (
    <article
      className={`flex flex-col justify-center w-full mb-10 text-justify`}
    >
      {/* Title */}
      <Link href={`/article/${article?.slug}`}>
        <h1 className="text-4xl font-bold hover:underline">{article?.title}</h1>
      </Link>

      {/* Created At */}
      <p className="mt-2 text-gray-600 dark:text-gray-400">{article?.date}</p>

      {/* Tags */}
      <div className="flex flex-row flex-wrap items-center justify-start mt-2">
        {article?.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-full dark:text-gray-400 dark:bg-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Article Preview */}
      <div className="mt-4 leading-relaxed text-justify text-gray-800 text-md dark:text-gray-400 ">
        {article?.description.split(" ").slice(0, 50).join(" ")}...
        {/* Read More */}
        <br />
        <Link href={`/article/${article?.slug}`}>
          <span className="text-blue-500 hover:underline">Read More</span>
        </Link>
      </div>
    </article>
  );
};

export default Article;
