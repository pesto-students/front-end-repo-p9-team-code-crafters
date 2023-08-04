import {ForgotPasswordForm} from "@/frontend/components";
import AuthenticationLayout from "@/frontend/layouts/authentication";
import {forgotPassword} from "@/frontend/services";
import {useMutation} from "@tanstack/react-query";
import {Typography, message} from "antd";
import Link from "next/link";

export default function ForgotPassword() {
  const {isLoading, mutate: mutateSignin} = useMutation({
    mutationKey: "forgotPassword",
    mutationFn: (data) => forgotPassword(data),
  });
  const handleForgotPassword = (values, form) => {
    mutateSignin(values, {
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
      },
      onError: (error) => {
        message.error(error);
      },
    });
  };
  return (
    <AuthenticationLayout showLoader={isLoading}>
      <div className="w-full md:max-w-md lg:max-w-lg md:p-6 md:bg-white flex flex-col items-center">
        <h2 className="text-center mb-6">Forgot Password</h2>
        <div className="flex items-center mb-6">
          <Typography.Text className="mr-2">
            Dont you want to Sign in?
          </Typography.Text>
          <Link href="/login">Sign in</Link>
        </div>
        <div className="w-full">
          <ForgotPasswordForm
            isLoading={isLoading}
            handleSubmit={handleForgotPassword}
          />
        </div>
      </div>
    </AuthenticationLayout>
  );
}
