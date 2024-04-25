import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { Layout, Menu, Button, message, Input, Form, Cascader, Select } from 'antd';
import { HtmlMeta } from '@/components/HtmlMeta/HtmlMeta';
import { useAuth } from '@/page-components/auth/authContext';
import {
  removeUserCookies,
  aes,
  isNoLoginPage,
  setAuth,
} from '@/utils';
import authRouter from '@/utils/authRouter'
import styles from './styles/mainLayout.module.less'
import BackstageLayout from './BackstageLayout';

const { Header, Content } = Layout;

export interface IProps {
  children: React.ReactNode;
  disableHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

const Child: React.FC<IProps> = props => {
  const router = useRouter();
  const { user, clearUserInfo } = useAuth();
  const [selectMenu, setSelectMenu] = useState('');
  const { pathname } = router;

  // 变化选中的菜单
  useEffect(() => {
    setSelectMenu(pathname);
  }, [pathname]);

  const logout = () => {
    message.success('已退出', 1, () => {
      removeUserCookies();
      router.push('/login').then(() => {
        clearUserInfo();
      });
    });
  };

  const login = () => {
    router.push('/login');
  };

  // 登录注册页 layout
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return (
      <Layout className="layout" style={{ height: '100vh' }}>
        <HtmlMeta title="管理平台" />
        <Content style={{ height: '100vh' }}>{props.children}</Content>
      </Layout>
    );
  }

  // 后台 layout
  return <BackstageLayout logout={logout}>{props.children}</BackstageLayout>;
};

// 用ant design的layout
export const MainLayout: React.FC<IProps> = props => {
  const [showChild, setShowChild] = React.useState(false);
  const [isNoAccess, setNoAccess] = React.useState(false);

  const router = useRouter();
  const { asPath, pathname } = router;

  // Wait until after client-side hydration to show
  useEffect(() => {
    const notFindPage = pathname === '/_error' || (pathname === '/404' && pathname !== asPath); // 此路径下无页面
    if (pathname === '/403' || notFindPage) {
      setNoAccess(true);
    } else {
      setNoAccess(false);
    }


    if (pathname === '/') {
      router.replace('/login').then(() => {
        setShowChild(true);
      });
      return;
    }

    const authCookie = cookie.get('D_USER');
    const { role: encryptedRole, token, userId, email } = JSON.parse(authCookie || '{}');
    const role = encryptedRole && aes().decrypt(encryptedRole);

    setAuth({ token });

    // 无需登录的页面
    const isNoLogin = isNoLoginPage(pathname);

    // 如果有登录态
    if (authCookie) {
      // 查看该登录用户是否有访问此路由的权限
      const { isAuthRouter } = authRouter(role, pathname);
      if (!notFindPage && !isNoLogin && !isAuthRouter) {
        // 用户角色无权限重定向至403页面
        router.replace('/403').then(() => {
          setShowChild(true);
        });
      } else {
        setShowChild(true);
      }
    } else {
      // 没有登录情况
      // 非登录状态只能进入NoLoginPage， 否则重定向至login页面
      if (!isNoLogin) {
        router.replace('/login').then(() => {
          setShowChild(true);
        });
      } else {
        setShowChild(true);
      }
    }
  }, [pathname]);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  if (isNoAccess) {
    // only show (404、403、introdece) page without layout
    return <div>{props.children}</div>;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Child {...props} />;
};
