import React from "react";
import ResultPage from "./ResultPage";
import { useState } from "react";
import { Form, Input, Button, InputNumber, Select, Modal } from "antd";
import axios from "axios";

const { Option } = Select;
const SubForm = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:3000/subscribe", values);
      setResult("success");
    } catch (e) {
      if (e.response.data.error) {
        Modal.error({ title: e.response.data.error });
      } else {
        setResult("error");
      }
    }
  };

  return (
    <div>
      {result === "" ? (
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          autoComplete="off"
          onFinish={handleSubmit}
          initialValues={{
            base: "CAD",
            target: "CNY",
          }}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Frequency (days)"
            name="frequency"
            rules={[{ required: true, message: "Please enter your frequency" }]}
          >
            <InputNumber
              min={1}
              parser={(text) => (/^\d+$/.test(text) ? text : 0)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email" },
              { required: true, message: "Please enter your email" },
            ]}
            validateTrigger={"onBlur"}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="base"
            name="base"
            rules={[{ required: true, message: "Please enter the base" }]}
          >
            <Select>
              <Option value="CNY">¥(CNY)</Option>
              <Option value="USD">$(USD)</Option>
              <Option value="EUR">€(EUR)</Option>
              <Option value="CAD">$(CAD)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="target"
            name="target"
            rules={[{ required: true, message: "Please enter the currency" }]}
          >
            <Select>
              <Option value="CNY">¥(CNY)</Option>
              <Option value="USD">$(USD)</Option>
              <Option value="EUR">€(EUR)</Option>
              <Option value="CAD">$(CAD)</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <ResultPage mode="sub" result={result} />
      )}
    </div>
  );
};

export default SubForm;
