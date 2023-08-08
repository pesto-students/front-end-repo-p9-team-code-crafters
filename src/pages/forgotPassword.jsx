import {ForgotPasswordForm} from "@/frontend/components";
import AuthenticationLayout from "@/frontend/layouts/authentication";
import {forgotPassword} from "@/frontend/services";
import {useMutation} from "@tanstack/react-query";
import {Button, Result, Typography, message} from "antd";
import Link from "next/link";
import {useState} from "react";
import {SmileOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

export default function ForgotPassword() {
  const router = useRouter();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const {isLoading, mutate: mutateSignin} = useMutation({
    mutationKey: "forgotPassword",
    mutationFn: (data) => forgotPassword(data),
  });
  const handleForgotPassword = (values, form) => {
    mutateSignin(values, {
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
        setIsEmailSent(true);
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
        {isEmailSent ? (
          <Result
            icon={<SmileOutlined className="text-pink" />}
            title="We have sent you an email to help you reset your password!"
            extra={
              <Button onClick={() => router.push("/login")} type="primary">
                Go to Login
              </Button>
            }
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </AuthenticationLayout>
  );
}
