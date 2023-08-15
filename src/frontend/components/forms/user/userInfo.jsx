import {DatePicker, Form, Input} from "antd";
import {func, bool, object} from "prop-types";
import {FormWrapper} from "../../wrappers";

export const UserInfoForm = ({
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
        name="name"
        label="Name"
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
        label="Email"
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
        <Input disabled placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        name="contact"
        label="Contact"
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
        label="Date of Birth"
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
    </FormWrapper>
  );
};

UserInfoForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
  initialValues: object,
  showCancel: bool,
  onCancelClick: func,
};
