import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import router from 'next/router';
import styles from '@/page-components/layout/styles/sideMenu.module.less';

const SideMenu = (props: {
  menuOptions: Record<string, any>;
  onChange?: (key: string) => void; // 改变回调
  selectedMenuKey?: string; // 选中的key
  // openMenuKeys?: string[]; // 默认打开的key
}) => {
  const { menuOptions, onChange, selectedMenuKey } = props;
  const [selectedKey, setSelectedKey] = useState<string | undefined>(
    selectedMenuKey,
  ); // 选中的key
  const [openKeys, setOpenKeys] = useState<any[]>([]); // 展开的key
  // const [isSelectedMenu, setIsSelectedMenu] = useState<boolean>(false);

  // 初始化选中的菜单
  useEffect(() => {
    const urlName = router.pathname;
    // 激活当前选中的url
    if (!selectedKey) setSelectedKey(urlName);
    const openUrls: any[] = [];

    // 找到需要自动展开的父系url
    menuOptions.forEach((item: any) => {
      if (item?.activedUrl?.includes(urlName)) openUrls.push(item.key);
    });
    setOpenKeys(openUrls);
  }, []);

  // 改变了菜单的回调
  useEffect(() => {
    onChange?.(selectedKey ?? '');
  }, [selectedKey]);

  // 点击选择了没有子项目的菜单
  const handleMenuItemClick = (e: any, closeOtherMenu = false) => {
    const key = e.target.dataset?.value;
    router.push(key);
    setSelectedKey(key);
    // 如果需要，关闭其他展开的菜单
    if (closeOtherMenu) setOpenKeys([key]);
  };

  // 点击了子菜单
  const handleSubMenuClick = (e: any) => {
    const key = e.currentTarget.dataset?.value;
    const openKeysCopy = [...openKeys];
    const idx = openKeysCopy.indexOf(key);
    if (idx !== -1) {
      openKeysCopy.splice(idx, 1);
    } else {
      openKeysCopy.push(key);
    }
    setOpenKeys(openKeysCopy);
  };

  return (
    <div className={styles.customMenu}>
      {menuOptions.map((menu: any) => {
        if (menu.children?.length) {
          return (
            <div key={menu.key} className={styles.subMenu}>
              <div
                className={cs(styles.sub, {
                  [styles['sub-open']]: openKeys.includes(menu.key),
                  [styles['sub-actived']]: menu.children.some((it: any) => {
                    return (
                      it.key === selectedKey ||
                      it?.activedUrl?.includes(selectedKey) ||
                      router.pathname.startsWith(it.key)
                    );
                  }),
                })}
                data-value={menu.key}
                onClick={handleSubMenuClick}
              >
                {menu.title}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-value={menu.key}
                  onClick={handleSubMenuClick}
                  className={styles.icon}
                >
                  <path
                    d="M3.90637 7.875L6.99996 4.78141L10.0936 7.875"
                    stroke="#9C9EA6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {openKeys.includes(menu.key) && (
                <div
                  className={cs(styles['subMenu-wrapper'])}
                  data-height={menu.children.length * 32}
                >
                  {menu.children.map((subMenu: any) => {
                    const isActivitedSubMenu =
                      selectedKey === subMenu.key ||
                      subMenu?.activedUrl?.includes(selectedKey) ||
                      router.pathname.startsWith(subMenu.key);
                    return (
                      <div
                        key={subMenu.key}
                        className={cs(styles.item, {
                          [styles['item-selected']]: isActivitedSubMenu,
                        })}
                        data-value={subMenu.key}
                        onClick={handleMenuItemClick}
                      >
                        {subMenu.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        const isActivetedMenu =
          selectedKey === menu.key ||
          menu?.activedUrl?.includes(selectedKey) ||
          router.pathname.startsWith(menu.key);
        return (
          <div
            key={menu.key}
            className={cs(styles.item, {
              [styles['item-selected']]: isActivetedMenu,
            })}
            data-value={menu.key}
            onClick={(e) => handleMenuItemClick(e, true)}
          >
            {menu.title}
          </div>
        );
      })}
    </div>
  );
};

export default SideMenu;
