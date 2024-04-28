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


export const booleanMap = {
  否: 0,
  是: 1,
};

// 性别选项map
export const genderMap = {
  不限: -1,
  男: 1,
  女: 0,
};

// 初始化计数
export const initConut = {
  population: 0, // 人口属性
  age: 0, // 年龄
  gender: 0, // 性别

  regional: 0, // 地域属性
  resideEstatePrice: 0, // 小区价格
}

// 二级菜单归类一级菜单
export const transferMenuLevel: Record<string, string> = {
  age: 'population', // 年龄
  gender: 'population', // 性别

  resideEstatePrice: 'regional', // 小区价格
}

export const resideEstatePriceMap = {
  '0~10000': 0,
  '10000~20000': 1,
  '20000~30000': 2,
  '30000~40000': 3,
  '40000~50000': 4,
  '50000~60000': 5,
  '60000~70000': 6,
  '70000~80000': 7,
  '80000~90000': 8,
  '90000~100000': 9,
  '≥100000': 10,
}


