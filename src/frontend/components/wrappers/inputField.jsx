import {Col, Form, Input, Row, Typography} from "antd";
import {bool, object, string, node} from "prop-types";

const {Text} = Typography;
export const InputField = ({
  inEditMode,
  label,
  placeholder,
  value,
  rules,
  input,
  name,
}) => {
  return (
    <Row className="mt-6 flex items-center">
      <Col xs={4}>
        <Text>{label}:</Text>
      </Col>
      <Col xs={10}>
        {inEditMode ? (
          <Form.Item name={name} rules={rules} className="mb-0 ">
            {input || <Input placeholder={placeholder} />}
          </Form.Item>
        ) : (
          value
        )}
      </Col>
    </Row>
  );
};

InputField.propTypes = {
  inEditMode: bool.isRequired,
  label: string,
  placeholder: string,
  value: string,
  rules: object,
  input: node,
  name: string,
};
