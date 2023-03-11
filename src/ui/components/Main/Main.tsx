import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-fit-vertically">
      <div className="container px-10 mx-auto max-w-1520 sc-1400:max-w-1113">
        {children}
      </div>
    </main>
  );
};