import React, {useState} from 'react';
import {useIntl} from "react-intl";
import {createStyles} from 'antd-style';
import Settings from '../../../config/layoutSettings';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {history, useModel} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
import {FormattedMessage} from 'umi';
import {login} from "@/services/user/api";
import {setToken} from "@/utils/storage.utils";
import {userMenuCodeArray, routers, allMenuCodeArray} from "@/services/system/menu/api";


const useStyles = createStyles(({token}) => {
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
    const {styles} = useStyles();

    return (
        <>
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action}/>
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action}/>
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action}/>
        </>
    );
};

const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => {
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
    const {initialState, setInitialState} = useModel('@@initialState');

    const intl = useIntl();
    const {styles} = useStyles();

    const handleSubmit = async (values: API.LoginParams) => {
        // 登录
        const body = {...values, grantType, 'tenantId': '000000'}
        const currentUser = await initialState?.fetchLogin?.(body);
        if (currentUser) {
            const menuCodeArrayResult = await userMenuCodeArray();
            const allMenuCodeArrayResult = await allMenuCodeArray();

            //存放token
            setToken(currentUser.accessToken);

            //存放userinfo
            setInitialState((s) => ({
                ...s,
                currentUser: currentUser,
                userMenuCodes: menuCodeArrayResult.data,
                allMenuCodes: allMenuCodeArrayResult.data,
            }))

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

    const {status, type: loginType} = userLoginState;

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
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/logo.svg"/>}
                    title="Ant Design"
                    subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={[
                        <FormattedMessage
                            key="loginWith"
                            id="pages.login.loginWith"
                            defaultMessage="其他登录方式"
                        />,
                        <ActionIcons key="icons"/>,
                    ]}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs
                        activeKey={grantType}
                        onChange={setGrantType}
                        centered
                        items={[
                            {
                                key: 'PASSWORD',
                                label: intl.formatMessage({
                                    id: 'pages.login.accountLogin.tab',
                                    defaultMessage: '账户密码登录',
                                }),
                            },
                            {
                                key: 'mobile',
                                label: intl.formatMessage({
                                    id: 'pages.login.phoneLogin.tab',
                                    defaultMessage: '手机号登录',
                                }),
                            },
                        ]}
                    />

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误(admin/ant.design)',
                            })}
                        />
                    )}
                    {grantType === 'PASSWORD' && (
                        <>
                            <ProFormText
                                name="account"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.username.placeholder',
                                    defaultMessage: '用户名: admin or user',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.username.required"
                                                defaultMessage="请输入用户名!"
                                            />
                                        ),
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: ant.design',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.password.required"
                                                defaultMessage="请输入密码！"
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误"/>}
                    {grantType === 'mobile' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined/>,
                                }}
                                name="mobile"
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.phoneNumber.placeholder',
                                    defaultMessage: '手机号',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.phoneNumber.required"
                                                defaultMessage="请输入手机号！"
                                            />
                                        ),
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.phoneNumber.invalid"
                                                defaultMessage="手机号格式错误！"
                                            />
                                        ),
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.captcha.placeholder',
                                    defaultMessage: '请输入验证码',
                                })}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${intl.formatMessage({
                                            id: 'pages.getCaptchaSecondText',
                                            defaultMessage: '获取验证码',
                                        })}`;
                                    }
                                    return intl.formatMessage({
                                        id: 'pages.login.phoneLogin.getVerificationCode',
                                        defaultMessage: '获取验证码',
                                    });
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.captcha.required"
                                                defaultMessage="请输入验证码！"
                                            />
                                        ),
                                    },
                                ]}
                                onGetCaptcha={async (phone) => {
                                    // const result = await getFakeCaptcha({
                                    //     phone,
                                    // });
                                    const result = 'abcd';
                                    if (!result) {
                                        return;
                                    }
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
                        </a>
                    </div>
                </LoginForm>
            </div>
        </div>
    );
};

export default Login;
