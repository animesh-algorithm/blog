import { useEffect, useRef, useState } from "react";

const Summary = ({ summary }: { summary: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const intervalIdRef = useRef<number | null>(null);
  useEffect(() => {
    setCurrentWordIndex(0);
  }, [summary]);

  useEffect(() => {
    // Clear the interval if it exists when the component is unmounted or when the SQL query changes.
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [summary]);
  useEffect(() => {
    if (currentWordIndex < summary.split(" ").length) {
      // Set up the interval if it doesn't exist yet.
      if (!intervalIdRef.current) {
        intervalIdRef.current = window.setInterval(() => {
          setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
        }, 100);
      }
    } else {
      // Clear the interval when we reach the end of the SQL query.
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }
  }, [currentWordIndex, summary]);

  const words = summary.split(" ");
  const currentWords = words.slice(0, currentWordIndex);

  return (
    <article className="m-4 leading-relaxed text-gray-800 text-justify text-md dark:text-gray-400">
      {currentWords.join(" ")}
    </article>
  );
};

export default Summary;
