import {Form, InputNumber} from "antd";
import {FormWrapper} from "../../wrappers";
import {bool, func, number} from "prop-types";

export const DonationForm = ({handleSubmit, isLoading, max}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="donate"
      submitBtnText="Donate"
    >
      <Form.Item
        label={<span className="text-lg text-fontBlack">Amount</span>}
        name="amount"
        rules={[
          {
            min: 1,
            type: "number",
            message: "donation cannot be less than 1",
          },
          {
            max: max,
            type: "number",
            message: "donation cannot be more than " + max,
          },
        ]}
      >
        <InputNumber className="w-full" placeholder="Amount" />
      </Form.Item>
    </FormWrapper>
  );
};

DonationForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
  max: number,
};
