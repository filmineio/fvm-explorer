import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex-grow">
      <div className="container px-10 mx-auto max-w-1520">
        {children}
      </div>
    </main>
  );
};