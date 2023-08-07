import {Button, Form} from "antd";
import {bool, func, string} from "prop-types";

export const FormWrapper = ({
  handleSubmit,
  isLoading,
  showSubmit = true,
  formName,
  submitBtnText,
  children,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleSubmit(values, form);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      name={formName}
      onFinish={onFinish}
      autoComplete="off"
      size="large"
    >
      {children}

      {showSubmit && (
        <Form.Item>
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {submitBtnText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

FormWrapper.propTypes = {
  isLoading: bool,
  handleSubmit: func.isRequired,
  showSubmit: bool,
  submitBtnText: string,
  formName: string.isRequired,
};
