import {Form, FormInstance, Input} from "antd";
import React, {useState, useRef, useEffect} from "react";
import s from '../styles/menu.module.less'
import {icons} from "@/constants";
import DragComponent from "@/components/DragItems/DragComponent";
import {generateUUID} from "@/utils";
import {menuComponent} from '../DragPool';
import {debounce} from "lodash";

export interface formProps {
  // setMenuCountFunc: (label: string, v: number) => void
  menuCount: Record<string, number>;
}

const LeftMenu = (props: formProps) => {
  const { menuCount } = props

  const [activeMenu, setActiveMenu] = useState('population');

  const basicMenu = [{
    key: 'population',
    label: '人口属性',
  }, {
    key: 'regional',
    label: '地域属性'
  }]



  const menuList = [...basicMenu].map(item => item.key)
  // 用于反显一级菜单
  const menuMap = [...basicMenu].reduce((acc: Record<string, any>, {key, label}) => {
    acc[key] = label;
    return acc;
  }, {});

  useEffect(() => {
    menuRight?.current?.addEventListener('scroll', handleScroll);
    return () => {
      menuRight?.current?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 监听滚动看激活哪个菜单
  const handleScroll = debounce(() => {
    for(const i in menuList) {
      const keyItem = menuList[i]
      const element = document.getElementById(`menu_scroll_${keyItem}`);
      // 获取元素在可视区域中的位置
      const rect = (element as any).getBoundingClientRect();
      // 判断是否在可视区域内
      if (rect.bottom - 111  >= 0 && rect.bottom <= window.innerHeight) {
        setActiveMenu(keyItem);
        return
      }
    }
  }, 100)

  const menuRight = useRef<HTMLDivElement | null>(null)

  // 跳转锚点
  const moveTo = (key: string) => {
    scrollToMenu(`menu_scroll_${key}`)
    setActiveMenu(key);
  }

  // 滚动
  const scrollToMenu = (chapterId: string) => {
    const chapterEl = document.getElementById(chapterId);
    (chapterEl as Element).scrollIntoView({ behavior: 'smooth' });
  }


  // 生成左侧锚点菜单
  const getLeftMenuItem = (item: {key: string, label: string}) => {
    return (
      <div key={item.key} className={item.key === activeMenu ? s.leftMenuItemActive : s.leftMenuItem} onClick={() => moveTo(item.key)}>
        {item.label}
        {menuCount[item.key] !== 0 && <div className={s.leftMenuCount}>{menuCount[item.key]}</div>}
      </div>
    )
  }

  // 生成拖拽菜单
  const getRightMenuItem = (menukey: string, menulabel: string) => {
    return (<div key={menukey}>
       <div
        className={s.rightMenuTitle}
        style={{marginTop: menukey !== 'population' ? 12 : 0}}
      >
        {menukey !== 'population' ? menulabel : ''}
      </div>
      {/*<div id={`menu_scroll_for_link_${menukey}`}></div>*/}

      <div id={`menu_scroll_${menukey}`}>
        {
          menuComponent[menukey] ? menuComponent[menukey].map((item: {key: string, label: string}) => {
              const data = {
                id: item.key,
                type: 'menu',
                componentType: item.key
              }

              return (<DragComponent
                key={`menu-${item.key}-${generateUUID()}`}
                data={data}
                rowIndex='menu'
                compIndex={0}
                menuCount={menuCount}
              ></DragComponent>)
            }
          ) : null
        }
      </div>
    </div>)
  }


  return (
    <div className={s.menu}>
      <div className={s.menuLeft}>

        {/*基本属性标签*/}
        <div className={s.leftMenuTitle}>
          {icons.menu1}
          <span className={s.leftMenuWord}>基本属性标签</span>
        </div>

        <div>
          { basicMenu.map(item => getLeftMenuItem(item)) }
        </div>


      </div>

      <div className={s.menuRightContainer} >
        <div className={s.rightMenuTopTitle}>{`${menuMap[activeMenu]}可选标签`}</div>
        <div className={s.menuRight} ref={menuRight}>
          {basicMenu.map(item => getRightMenuItem(item.key, item.label))}
          <div className={s.blankMenu}></div>
        </div>
      </div>
    </div>
  )
}

export default LeftMenu
