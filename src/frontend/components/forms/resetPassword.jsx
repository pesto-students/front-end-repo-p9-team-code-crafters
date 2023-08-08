import {Form, Input} from "antd";
import {func, bool} from "prop-types";
import {FormWrapper} from "../wrappers";

export const ResetPasswordForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="forgotPassword"
      submitBtnText="Submit"
    >
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
    </FormWrapper>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
