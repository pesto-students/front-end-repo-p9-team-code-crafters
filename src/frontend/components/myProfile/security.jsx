import {Button, Col, Form, Input, Row, Typography} from "antd";
import {InfoContainer} from ".";
import {FormWrapper} from "../wrappers";

const {Text} = Typography;
const handleSubmit = () => {};
export const Security = () => {
  return (
    <>
      <InfoContainer title="Security" editable={false}>
        <FormWrapper
          handleSubmit={handleSubmit}
          // isLoading={isLoading}
          formName="resetPassword"
          showSubmit={false}
        >
          <Row className="mt-6 flex items-center">
            <Col xs={4}>
              <Text>Old Password:</Text>
            </Col>
            <Col xs={10}>
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "enter password!",
                  },
                ]}
                hasFeedback
                className="mb-0 "
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-6 flex items-center">
            <Col xs={4}>
              <Text>New Password:</Text>
            </Col>
            <Col xs={10}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "enter password!",
                  },
                ]}
                hasFeedback
                className="mb-0 "
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-6 flex items-center">
            <Col xs={4}>
              <Text>Confirm Password:</Text>
            </Col>
            <Col xs={10}>
              <Form.Item
                name="confirm"
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
                      return Promise.reject(
                        new Error("passwords do not match!")
                      );
                    },
                  }),
                ]}
                className="mb-0 "
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-8">
            <Col xs={5}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Reset Password
                </Button>
              </Form.Item>
            </Col>
            <Col xs={5} offset={1}>
              <Form.Item>
                <Button
                  type="text"
                  onClick={() => {}}
                  className="w-full border border-solid border-pink text-pink hover:text-pink "
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </FormWrapper>
      </InfoContainer>
    </>
  );
};
