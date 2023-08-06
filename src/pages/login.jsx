import {SigninForm} from "@/frontend/components";
import AuthenticationLayout from "@/frontend/layouts/authentication";
import {login} from "@/frontend/services";
import {saveAuthToken} from "@/frontend/utlis";
import {useMutation} from "@tanstack/react-query";
import {Typography, message} from "antd";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Login() {
  const router = useRouter();
  const {isLoading, mutate: mutateSignin} = useMutation({
    mutationKey: "login",
    mutationFn: (data) => login(data),
  });
  const handleLogin = (values, form) => {
    mutateSignin(values, {
      onSuccess: (data) => {
        saveAuthToken(data.data);
        form.resetFields();
        message.success("Login Successfull!");
        router.push("/");
      },
      onError: (error) => {
        message.error(error);
      },
    });
  };
  return (
    <AuthenticationLayout showLoader={isLoading}>
      <div className="w-full md:max-w-md lg:max-w-lg md:p-6 md:bg-white flex flex-col items-center">
        <Image
          className="mb-6 hidden md:block"
          src="/user-avatar.svg"
          width={160}
          height={160}
          alt="user"
        />
        <Image
          className="mb-6 md:hidden"
          src="/user-avatar-white-bg.svg"
          width={100}
          height={100}
          alt="user"
        />
        <h2 className="text-center mb-6">Sign in</h2>
        <div className="flex items-center mb-6">
          <Typography.Text className="mr-2">
            Dont have an account?
          </Typography.Text>
          <Link href="/signup">Sign up</Link>
        </div>
        <div className="w-full">
          <SigninForm handleSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </AuthenticationLayout>
  );
}
