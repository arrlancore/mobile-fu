import React from 'react'
import { Form, Icon, Col, Row, message } from 'antd'
import * as actions from 'actions/index'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { func, object } from 'prop-types'
import { isLogin } from 'utils/userData'
import Logo from 'assets/image/logo/logo1x.png'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'
import './style.css'

class NormalLoginForm extends React.Component {
  state = {
    nextPath: '/home'
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.loginUser(values)
      }
    })
  };

  componentDidMount() {
    this.setPathRedirect()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.error !== this.props.data.error) {
      message.error(this.props.data.error)
    }
  }

  setPathRedirect() {
    const url = new URL(window.location.href)
    const path = url.searchParams.get('from')
    if (path) {
      this.setState({ nextPath: path })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { history } = this.props
    return (
      <Layout>
        {isLogin() && <Redirect to={this.state.nextPath} />}
        <div className="root-login">
          <Helmet>
            <title>KPI Login</title>
          </Helmet>
          <Row
            type="flex"
            justify="center"
            align="middle"
          >
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
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="01.01.01.1001"
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
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="******"
                      onPressEnter={this.handleSubmit}
                    />
                  )}
                </Form.Item>
                <Col span={24}>
                  <Button loading={this.props.data.loading} type="primary" htmlType="submit">
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
                    <span
                      onClick={() => history.push('/#forget')}
                      style={{ cursor: 'pointer' }}
                    >
                      Forgot your password ?
                    </span>
                  </div>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

NormalLoginForm.propTypes = {
  loginUser: func,
  form: object,
  history: object,
  data: object
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)

const mapStateToProps = state => {
  return {
    data: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: form => dispatch(actions.loginUser(form))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm)
