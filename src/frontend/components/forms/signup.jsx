import {Button, DatePicker, Form, Input} from "antd";

export const SignupForm = ({handleSubmit, isLoading}) => {
  const [signupForm] = Form.useForm();
  const onFinish = (values) => {
    handleSubmit(values, signupForm);
  };
  return (
    <Form
      form={signupForm}
      layout="vertical"
      requiredMark={false}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
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
        name="contact"
        rules={[
          {
            required: true,
            message: "enter contact number!",
          },
          {
            pattern: /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/,
            message: "invalid contact number!",
          },
        ]}
      >
        <Input placeholder="Contact Number" />
      </Form.Item>

      <Form.Item
        name="dob"
        rules={[
          {
            type: "object",
            required: true,
            message: "select date!",
          },
        ]}
      >
        <DatePicker className="w-full" placeholder="Date of Birth" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "enter password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "confirm your password!",
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <p className="text-center text-lightgray text-xs mb-6">
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
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};
