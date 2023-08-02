/* eslint-disable @next/next/no-img-element */

export const AuthenticationHeader = () => {
  return (
    <header className="h-16 px-8 fixed top-0 left-0 w-full bg-pink sm:bg-white flex items-center">
      <img className="h-16 w-auto hidden sm:block" src="/logo.svg" alt="logo" />
      <span className="font-semibold text-2xl tracking-wide sm:hidden text-white">
        ImpactHub
      </span>
    </header>
  );
};
