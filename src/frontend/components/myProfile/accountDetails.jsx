import {Button, Col, Form, Row} from "antd";
import {InfoContainer} from ".";
import {FormWrapper, InputField} from "../wrappers";
import {useState} from "react";
import {object} from "prop-types";

const handleSubmit = () => {};

export const AccountDetails = ({userData}) => {
  const [inEditMode, setInEditMode] = useState(false);
  const {bank_name, holder_name, ifsc, account_number} = userData
    ? userData.bank_details
    : {};
  return (
    <>
      <InfoContainer
        title="Account Details"
        editable={true}
        setInEditMode={setInEditMode}
        inEditMode={inEditMode}
      >
        <FormWrapper
          handleSubmit={handleSubmit}
          // isLoading={isLoading}
          formName="updateBankDetails"
          showSubmit={false}
        >
          <InputField
            name="accountNumber"
            label="Account Number"
            inEditMode={inEditMode}
            rules={[
              {
                required: true,
                message: "Please input your bank account number!",
                whitespace: true,
              },
              {
                pattern: /^\d{9,18}$/,
                message: "invalid account number!",
              },
            ]}
            placeholder="Account Number"
            value={account_number}
          />
          <InputField
            name="ifsc"
            label="IFSC Code"
            inEditMode={inEditMode}
            rules={[
              {
                required: true,
                message: "Please input your bank's IFSC code!",
                whitespace: true,
              },
              {
                pattern: /^[A-Za-z]{4}0[\dA-Z]{6}$/,
                message: "invalid IFSC code!",
              },
            ]}
            placeholder="IFSC"
            value={ifsc}
          />
          <InputField
            name="bankName"
            label="Bank Name"
            inEditMode={inEditMode}
            rules={[
              {
                required: true,
                message: "Please input your bank's name!",
                whitespace: true,
              },
            ]}
            placeholder="Bank Name"
            value={bank_name}
          />{" "}
          <InputField
            name="holderName"
            label="Holder Name"
            inEditMode={inEditMode}
            rules={[
              {
                required: true,
                message: "Please input holder name!",
                whitespace: true,
              },
            ]}
            placeholder="Holder Name"
            value={holder_name}
          />
          {inEditMode && (
            <Row className="mt-8">
              <Col xs={5}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={5} offset={1}>
                <Form.Item>
                  <Button
                    type="text"
                    onClick={() => {
                      setInEditMode(false);
                    }}
                    className="w-full border border-solid border-pink text-pink hover:text-pink "
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          )}
        </FormWrapper>
      </InfoContainer>
    </>
  );
};

AccountDetails.propTypes = {
  userData: object,
};
