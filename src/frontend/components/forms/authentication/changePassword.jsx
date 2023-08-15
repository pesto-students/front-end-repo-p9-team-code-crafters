import {Form, Input} from "antd";
import {func, bool} from "prop-types";
import {FormWrapper} from "../../wrappers";

export const ChangePasswordForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="changePassword"
      submitBtnText="Reset Password"
      showCancel={true}
      hideCancelButton={true}
    >
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "enter password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Current Password" />
      </Form.Item>
      <Form.Item
        name="password"
        label="New Password"
        dependencies={["currentPassword"]}
        rules={[
          {
            required: true,
            message: "enter new password!",
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue("currentPassword") !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("new password should be different!")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
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

ChangePasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
