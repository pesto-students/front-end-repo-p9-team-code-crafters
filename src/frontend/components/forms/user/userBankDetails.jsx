import {Form, Input} from "antd";
import {func, bool, object} from "prop-types";
import {FormWrapper} from "../../wrappers";

export const UserBankDetailsForm = ({
  handleSubmit,
  isLoading,
  initialValues,
  showCancel,
  onCancelClick,
}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="userInfo"
      submitBtnText="Update"
      initialValues={initialValues}
      showCancel={showCancel}
      onCancelClick={onCancelClick}
    >
      <Form.Item
        name="bank_name"
        label="Bank Name"
        rules={[
          {
            required: true,
            message: "Please input your bank name!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Bank Name" />
      </Form.Item>
      <Form.Item
        name="holder_name"
        label="Holder Name"
        rules={[
          {
            required: true,
            message: "Please input bank holder name!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Holder Name" />
      </Form.Item>
      <Form.Item
        name="ifsc"
        label="IFSC code"
        rules={[
          {
            required: true,
            message: "Please input ifsc code!",
            whitespace: true,
          },
          {
            pattern: /^[A-Za-z]{4}0[\dA-Z]{6}$/,
            message: "invalid IFSC code!",
          },
        ]}
      >
        <Input placeholder="IFSC code" />
      </Form.Item>
      <Form.Item
        name="account_number"
        label="Account Number"
        rules={[
          {
            required: true,
            message: "Please input your account number!",
            whitespace: true,
          },
          {
            pattern: /^\d{9,18}$/,
            message: "invalid account number!",
          },
        ]}
      >
        <Input placeholder="Account Number" />
      </Form.Item>
    </FormWrapper>
  );
};

UserBankDetailsForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
  initialValues: object,
  showCancel: bool,
  onCancelClick: func,
};
