import {Button, Form, Input} from "antd";

export const ForgotPasswordForm = ({handleSubmit, isLoading}) => {
  const [forgotPasswordForm] = Form.useForm();
  const onFinish = (values) => {
    handleSubmit(values, forgotPasswordForm);
  };
  return (
    <Form
      form={forgotPasswordForm}
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

      <Form.Item>
        <Button
          disabled={isLoading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Send Email
        </Button>
      </Form.Item>
    </Form>
  );
};
