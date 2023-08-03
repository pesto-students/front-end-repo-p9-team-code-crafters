import {
  AuthenticationFooter,
  AuthenticationHeader,
  FullPageLoader,
} from "../components";

export default function AuthenticationLayout({children, showLoader}) {
  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <AuthenticationHeader />
      <main className="flex items-center justify-center py-12 px-8 mt-16 bg-lightpink">
        {children}
      </main>
      <AuthenticationFooter />
    </>
  );
}
