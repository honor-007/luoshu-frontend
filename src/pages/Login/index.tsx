import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import './index.less'
import {Dropdown, MenuProps, message} from "antd";
import swit from './asset/other-ico/switch.png'
import login from './asset/other-ico/login.png'
import resigter from './asset/other-ico/resigter.png'
import star from './asset/other-ico/star.png'
import star2 from './asset/other-ico/star2.png'
import BackgroundParticle from "@/pages/Login/components/background_particle";
import BackgroundSky from "@/pages/Login/components/background_sky"
import BackgroundHexagonalshape from "@/pages/Login/components/background_hexagonalShape"
import BackgroundBuleStar from "@/pages/Login/components/background_bulestar"
import {userMenuCodeArray, routers, allMenuCodeArray} from "@/services/system/menu/api";
import {useIntl} from "@@/exports";
import {history, useModel} from '@umijs/max';
import {setToken} from "@/utils/storage.utils";

const Login: React.FC = () => {

    const [grantType, setGrantType] = useState<string>('PASSWORD');
    const [userLoginState, setUserLoginState] = useState<API.Result<string>>({});
    const {initialState, setInitialState} = useModel('@@initialState');
    const intl = useIntl();

    const handleSubmit = async (values: API.LoginParams) => {
        console.log("---values---",values)
        // 登录
        const body = {...values, grantType, 'tenantId': '000000'}
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


    const [backgroundTheme, setBackgroundTheme] = useState<any>('sky');

    useEffect(() => {
        $('.login-in').click(function () {
            $(this).addClass('big').siblings().removeClass('big')
            $('.body').css('transform', 'rotateX(0)')
        })

        $('.login-up').click(function () {
            $(this).addClass('big').siblings().removeClass('big')
            $('.body').css('transform', 'rotateX(90deg)')
        })
        // 点击一下登录使其变大
        $('.login-in').trigger('click')
        // 定义弹窗
        //tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息,'warning'是警告信息
        function ShowTip(tip: any, type: any) {
            let $tip = $('#tip');
            if ($tip.length === 0) {
                // console.log($tip.length);
                // 设置样式，也可以定义在css文件中
                // rgb(0,220,0,0.5)绿色
                // transition:all 0.5s;
                // transform:translateY(100px);transition:all 1s;
                $tip = $('' +
                    '<span id="tip" style="position:fixed;opacity:0.65;background-color:#e4ebf5;box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem  #FFFFFF;border-radius:10px;top:100px;left:50%;z-index:9999;height: 35px;padding: 0 20px;line-height: 35px;">' +
                    '</span>');
                $('body').append($tip);
            }
            if (type === 'insert') {
                $tip.stop(true).text(tip).css(
                    {
                        'margin-left': -$tip.outerWidth()! / 2,
                        'color': 'rgb(0,220,0,1)'
                    }).fadeIn(200).delay(3000).fadeOut(800);
            } else if (type === 'remove') {
                $tip.stop(true).text(tip).css(
                    {'margin-left': -$tip.outerWidth()! / 2, 'color': 'red'}).fadeIn(200).delay(3500).fadeOut(800);
            }//设置显示位置和显示时间和消失时间
        }

        function InsertMsg(msg: any) {
            ShowTip(msg, 'insert');
        }

        function RemoveMsg(msg: any) {
            ShowTip(msg, 'remove');
        }

        // 登录接口，点击登录按钮之后返回后台查询数据
        // $('#login-in-button').on('click', function (e) {
        //     e.preventDefault()
        //     $.post('/Servletlogin', $(this).parent().serialize(), function (res) {
        //         const response = JSON.parse(res);
        //         if (response.status === 0) {
        //             window.location.href = ('../../index.html')
        //         } else {
        //             RemoveMsg(response.message)
        //         }
        //     })
        // })
        // 注册接口，
        $('#login-up-button').on('click', function (e) {
            e.preventDefault()
            $.post('/Servletregister', $(this).parent().serialize(), function (res) {
                const response = JSON.parse(res);
                if (response.status === 0) {
                    InsertMsg('注册成功')
                    $('.login-in').trigger('click')
                } else {
                    RemoveMsg(response.message)
                    // alert(response.message)
                }
            })
        })

        $('.setting').mouseenter(function () {
            $('.setting ul').stop(true).slideDown()
        })
        $('.setting').mouseleave(function () {
            $('.setting ul').slideUp()
        })

        $('.skyup').click(function () {
            $('iframe').attr('src', '../skyUp/index.html')
        })
        $('.lizi').click(function () {
            $('iframe').attr('src', '../colorfulLiZi/index.html')
        })
        $('.plane').click(function () {
            $('iframe').attr('src', '../plane/index.html')
        })
        $('.yun').click(function () {
            $('iframe').attr('src', '../yun/index.html')
        })
        $('.star').click(function () {
            $('iframe').attr('src', '../star/index.html')
        })
    }, [])


    const items: MenuProps['items'] = [
        {
            key: 'sky',
            label: '天空',
        },
        {
            key: 'particle',
            label: '粒子',
        },
        {
            key: 'hexagonalShape',
            label: '六角形',
        },
        // {
        //     key: 'plane',
        //     label: '小飞机',
        // },
        {
            key: 'blueStar',
            label: '蓝星',
        },
    ];
    const onClick: MenuProps['onClick'] = ({key}) => {
        message.info(`Click on item ${key}`);
        setBackgroundTheme(key);
    };

    return (
        <div>
            <div className='setting'>
                <Dropdown menu={{items, onClick}} placement="bottom">
                    <img src={swit} alt={'切换背景'}></img>
                </Dropdown>
            </div>
            <div className="main">
                <div className="head">
                    <div className="login-in">
                        <img src={login} alt={'登录'}/>
                        登录
                    </div>
                    <div className="login-up">
                        <img src={resigter} alt={'注册'}/>
                        注册
                    </div>
                </div>
                <div className="body">
                    <div className="front">
                        <div className="left">
                            <img src={star} alt={'1'}></img>
                            <div className="welcome">
                                Welcome!
                            </div>
                            <p>希君生羽翼,一化北溟鱼。</p>

                        </div>
                        <div className="right">
                            <form>
                                <h2>登陆账号</h2>
                                <input className={'input'} name="username" type="text" placeholder="账号"></input>
                                <input className='input' name="password" type="password" placeholder="密码"></input>
                                <button type="submit" id="login-in-button"
                                        onClick={async (values) => {
                                            await handleSubmit(values as API.LoginParams);
                                        }}>登录
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="back">
                        <div className="left">
                            <img src={star2} alt={'1'}></img>
                            <div className="welcome">
                                Welcome!
                            </div>
                            <p>不念过往,纵情向前!</p>
                        </div>
                        <div className="right">
                            <div className="exist">该用户名已注册，请更换用户名~</div>
                            <form>
                                <h2>注册账号</h2>
                                <input className="username" name="username" type="text" placeholder="账号"></input>
                                <input name="password" type="password" placeholder="密码"></input>
                                <button type="submit" id="login-up-button">注册</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="theme">
                {backgroundTheme === 'particle' && <BackgroundParticle/>}
                {backgroundTheme === 'sky' && <BackgroundSky/>}
                {backgroundTheme === 'hexagonalShape' && <BackgroundHexagonalshape/>}
                {backgroundTheme === 'blueStar' && <BackgroundBuleStar/>}
            </div>

        </div>
    );
};

export default Login;
