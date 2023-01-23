import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="px-8 py-4 border-t border-gray-dark">
      <div className="flex flex-wrap justify-between items-center m-auto max-w-2xl">
        <Link href="/">
          <img
            src="/images/logomain.png"
            className="h-31 w-155"
            alt={"filexplore"}
          />
        </Link>
        <p className="text-gray-text text-xs font-medium leading-4 font-mono1">
          © Filexplore 2022.
        </p>
      </div>
    </footer>
  );
};