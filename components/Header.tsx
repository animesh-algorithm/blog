import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";

const Header = () => {
  return (
    <header
      className={`flex flex-row justify-between items-center w-full px-4 py-4 mt-4 container mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4
`}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
        <Link href="/">Animesh Sharma's Blog</Link>
      </h1>
      <DarkModeSwitch />
    </header>
  );
};

export default Header;
