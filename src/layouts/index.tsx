import { loginOut } from '@/services/user/api';
import { log } from '@/utils/prettyLog';
import { removeToken } from '@/utils/storage.utils';
import { useModel } from '@@/exports';
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Outlet, useAppData } from '@umijs/max';
import { Dropdown, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  });

  const [pathname, setPathname] = useState('/manage/home');
  const [dom, setDom] = useState<any>();
  const { clientRoutes } = useAppData();
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleClickMenu = (item: any, dom: any) => {
    setPathname(item.path || '/welcome');
  };

  const handleLoginOut = () => {
    loginOut().then((r) => {
      removeToken();
      setInitialState((s: any) => ({
        ...s,
      }));
      navigate('/login');
    });
  };

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title={'洛书'}
        logo={'https://s3.bmp.ovh/imgs/2024/06/14/47168cd39071576b.png'}
        token={{
          header: {
            colorBgHeader: '#292f33',
            colorHeaderTitle: '#fff',
            colorTextMenu: '#dfdfdf',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextMenuActive: 'rgba(255,255,255,0.85)',
            colorTextRightActionsItem: '#dfdfdf',
          },
          colorTextAppListIconHover: '#fff',
          colorTextAppListIcon: '#dfdfdf',
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorBgMenuItemHover: '#f6f6f6',
            colorTextMenu: '#595959',
            colorTextMenuSelected: '#242424',
            colorTextMenuActive: '#242424',
          },
        }}
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            left: 85,
            bottom: 100,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            bottom: -68,
            right: -45,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '331px',
          },
        ]}
        route={clientRoutes[1]}
        // location={{
        //     pathname,
        // }}
        menu={{
          type: 'sub',
          autoClose: false,
        }}
        avatarProps={{
          alt: 'null',
          src: `${initialState?.currentUser?.avatar}`,
          size: 'large',
          title: `${initialState?.currentUser?.userName}`,
          render: (props, dom) => {
            console.log('===avatarProps===', dom);
            console.log('===reactNode===', dom);
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: (
                        <Link to={'/manage/system/personal-center'}>
                          个人中心
                        </Link>
                      ),
                    },
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: <div onClick={handleLoginOut}>退出登录</div>,
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: 'rgba(0,0,0,0.03)',
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: 'rgba(0, 0, 0, 0.15)',
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant="borderless"
                />
                <PlusCircleFilled
                  style={{
                    color: 'var(--ant-primary-color)',
                    fontSize: 24,
                  }}
                />
              </div>
            ) : undefined,
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <a
              key={'github'}
              href={'https://gitee.com/ben-bo-ba/springcloud-base/tree/develop'}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              <div>© 2024 Made with love</div>
              <div>by Honor</div>
            </div>
          );
        }}
        onMenuHeaderClick={(e) => {
          log.info('menu 菜单的头部点击事件');
          console.log(e);
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }
          if (menuItemProps.path && location.pathname !== menuItemProps.path) {
            return (
              <div onClick={() => handleClickMenu(menuItemProps, defaultDom)}>
                <Link to={menuItemProps.path} target={menuItemProps.target}>
                  {defaultDom}
                </Link>
              </div>
            );
          }
          return defaultDom;
        }}
        {...settings}
      >
        <PageContainer header={{ title: null }}>
          <ProCard
            style={{
              height: '80vh',
              minHeight: 600,
            }}
          >
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
