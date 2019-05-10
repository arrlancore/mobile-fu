import React from 'react'
import { Form, Icon, Col, Row } from 'antd'
import * as actions from 'actions/index'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from 'assets/image/logo/logo1x.png'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'
import { func, object, bool } from 'prop-types'
import './style.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.loginMember(values)
      }
    })
  };

  render() {
    if (this.props.isLogin) {
      return <Redirect to={'/home'} />
    }
    const { getFieldDecorator } = this.props.form
    console.log(process.env)
    return (
      <Layout>
        <Helmet>
          <title>KPI Login</title>
        </Helmet>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: '100%' }}
        >
          <div style={{ height: '100%' }} />
          <Col span={6} xl={4}>
            <div className="logo_company">
              <img src={Logo} alt="ati-logo" />
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <label
                style={{ marginBottom: '6px' }}
                htmlFor="normal_login_userName"
              >
                Username
              </label>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: 'Please input your username!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="johnys"
                  />
                )}
              </Form.Item>
              <label
                style={{ marginBottom: '6px' }}
                htmlFor="normal_login_password"
              >
                Password
              </label>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="******"
                    onPressEnter={this.handleSubmit}
                  />
                )}
              </Form.Item>
              <Col span={24}>
                <Button type="primary" htmlType="submit">
                  LOGIN
                </Button>
                <div
                  style={{
                    textAlign: 'center',
                    color: '#383838',
                    fontSize: '12px',
                    margin: ' 15px 0px'
                  }}
                >
                  <a href="/">Forgot your password ?</a>
                </div>
              </Col>
            </Form>
          </Col>
        </Row>
      </Layout>
    )
  }
}

NormalLoginForm.propTypes = {
  loginMember: func,
  isLogin: bool,
  form: object
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)

const mapStateToProps = state => {
  console.log(state)
  return {
    data: state.data_members,
    isLogin: state.data_members.formSuccess
  }
}

const mapDispatchToProps = dispatch => ({
  loginMember: form => dispatch(actions.loginMember(form))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm)
