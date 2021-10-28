import { Form, Input, Button, InputNumber, Select } from "antd";

const UnSubForm = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        autoComplete="off"
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

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Unsubscribe
        </Button>
      </Form.Item>
      </Form>
    </div>
  );
};

export default UnSubForm;
