import { useEffect, useState, useRef } from 'react';
import getConfig from 'next/config';
import Image from 'next/image';
import router from 'next/router';
import { Button, Form, Input } from 'antd';
import { aes, myNextImgLoader } from '@/utils';
import cookie from 'js-cookie';
import styles from './login.module.less';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

const Login = () => {
  const [initValue, setInitValue] = useState<Record<string, any>>({
    name: '',
    password: '',
  });

  const [form] = Form.useForm();

  // 提交
  const onFinish = (values: Record<string, any>) => {
    const role = 'admin';
    const params = {
      token: '',
      userId: 123,
      email: '我是个用户',
      role: aes().encrypt(role),
    };
    cookie.set('D_USER', JSON.stringify(params));
    router.push('/admin/missionList');
  };

  const checkPassword = (rule: any, value: string) => {
    // if (value.length === 0) return Promise.reject('请选择组件');
    return Promise.resolve();
  };

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <Image
          loader={myNextImgLoader}
          src={`${STATIC_ASSETS_URL}/svg/logo.svg`}
          width="200px"
          height="35px"
          alt="logo"
        />
        <div className={styles.container}>
          <div className={styles.title}>邮箱登录</div>
          <div className={styles.loginArea}>
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={initValue}
              labelCol={{ style: { width: 120 } }}
            >
              <Form.Item
                label="用户名"
                name="name"
                required={false}
                className={styles.loginFormRow}
                validateTrigger="onBlur"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                required={false}
                className={styles.loginFormRow}
                validateTrigger="onBlur"
                rules={[
                  { required: true, message: '请输入密码' },
                  { validator: checkPassword },
                ]}
              >
                <Input placeholder="请输入密码" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
