import {Form, Input} from "antd";
import {func, bool} from "prop-types";
import Link from "next/link";
import {FormWrapper} from "../wrappers";

export const SigninForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="login"
      submitBtnText="Sign in"
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "invalid email!",
          },
          {
            required: true,
            message: "enter email!",
          },
        ]}
      >
        <Input placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        name="password"
        className="mb-2"
        rules={[
          {
            required: true,
            message: "enter password!",
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Link href="/forgotPassword">Forgot your password?</Link>
      <p className="text-center text-lightgray text-xs mt-4 mb-6">
        By continuing, you agree to the ImpactHub terms of service and privacy
        notice.
      </p>
    </FormWrapper>
  );
};

SigninForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
