import React from "react";
import { Form, Button, Input, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const resp = await login(formInstance.getFieldsValue(true));
      this.props.handleLoginSuccess(resp.token);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register(formInstance.getFieldsValue(true), this.state.asHost);
      message.success("Register Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                min: 5,
                message: "Username should be longer than 5 characters",
              },
              {
                max: 50,
                message: "Username should be less than 50 characters",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              { min: 8, 
                message: 'Password must have a minimum length of 8',
              },
              {
                 pattern: new RegExp('(([a-z A-Z 1-9 @$!%*#?&])(?=.*[A-Z][a-z])(?=.*\\d)(?=.*[@$!%*#?&])).{7,}'),
                 message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character @$!%*?&.'
               }
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Space>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
          >
            Log in
          </Button>
          <Button
            onClick={this.handleRegister}
            disabled={this.state.loading}
            shape="round"
            type="primary"
          >
            Register
          </Button>
        </Space>
      </div>
    );
  }
}

export default LoginPage;


