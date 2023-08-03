import {Button, Form, Input} from "antd";
import Link from "next/link";

export const SigninForm = ({handleSubmit, isLoading}) => {
  const [loginForm] = Form.useForm();
  const onFinish = (values) => {
    handleSubmit(values, loginForm);
  };
  return (
    <Form
      form={loginForm}
      layout="vertical"
      requiredMark={false}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
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
      <Link href="/">Forgot your password?</Link>

      <p className="text-center text-lightgray text-xs mt-4 mb-6">
        By continuing, you agree to the ImpactHub terms of service and privacy
        notice.
      </p>

      <Form.Item>
        <Button
          disabled={isLoading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};
