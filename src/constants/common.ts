export const dateFormat = 'YYYY-MM-DD';

export const dateFormat2 = 'YYYY-MM-DD HH:mm:ss';

export const dateFormat3 = 'YYYY-MM-DD HH:mm';

// 角色: 超级管理员-ADMIN，顾问-CONSULTANT ，运营-OP，销售-SALE, DB-DB
export const UserRole: Record<string, string> = {
  CONSULTANT: 'consultant',
  ADMIN: 'admin',
  OP: 'operator',
  SALE: 'sales',
  DB: 'db',
};

// TODO 角色权限路径
export const roleAuthPage: Record<string, string> = {
  [UserRole.ADMIN]: '/admin',
  // [UserRole.CONSULTANT]: '顾问',
  [UserRole.OP]: '/op',
  [UserRole.CONSULTANT]: '/consultant'
  // [UserRole.SALE]: '销售',
  // [UserRole.DB]: 'DB',
  // sponsor: '/advertiser',
  // kol: '/creator/personal',
  // brandKol: '/creator/institutional',
  // kolOperator: '/op/creator',
  // adOperator: '/op/delivery',
  // admin: '/op/delivery',
  // auditOperator: '/op/audit',
};

// TODO 回退时候的默认路径
export const roleDefaultPage: Record<string, string> = {
  [UserRole.ADMIN]: '/admin/missionList',
  [UserRole.CONSULTANT]: '/op/missionList',
  [UserRole.OP]: '/op/missionList',
  [UserRole.SALE]: '/op/missionList',
  [UserRole.DB]: '/op/missionList',
};

export const roleChineseName: Record<string, string> = {
  [UserRole.ADMIN]: '管理员',
  [UserRole.CONSULTANT]: '顾问',
  [UserRole.OP]: '运营',
  [UserRole.SALE]: '销售',
  [UserRole.DB]: 'DB',
};


