import React from 'react'
import { Form, Icon, Col, Row, message } from 'antd'
import { actionLogin } from 'store/login/action'
import { createLoadingSelector, createErrorSelector } from 'store/default/selector'
// import { selectDataLogin } from 'store/login/selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { func, object, bool, string } from 'prop-types'
import { isLogin } from 'utils/userData'
import usePrevious from 'utils/usePrevious'
import Logo from 'assets/image/logo/logo1x.png'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'
import './style.css'


function LoginPage(props) {
  const [ nextPath, setnextPath ] = React.useState('/home')
  const { error, loading, history } = props
  const prevError = usePrevious(error)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.loginUser(values)
      }
    })
  }

  React.useEffect(() => {
    setPathRedirect()
    if (error && error !== prevError) {
      message.error(props.error)
    }
  })

  const setPathRedirect = () => {
    const url = new URL(window.location.href)
    const path = url.searchParams.get('from')
    if (path) {
      setnextPath(path)
    }
  }

  const { getFieldDecorator } = props.form
  return (
    <Layout>
      {isLogin() && <Redirect to={nextPath} />}
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
            <Form onSubmit={handleSubmit} className="login-form">
              <label
                style={{ marginBottom: '6px' }}
                htmlFor="normal_login_userName"
              >
                Username
              </label>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: 'Please input your username!', max: 13 }
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
                    onPressEnter={handleSubmit}
                  />
                )}
              </Form.Item>
              <Col span={24}>
                <Button loading={loading} type="primary" htmlType="submit">
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

LoginPage.propTypes = {
  loginUser: func,
  form: object,
  history: object,
  loading: bool,
  error: string
}

const WrappedLoginPage = Form.create({ name: 'normal_login' })(
  LoginPage
)

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorSelector(['LOGIN'])

const mapStateToProps = state => {
  return {
    // login: selectDataLogin(state),
    loading: loadingSelector(state),
    error: errorSelector(state)
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: form => dispatch(actionLogin(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginPage)
