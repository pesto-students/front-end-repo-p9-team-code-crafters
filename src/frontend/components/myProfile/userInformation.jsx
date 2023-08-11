import {Button, Col, DatePicker, Form, Row} from "antd";
import {InfoContainer} from ".";
import moment from "moment/moment";
import {useState} from "react";
import {FormWrapper, InputField} from "../wrappers";
import {object} from "prop-types";

const handleSubmit = () => {};

export const UserInformation = ({userData}) => {
  const [inEditMode, setInEditMode] = useState(false);
  console.log(userData);
  const {name, email, contact, dob} = userData || {}; // Note: Needs to be corrected
  const formattedDob = moment(dob).format("YYYY-MM-DD");

  return (
    <>
      <InfoContainer
        title="User Information"
        editable={true}
        setInEditMode={setInEditMode}
        inEditMode={inEditMode}
      >
        <FormWrapper
          handleSubmit={handleSubmit}
          // isLoading={isLoading}
          showSubmit={false}
          formName="updateUserDetails"
        >
          <InputField
            name="name"
            label="Name"
            inEditMode={inEditMode}
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
            placeholder={name}
            value={name}
          />
          <InputField
            name="email"
            label="Email"
            inEditMode={inEditMode}
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
            placeholder={email}
            value={email}
          />
          <InputField
            name="contact"
            label="Contact"
            inEditMode={inEditMode}
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
            placeholder={contact}
            value={contact}
          />
          <InputField
            name="dob"
            label="Date of Birth"
            inEditMode={inEditMode}
            rules={[
              {
                type: "object",
                required: true,
                message: "select date!",
              },
            ]}
            placeholder={formattedDob}
            value={formattedDob}
            input={<DatePicker className="w-full" placeholder={formattedDob} />}
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

UserInformation.propTypes = {
  userData: object,
};
