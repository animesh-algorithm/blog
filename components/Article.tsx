import Link from "next/link";
import React from "react";
import ubuntu from "utils/loadFonts";
interface Props {
  article: any;
}

const Article: React.FC<Props> = ({ article }) => {
  return (
    <article
      className={`${ubuntu.className} flex flex-col justify-center w-full mb-10`}
    >
      {/* Title */}
      <Link href={`/article/${article.fields.slug}`}>
        <h1
          className="
          text-4xl
          font-bold
          hover:underline
        "
        >
          {article.fields.title}
        </h1>
      </Link>

      {/* Created At */}
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {new Date(article.fields.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Tags */}
      <div className="flex flex-row justify-start items-center mt-2">
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

      {/* Article Preview */}
      <div className="mt-4 text-md leading-relaxed text-gray-800 dark:text-gray-300 ">
        {article.fields.summary}
        {/* Read More */}
        <br />
        <Link href={`/article/${article.fields.slug}`}>
          <span className="text-blue-500 hover:underline">Read More</span>
        </Link>
      </div>
    </article>
  );
};

export default Article;
