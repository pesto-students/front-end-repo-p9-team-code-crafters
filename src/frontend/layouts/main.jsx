import {FullPageLoader, MainFooter, MainHeader} from "../components";

export default function MainLayout({children, showLoader}) {
  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <MainHeader />
        <main className="flex items-center justify-center mt-16 flex-col">
          {children}
        </main>
        <MainFooter />
      </>
    </>
  );
}
