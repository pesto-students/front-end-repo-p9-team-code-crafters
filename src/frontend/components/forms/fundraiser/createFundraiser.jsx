import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import {func, bool, object, string} from "prop-types";
import {FormWrapper} from "../../wrappers";
import {TextEditor} from "../../inputs";
import {UploadOutlined} from "@ant-design/icons";
import {FUNDRAISER_CATEGORY} from "@/appData";
import dayjs from "dayjs";

const disabledDate = (current) => {
  return current && current < dayjs().endOf("day");
};

const normFile = (event) => {
  if (Array.isArray(event)) {
    return event;
  }
  return event?.fileList;
};

export const CreateFundraiserForm = ({
  handleSubmit,
  isLoading,
  initialValues,
  submitButtonText = "Create",
}) => {
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      formName="createFundraiser"
      submitBtnText={submitButtonText}
      initialValues={initialValues}
    >
      <Form.Item
        label={<span className="text-lg text-fontBlack">Title</span>}
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
      <Form.Item
        label={<span className="text-lg text-fontBlack">Description</span>}
        name="description"
        rules={[
          {
            required: true,
            message: "Please enter description",
          },
          {min: 10, message: "description should have min 10 characters"},
        ]}
      >
        <TextEditor />
      </Form.Item>
      <Form.Item
        label={
          <span className="text-lg text-fontBlack">Short Description</span>
        }
        name="short_description"
        rules={[
          {
            min: 10,
            message: "invalid description!",
          },
          {
            required: true,
            message: "please enter description!",
          },
        ]}
      >
        <Input placeholder="Short Description" />
      </Form.Item>
      <Form.Item
        name="image"
        label={<span className="text-lg text-fontBlack">Image</span>}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Please upload an image",
          },
        ]}
      >
        <Upload
          maxCount={1}
          accept="image/*"
          action="/api/noop"
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="category"
        label={<span className="text-lg text-fontBlack">Category</span>}
        rules={[{required: true, message: "Please select category!"}]}
      >
        <Select placeholder="Category">
          {Object.values(FUNDRAISER_CATEGORY).map((value) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="target_amount"
        label={<span className="text-lg text-fontBlack">Target Amount</span>}
        rules={[
          {
            min: 0,
            type: "number",
            message: "target amount should be greater than 0!",
          },
          {
            required: true,
            message: "enter target amount!",
          },
        ]}
      >
        <InputNumber addonBefore="₹" placeholder="Target Amount" />
      </Form.Item>
      <Form.Item
        name="target_date"
        label={<span className="text-lg text-fontBlack">Target Date</span>}
        rules={[
          {
            type: "object",
            required: true,
            message: "Please select date!",
          },
        ]}
      >
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>
    </FormWrapper>
  );
};

CreateFundraiserForm.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool.isRequired,
  initialValues: object,
  submitButtonText: string,
};
