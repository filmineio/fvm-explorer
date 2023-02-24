import Link from "next/link";
import { FC } from "react";
import LogoDevStorageBlack from "@/ui/components/Common/Icons/LogoDevStorageBlack";

export const Footer: FC = () => {
  return (
    <footer className="px-5 py-6 border-t border-body">
      <div className="flex flex-wrap justify-between items-center m-auto">
        <Link href="/">
          <LogoDevStorageBlack />
        </Link>
        <p className="text-gray-text text-xs font-medium leading-4 font-space">
          © Filexplore 2023.
        </p>
      </div>
    </footer>
  );
};