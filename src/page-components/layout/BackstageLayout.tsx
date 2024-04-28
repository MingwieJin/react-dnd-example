import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import { Layout, Menu, Divider } from 'antd';
import {
  roleChineseName,
  roleMenu,
} from '@/constants';
import { HtmlMeta } from '@/components/HtmlMeta/HtmlMeta';
import { useAuth } from '@/page-components/auth/authContext';
import { rgbDataURL, myNextImgLoader, aes } from '@/utils/util';
import SideMenu from './components/SideMenu';
import styles from './styles/backstageLayout.module.less';
import cookie from 'js-cookie';

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

interface BackstageLayoutProps {
  children: React.ReactNode;
  logout: () => void;
}

const BackstageLayout: React.FC<BackstageLayoutProps> = ({
  children,
  logout,
}) => {
  // 同步初始化
  const D_USER_STR = cookie.get('D_USER') ?? '{}';
  const { role: encRole, token, email } = JSON.parse(D_USER_STR);
  const role = aes().decrypt(encRole ?? '');
  const menuOptions = roleMenu[role] || [];
  const userName = email ?? '暂未设置昵称';

  const getUsername = () => {
    return email ?? '暂未设置昵称';
  };

  return (
    <Layout
      className="layout"
      style={{ height: 'fit-content', minHeight: '100%', overflow: 'hidden' }}
    >
      <HtmlMeta title="platform" />
      <Header
        className={styles.headerContainer}
        style={{
          height: '56px',
          padding: '0 24px',
          flexWrap: 'nowrap',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className={styles['left-header']}>
          <Image
            loader={myNextImgLoader}
            alt="logo"
            src={`${STATIC_ASSETS_URL}/svg/icon.png`}
            width={34}
            height={34}
            placeholder="blur"
            blurDataURL={rgbDataURL(243, 249, 255)}
          />
          <div className={styles.headerTitle}>拖拽举例</div>
        </div>
        <div className={styles['right-header']}>
          <span className={styles.userEmail}>{getUsername()}</span>
          <Divider
            type="vertical"
            style={{ height: '28px', margin: '0 16px', color: '#E6E7EB' }}
          />
          <div className={styles.logoutBtn} onClick={logout}>
            退出
          </div>
        </div>
      </Header>
      <Content style={{ display: 'flex' }}>
        {/*<SideMenu menuOptions={menuOptions}></SideMenu>*/}
        <div className={styles.layoutContainer}>{children}</div>
      </Content>
    </Layout>
  );
};

export default BackstageLayout;
