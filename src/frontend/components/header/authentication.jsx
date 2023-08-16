/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */

import {useRouter} from "next/router";

export const AuthenticationHeader = () => {
  const router = useRouter();
  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink sm:bg-white flex items-center">
      <img
        onClick={() => router.push("/")}
        className="h-16 w-auto hidden sm:block cursor-pointer"
        src="/logo.svg"
        alt="logo"
      />
      <span
        onClick={() => router.push("/")}
        className="font-semibold text-2xl tracking-wide sm:hidden text-white cursor-pointer"
      >
        ImpactHub
      </span>
    </header>
  );
};
