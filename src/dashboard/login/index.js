import React from "react";
import { Form, Icon, Input, Button, Col, Row } from "antd";
import * as actions from "../../actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../assets/mainlogo.png";
import Head from "../../components/head";
import { func, object, bool } from "prop-types";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.loginMember(values);
      }
    });
  };

  render() {
    if (this.props.isLogin) {
      return <Redirect to={"/home"} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Head>
          <title>KPI Login</title>
        </Head>
        <Row type="flex" justify="center" align="middle">
          <Col span={8}>
            <div className="logo_company">
              <img src={Logo} alt="ati-logo" />
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
                <div
                  style={{
                    textAlign: "center",
                    color: "#383838",
                    fontSize: "12px",
                    margin: " 15px 0px"
                  }}
                >
                  <a href="/">Forgot your password ?</a>
                </div>
              </Col>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  loginMember: func,
  isLogin: bool,
  form: object
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapStateToProps = state => {
  console.log(state);
  return {
    data: state.data_members,
    isLogin: state.data_members.formSuccess
  };
};

const mapDispatchToProps = dispatch => ({
  loginMember: form => dispatch(actions.loginMember(form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
