import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
const { Option } = Select;

export const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const values = Form.useWatch([], form);
  const accountTypeVal = Form.useWatch("accountType", form);
  const [submittable, setSubmittable] = useState(false);
  const onFinish = (values) => {
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.text();
          console.log("Success:", data);
          setSubmitStatus("Account Info was saved");
        } else {
          const error = await response.text();
          throw new Error(error);
        }
      })
      .catch((error) => {
        console.error(`Error:${error}`);
        setSubmitStatus("Account Info was not saved");
      });
  };
  const onFinishFailed = () => {
    console.log("filed");
  };

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  useEffect(() => {
    form.resetFields();
    form.setFieldValue("accountType", accountTypeVal);
  }, [accountTypeVal]);

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        style={{ maxWidth: 1000, height: 800 }}
        onFinish={onFinish}
        size={"large"}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={(changedValues, allValues) => {
          setFormValues(allValues);
        }}
      >
        <Form.Item name="accountType" label="Account Type">
          <Select allowClear={false} defaultValue={"manual"}>
            <Option value="advanced">Advanced</Option>
            <Option value="manual">Manual</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="User Name"
          name="username"
          help={"please enter a valid email address/"}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Required" />
        </Form.Item>
        <Form.Item
          name="serverAddress"
          label="Server Address"
          rules={[
            {
              required: false,
              type: "url",
              message: "Please specify a valid server address.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {accountTypeVal === "advanced" && (
          <>
            <Form.Item
              name="serverPath"
              label="Server Path"
              rules={[
                {
                  required: false,
                  pattern: /^[a-zA-Z0-9\/]+$/,
                  message: "Please specify a valid server path.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className={"inlineFieldItems"}>
              <Form.Item
                name="port"
                label="Port"
                rules={[
                  {
                    required: false,
                    min: 1,
                    max: 1023,
                    type: "number",
                    message: "Value must be in range 1-1023.",
                  },
                ]}
              >
                <InputNumber
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item name="useSSL" label="use SSL">
                <Checkbox defaultChecked />
              </Form.Item>
            </div>
          </>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={!submittable} type="primary" htmlType="submit">
            Submit
          </Button>
          <p>{submitStatus}</p>
          <Button href={"/users"} type="primary" htmlType="submit">
            List of Users
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
