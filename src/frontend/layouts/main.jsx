import {FullPageLoader, MainFooter, MainHeader} from "../components";
import {bool} from "prop-types";

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

MainLayout.propTypes = {
  showLoader: bool,
};
