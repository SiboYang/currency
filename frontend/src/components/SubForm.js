import { Form, Input, Button, InputNumber, Select } from "antd";

const { Option } = Select;

const SubForm = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      autoComplete="off"
      initialValues={{
          Frequency: 5,
          currency: "CNY"
      }}
    >
      <Form.Item
        label="First name"
        name="Firstname"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="Lastname"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Frequency"
        name="Frequency"
        rules={[{ required: true, message: "Please enter your frequency" }]}
      >
        <InputNumber
          addonAfter="$"
          min={1}
          max={100}
          keyboard={true}
          placeholder="days/email"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="Email"
        rules={[
          { type: "email", message: "Please enter a valid email" },
          { required: true, message: "Please enter your email" },
        ]}
        validateTrigger={"onBlur"}
      >
        <Input />
      </Form.Item>

    <Form.Item label="base" name="base">
        <Input value="$(CAD)" disabled />
    </Form.Item>
      
      <Form.Item
        label="currency"
        name="currency"
        rules={[{ required: true, message: "Please enter the currency" }]}
      >
       
        <Select>
          <Option value="CNY">¥(CNY)</Option>
          <Option value="USD">$(USD)</Option>
          <Option value="EUR">€(EUR)</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubForm;
