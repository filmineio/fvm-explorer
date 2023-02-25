import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-calc">
      <div className="container mx-auto px-10 sm:px-20 max-w-2xl">
        {children}
      </div>
    </main>
  );
};