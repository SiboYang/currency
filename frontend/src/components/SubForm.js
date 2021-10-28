import { Form, Input, Button, InputNumber, Select } from "antd";

const { Option } = Select;

const handleSubmit = (values) => {
  console.log(values)
}

const SubForm = () => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      autoComplete="off"
      onFinish={handleSubmit}
      initialValues={{
          Frequency: 5,
          base: "CAD",
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
          min={1}
          max={100}
          keyboard={true}
        />
        <span>days</span>
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
        <Input disabled />
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

      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Subscribe
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubForm;
