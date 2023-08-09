import {Form, Input} from "antd";
import {func, bool} from "prop-types";
import {FormWrapper} from "../../wrappers";

export const CreateFundraiserForm = ({handleSubmit, isLoading}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="createFundraiser"
      submitBtnText="Create"
    >
      <Form.Item
        name="title"
        rules={[
          {
            min: 10,
            message: "invalid title!",
          },
          {
            required: true,
            message: "please enter title!",
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>
    </FormWrapper>
  );
};

CreateFundraiserForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
};
