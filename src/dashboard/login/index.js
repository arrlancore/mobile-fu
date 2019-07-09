import React from 'react'
import {
  Form, Icon, Col, Row, message
} from 'antd'
import { actionLogin, actionTypes } from 'context/auth/action'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  func, object
} from 'prop-types'
import { isLogin } from 'utils/userData'
// import usePrevious from 'utils/usePrevious'
import Logo from 'assets/image/logo/logo1x.png'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layout'
import { useStateDefault } from 'context'
import './style.css'


function LoginPage(props) {
  const { t } = useTranslation() // t ->> translate function to show a message by language chosen
  const tKey = 'dashboard.login.'
  const [ nextPath, setnextPath ] = React.useState('/home')
  const { history } = props
  const [ , loadingUserLogin, dispatch ] = useStateDefault(actionTypes.USER_LOGIN)
  // const prevError = usePrevious(errorUserLogin)
  const loading = loadingUserLogin
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        actionLogin(dispatch, values)
      } else {
        message.error(t('default.formRequired'))
      }
    })
  }

  React.useEffect(() => {
    setPathRedirect()
    // if (errorUserLogin && errorUserLogin !== prevError) {
    // message.error(errorUserLogin)
    // }
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
          <title>{t(tKey + 'pageTitle')}</title>
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
                style={{ marginBottom: '6px', textTransform: 'capitalize' }}
                htmlFor="normal_login_userName"
              >
                {t(tKey + 'username')}
              </label>
              <Form.Item>
                {getFieldDecorator('userName', { rules: [
                  {
                    required: true, message: t(tKey + 'form.usernameMessageRequired'), max: 13
                  }
                ] })(
                  <Input
                    prefix={<Icon type="user"style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="01.01.01.1001"
                    autoFocus
                  />
                )}
              </Form.Item>
              <label
                style={{ marginBottom: '6px', textTransform: 'capitalize' }}
                htmlFor="normal_login_password"
              >
                {t(tKey + 'password')}
              </label>
              <Form.Item>
                {getFieldDecorator('password', { rules: [
                  {
                    required: true, message: t(tKey + 'form.passwordMessageRequired')
                  }
                ] })(
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
                  {t(tKey + 'login').toUpperCase()}
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
                    {t(tKey + 'forgot')}
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
  history: object
}

const WrappedLoginPage = Form.create({ name: 'normal_login' })(
  LoginPage
)

export default WrappedLoginPage
