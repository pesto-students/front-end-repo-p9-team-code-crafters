import {ResetPasswordForm} from "@/frontend/components";
import AuthenticationLayout from "@/frontend/layouts/authentication";
import {resetPassword, verifyResetPasswordToken} from "@/frontend/services";
import {useMutation} from "@tanstack/react-query";
import {Button, Result, Skeleton, message} from "antd";
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {SmileOutlined} from "@ant-design/icons";

export default function ResetPassword() {
  const router = useRouter();
  const {token} = router.query;

  const {
    isLoading: loadingTokenVerify,
    mutate: mutateVerifyToken,
    isError: doesVerifyTokenHaveError,
    isSuccess: verifyTokenSuccess,
    data: verifiedTokenData,
  } = useMutation({
    mutationKey: "verifyResetPasswordToken",
    mutationFn: (data) => verifyResetPasswordToken(data),
    onError: (error) => {
      message.error(error);
    },
  });

  const {
    isLoading: loadingResetPassword,
    mutate: mutateResetPassword,
    isSuccess: resetPasswordSuccess,
  } = useMutation({
    mutationKey: "resetPassword",
    mutationFn: (data) => resetPassword(data),
    onError: (error) => {
      message.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleResetPassword = (values, form) => {
    mutateResetPassword(
      {
        password: values.password,
        user: verifiedTokenData.user,
        code: verifiedTokenData.code,
      },
      {
        onSuccess: () => {
          message.success("Password reset successfull");
          form.resetFields();
        },
        onError: (error) => {
          message.error(error);
        },
      }
    );
  };

  useEffect(() => {
    if (token) {
      mutateVerifyToken(token);
    }
  }, [token]);

  return (
    <AuthenticationLayout>
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
        <h2 className="text-center mb-6">Reset Password</h2>
        {doesVerifyTokenHaveError ? (
          <Result
            status="error"
            title="The token has expired!"
            subTitle="Please try to signin or request for reset password again"
            extra={[
              <Button
                onClick={() => router.push("/login")}
                type="primary"
                key="login"
              >
                Login
              </Button>,
              <Button
                onClick={() => router.push("/forgotPassword")}
                key="resetpassword"
              >
                Email new link
              </Button>,
            ]}
          />
        ) : null}
        {loadingTokenVerify ? <Skeleton active /> : null}
        {verifyTokenSuccess && !resetPasswordSuccess ? (
          <div className="w-full">
            <ResetPasswordForm
              handleSubmit={handleResetPassword}
              isLoading={doesVerifyTokenHaveError || loadingResetPassword}
            />
          </div>
        ) : null}
        {verifyTokenSuccess && resetPasswordSuccess ? (
          <Result
            icon={<SmileOutlined className="text-pink" />}
            title="Your new password is set!"
            subTitle="Please login to continue!"
            extra={
              <Button onClick={() => router.push("/login")} type="primary">
                Go to Login
              </Button>
            }
          />
        ) : null}
      </div>
    </AuthenticationLayout>
  );
}
