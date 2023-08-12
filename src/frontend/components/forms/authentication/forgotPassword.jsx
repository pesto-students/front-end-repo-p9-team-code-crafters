import {Form, Input} from "antd";
import {func, bool} from "prop-types";
import {FormWrapper} from "../../wrappers";

export const ForgotPasswordForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="forgotPassword"
      submitBtnText="Send Email"
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
    </FormWrapper>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
