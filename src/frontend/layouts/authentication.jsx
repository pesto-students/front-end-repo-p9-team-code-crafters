import {
  AuthenticationFooter,
  AuthenticationHeader,
  FullPageLoader,
} from "../components";
import {bool} from "prop-types";
export default function AuthenticationLayout({children, showLoader}) {
  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <AuthenticationHeader />
      <main className="flex items-center justify-center py-12 px-8 mt-16 bg-lightpink min-h-mainLayout">
        {children}
      </main>
      <AuthenticationFooter />
    </>
  );
}

AuthenticationLayout.propTypes = {
  showLoader: bool,
};
