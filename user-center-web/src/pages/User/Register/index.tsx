import { Footer } from '@/components';
import { getMailCaptcha, register } from '@/services/ant-design-pro/api';
import {
  LockOutlined, MailOutlined, MailTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { Link } from '@@/exports';
import { ProFormCaptcha } from '@ant-design/pro-form';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Register: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  // 表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const {loginPwd, checkPwd} = values;
    // 校验
    if (loginPwd !== checkPwd){
      message.error('两次输入的密码不一致！');
      return;
    }

    try {
      // 注册
      const res = await register({
        ...values,
        type,
      });
      if (res.code === 23200 && res.data > 0){
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        // 跳转到登录页
        const urlParams = new URL(window.location.href).searchParams;
        console.log(urlParams.get('redirect'), typeof urlParams.get('redirect'));
        history.push('/user/login?redirect=' + (urlParams.get('redirect') || '/'));
        return;
      }else {
        throw new Error(`register error id = ${res.message}`);
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;

  // 标签逻辑
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="自定义管理系统"
          subTitle={'目前实现了一些自定义的管理功能'}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码注册',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的账号和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="loginName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入注册账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '账号长度不能小于4！',
                  },
                ]}
              />
              <ProFormText.Password
                name="loginPwd"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入注册密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不能小于8！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPwd"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入注册密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不能小于8！',
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                placeholder={'请输入邮箱地址'}
                rules={[
                  {
                    required: true,
                    message: '邮箱地址是必填项！',
                  }
                ]}
              />
              <ProFormCaptcha
                name="captcha"
                fieldProps={{
                  size: 'large',
                  prefix: <MailTwoTone />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                // 手机号的 name，onGetCaptcha 会注入这个值
                phoneName="email"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ]}
                placeholder="请输入验证码"
                // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
                // throw new Error("获取验证码错误")
                onGetCaptcha={async (email) => {
                  if (typeof email === 'string') {
                    let res = await getMailCaptcha(email);
                    if (res.data) {
                      message.success("发送验证码成功");
                    }else {
                      message.error(res.details ?? res.message ?? "发送验证码失败，请稍后再试");
                    }
                  }
                }}
              />
            </>
          )}
          <div style={{
            marginBottom: 24,
            display: 'flex',
          }}>
            <Link to={"/user/login"} style={{
              marginLeft: 'auto'
            }}>注册过了，跳转登录</Link>
          </div>
        </LoginForm>

      </div>
      <Footer />
    </div>
  );
};
export default Register;
