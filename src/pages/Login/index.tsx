import BaseLoginForm from '@/pages/Login/components/BaseLoginForm';
import {
  allMenuCodeArray,
  userMenuCodeArray,
} from '@/services/system/menu/api';
import { setToken } from '@/utils/storage.utils';
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Settings from '../../../config/layoutSettings';

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

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <AlipayCircleOutlined
        key="AlipayCircleOutlined"
        className={styles.action}
      />
      <TaobaoCircleOutlined
        key="TaobaoCircleOutlined"
        className={styles.action}
      />
      <WeiboCircleOutlined
        key="WeiboCircleOutlined"
        className={styles.action}
      />
    </>
  );
};

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

const Login: React.FC = () => {
  const [grantType, setGrantType] = useState<string>('PASSWORD');
  const [userLoginState, setUserLoginState] = useState<API.Result<string>>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();
  const { styles } = useStyles();

  const handleSubmit = async (values: API.LoginParams) => {
    // 登录
    const body = { ...values, grantType, tenantId: '000000' };
    const currentUser = await initialState?.fetchLogin?.(body);
    if (currentUser) {
      const menuCodeArrayResult = await userMenuCodeArray();
      const allMenuCodeArrayResult = await allMenuCodeArray();

      //存放token
      setToken(currentUser.accessToken);

      //存放userinfo
      setInitialState((s: any) => ({
        ...s,
        currentUser: currentUser,
        userMenuCodes: menuCodeArrayResult.data,
        allMenuCodes: allMenuCodeArrayResult.data,
      }));

      // const routerTree = await routers();

      // setToken()
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: '登录成功！',
      });
      message.success(defaultLoginSuccessMessage);
      history.push('/manage/home');
      return;
    }
    // 如果失败去设置用户错误信息
    // setUserLoginState(msg);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <title>
        {intl.formatMessage({
          id: 'menu.login',
          defaultMessage: '登录页',
        })}
        - {Settings.title}
      </title>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <BaseLoginForm />
      </div>
    </div>
  );
};

export default Login;
