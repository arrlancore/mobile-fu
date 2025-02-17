import './style.css'

import { Col, Form, Icon, message, Row } from 'antd'
import Logo from 'assets/image/logo/logo.png'
import Button from 'components/button'
import Helmet from 'components/helmet'
import Input from 'components/input'
import Layout from 'components/layout'
import { useStateDefault } from 'context'
import { actionLogin, actionTypes } from 'context/auth/action'
import { func, object } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { isLogin } from 'utils/userData'

function LoginPage(props) {
  const { t } = useTranslation() // t ->> translate function to show a message by language chosen
  const tKey = 'dashboard.login.'
  const [nextPath, setnextPath] = React.useState('/home')
  const { history } = props
  const [, loadingUserLogin, dispatch] = useStateDefault(actionTypes.USER_LOGIN)
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

  const setPathRedirect = () => {
    const url = new URL(window.location.href)
    const path = url.searchParams.get('from')
    if (path) {
      setnextPath(path)
    }
  }

  React.useEffect(() => {
    setPathRedirect()

    /*
     * if (errorUserLogin && errorUserLogin !== prevError) {
     * message.error(errorUserLogin)
     * }
     */
  })

  const { getFieldDecorator } = props.form

  return (
    <Layout>
      {isLogin() && <Redirect to={nextPath} />}
      <div className="root-login">
        <Helmet>
          <title>{t(`${tKey}pageTitle`)}</title>
        </Helmet>
        <Row type="flex" justify="center" align="middle">
          <Col style={{ margin: 20, padding: '0 30px' }} span={24} xl={6}>
            <div className="logo_company">
              {' '}
              <img src={Logo} alt="ati-logo" />
            </div>
            <Form onSubmit={handleSubmit} className="login-form">
              <label
                style={{
                  marginBottom: '6px',
                  textTransform: 'capitalize'
                }}
                htmlFor="normal_login_userName"
              >
                {t(`${tKey}username`)}
              </label>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: t(`${tKey}form.usernameMessageRequired`)
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="2015@ftumj.ac.id"
                    autoFocus
                  />
                )}
              </Form.Item>
              <label
                style={{
                  marginBottom: '6px',
                  textTransform: 'capitalize'
                }}
                htmlFor="normal_login_password"
              >
                {t(`${tKey}password`)}
              </label>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: t(`${tKey}form.passwordMessageRequired`)
                    }
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
                <Button loading={loading} type="secondary" htmlType="submit">
                  {t(`${tKey}login`).toUpperCase()}
                </Button>
                <div
                  style={{
                    textAlign: 'center',
                    color: '#383838',
                    fontSize: '12px',
                    margin: ' 15px 0px'
                  }}
                >
                  <span onClick={() => history.push('/#forget')} style={{ cursor: 'pointer' }}>
                    {t(`${tKey}forgot`)}
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

const WrappedLoginPage = Form.create({ name: 'normal_login' })(LoginPage)

export default WrappedLoginPage
