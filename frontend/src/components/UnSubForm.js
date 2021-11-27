import React from 'react'
import { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import ResultPage from "./ResultPage";
import axios from 'axios'

const UnSubForm = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const handleSubmit = async (values) => {
    try {
      await axios.delete("/unsubscribe", {data: values});
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
      {result === "" ?
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
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

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Unsubscribe
        </Button>
      </Form.Item>
      </Form>
      : <ResultPage mode="unsub" result={result} />
}
    </div>
  );
};

export default UnSubForm;
