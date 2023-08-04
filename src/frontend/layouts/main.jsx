import {FullPageLoader, MainFooter, MainHeader} from "../components";

export default function MainLayout({children, showLoader}) {
  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <MainHeader />
        <main className="flex items-center justify-center py-12 px-8 mt-16 bg-lightpink">
          {children}
        </main>
        <MainFooter />
      </>
    </>
  );
}
