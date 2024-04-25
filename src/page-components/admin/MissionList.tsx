import React, { useEffect, useState } from 'react';
import {
  Select,
} from 'antd';
import router from 'next/router';
import DragOrder from './DragOrder'
import styles from './styles/missionList.module.less';

const MissionList = () => {
  const [menus, setMenus] = useState<Array<any>>();

  return (
      <div>
        <DragOrder></DragOrder>
      </div>
  );
};

export default MissionList;
