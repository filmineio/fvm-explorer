import Link from "next/link";
import { FC } from "react";
import LogoDevStorageWhite from "@/ui/components/Common/Icons/LogoDevStorageWhite";

export const Footer: FC = () => {
  return (
    <footer className="px-5 py-6 border-t border-body">
      <div className="flex flex-wrap justify-between items-center m-auto">
        <Link href="/">
          <a>
            <LogoDevStorageWhite />
          </a>
        </Link>
        <p className="text-gray-text text-xs font-medium leading-4 font-space">
          © Dev.storage 2023.
        </p>
      </div>
    </footer>
  );
};