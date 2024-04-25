import { UserRole } from './common';

// 角色: 超级管理员-ADMIN，顾问-CONSULTANT ，运营-OP，销售-SALE, DB-DB
// 用户菜单
export const roleMenu: Record<string, any> = {
  [UserRole.ADMIN]: [
    {
      key: '/admin/missionList',
      title: '举例1',
    },
  ],
};
