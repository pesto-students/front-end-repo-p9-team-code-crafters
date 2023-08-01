import {verifyUser} from "../services";
import {
  AuthenticationFooter,
  AuthenticationHeader,
  AuthenticationLayoutSkeleton,
  FullPageLoader,
} from "../components";
import {useMutation} from "@tanstack/react-query";

export default function AuthenticationLayout({children, showLoader}) {
  const {isLoading} = useMutation({
    mutationFn: (authData) => verifyUser(authData),
  });
  // useEffect(() => {
  //   const authToken = getAuthToken();
  //   if (authToken) {
  //     mutate({data: authToken});
  //   }
  // }, []);
  // console.log(data, isLoading);

  if (isLoading) return <AuthenticationLayoutSkeleton />;

  return (
    <>
      {showLoader ? <FullPageLoader /> : null}
      <>
        <AuthenticationHeader />
        <main className="flex flex-col items-center justify-center p-6 mt-16 bg-lightpink">
          {children}
        </main>
        <AuthenticationFooter />
      </>
    </>
  );
}
