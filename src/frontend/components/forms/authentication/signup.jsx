import {DatePicker, Form, Input} from "antd";
import {func, bool} from "prop-types";
import {FormWrapper} from "../../wrappers";
import dayjs from "dayjs";

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

export const SignupForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="signup"
      submitBtnText="Sign up"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
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
        <DatePicker
          disabledDate={disabledDate}
          className="w-full"
          placeholder="Date of Birth"
        />
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
    </FormWrapper>
  );
};

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
