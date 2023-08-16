import {Button, Form} from "antd";
import {bool, func, object, string} from "prop-types";

export const FormWrapper = ({
  handleSubmit,
  isLoading,
  showSubmit = true,
  formName,
  submitBtnText,
  children,
  initialValues,
  showCancel,
  hideCancelButton = false,
  onCancelClick,
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
      initialValues={initialValues}
    >
      {children}

      {showSubmit && !showCancel ? (
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
      ) : null}

      {showSubmit && showCancel ? (
        <div className="flex flex-col md:flex-row items-center w-full">
          <Form.Item className="w-full md:w-auto md:mb-0 md:mr-4">
            <Button
              disabled={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full md:w-40"
            >
              {submitBtnText}
            </Button>
          </Form.Item>
          {hideCancelButton ? null : (
            <Form.Item className="w-full md:w-auto mb-0">
              <Button
                disabled={isLoading}
                onClick={onCancelClick}
                className="w-full md:w-40 border-pink text-pink"
              >
                Cancel
              </Button>
            </Form.Item>
          )}
        </div>
      ) : null}
    </Form>
  );
};

FormWrapper.propTypes = {
  isLoading: bool,
  handleSubmit: func.isRequired,
  showSubmit: bool,
  submitBtnText: string,
  formName: string.isRequired,
  initialValues: object,
  showCancel: bool,
  onCancelClick: func,
  hideCancelButton: bool,
};
