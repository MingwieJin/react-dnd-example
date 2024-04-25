import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import cookie from 'js-cookie';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { aes, isNoLoginPage } from '@/utils/util';
import { setAuth } from '@/utils/request'
import { getUserDetail } from '@/api/common';

type UserType = {
  userEmail?: string; // 账号绑定的163邮箱
  userDictUid?: string; // 账号绑定的词典账户uid
  userRole?: string; // 当前角色
  userId?: string | number; // 账号id
  nickname?: string;
  company?: string;
  email?: string;
  stage?: number;
  avatar?: string;
  industry?: number;
  name?: string;
  phone?: string;
  openAssignTask?: boolean; // 是否开通指派任务权限
  openContributeTask?: boolean; // 是否开通投稿任务权限
  openProductWindow?: boolean; // 是否开通橱窗权限
  isBindDict?: boolean; // 是否绑定词典媒体
  verified?: boolean; // 是否通过资质认证
};

type authContextType = {
  user: UserType;
  setUserInfo: (params: UserType) => void;
  clearUserInfo: () => void;
  refreshUserInfo: () => Promise<any>;
  userInfoLoading: boolean;
};

const authContextDefaultValues: authContextType = {
  user: {},
  setUserInfo: () => {},
  clearUserInfo: () => {},
  refreshUserInfo: async () => {},
  userInfoLoading: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserType>({});
  const [userInfoLoading, setUserInfoLoading] = useState<boolean>(false);

  const { pathname } = useRouter();
  const isNOLogin = isNoLoginPage(pathname) || pathname === '/';

  const setUserInfo = (info: UserType) => {
    setUser({ ...user, ...info });
  };

  const clearUserInfo = () => {
    setUser({});
  };

  // 获取用户信息
  const getUserInfo = async (initValue?: UserType) => {
    setUserInfoLoading(true);
    try {
      const data = await getUserDetail();
      if (data) {
        setUserInfo({
          ...initValue,
          company: data.companyName,
          email: data.email,
          nickname: data.nickname,
          stage: data.stage ?? 0,
          avatar: data.avatar,
          industry: data.industry,
          name: data.name,
          phone: data.phone,
          openProductWindow: data.isProductWindowOpen,
          openAssignTask: data.taskPermission,
          openContributeTask: data.postTaskPermission,
          isBindDict: data.isBindDict,
          userDictUid: data.loginUser?.dictUid,
          userEmail: data.loginUser?.username,
          verified: data.verified,
        });
      } else {
        setUserInfo({ ...initValue, stage: 0 });
      }
      setUserInfoLoading(false);
    } catch (error) {
      console.log(error);
      message.error('用户信息获取失败');
      setUserInfoLoading(false);
    }
  };

  // 导出
  const context: authContextType = {
    user,
    setUserInfo,
    clearUserInfo,
    refreshUserInfo: getUserInfo,
    userInfoLoading,
  };

  // 查看是否登录
  useEffect(() => {
    const authCookie = cookie.get('D_USER') || '{}';

    const { email, token, role: encryptedRole, userId } = JSON.parse(authCookie);
    const role = encryptedRole && aes().decrypt(encryptedRole);

    // 设置请求头的token
    setAuth({ token });

    setUserInfo({
      userId,
      userEmail: email,
      userRole: role,
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    </>
  );
}

export default AuthContext;
