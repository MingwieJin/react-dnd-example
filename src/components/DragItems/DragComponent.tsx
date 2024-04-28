import {useDrag, useDrop} from "react-dnd";
import React, {useEffect, useRef} from "react";
import {menuLabel, registeredComponent} from '@/page-components/admin/DragPool'
import s from './style/drag.module.less'
import {useCrowdPackStore} from "@/store";
import {FormInstance} from "antd";
import {icons} from "@/constants";
import { getEmptyImage } from 'react-dnd-html5-backend';

export interface LayoutItem {
  type: string;
  id: string;
  componentType: string
}

interface ComponentProps {
  data: LayoutItem,
  rowIndex: number | string; // 行index
  compIndex: number; // 组件index
  // isMenu?: boolean; // 是否是菜单样式
  deleteFunc?: (rowIndex:number, compIndex:number) => void; // 删除
  swapPosition?: (rowIndex: number, index1: number, index2: number) => void; // 换位置
  form?: FormInstance<any>;
  menuCount?: Record<string, number>
}
const DragComponent = (compProps: ComponentProps) => {
  const ref = useRef(null);

  const { componentType, id } = compProps.data;
  const {deleteFunc = () => {}, rowIndex, compIndex, form, swapPosition = () => {}, menuCount = {}} = compProps

  const isMenuComponent = rowIndex === 'menu'

  const currentPath = `${rowIndex}-${compIndex}`;

  const [{dragging}, drag, preview] = useDrag({
    type: isMenuComponent ? 'menu' : `component${rowIndex}`,
    item: {
      // type: 'component',
      path: currentPath,
      data: compProps.data,
      index: compIndex
    },
    collect(monitor) {
      return {
        dragging: isMenuComponent ? false : monitor.isDragging()
      }
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true }); // 隐藏拖拽dom
  }, []);


  const [{overing}, drop] = useDrop({
    accept: `component${rowIndex}`,
    // hover(item: any) {
    //   // menu没有任何效果
    //   if (isMenuComponent) return
    //   const targetIndex = item.index
    //   item.index = compIndex;
    //   swapPosition(Number(rowIndex), compIndex, targetIndex);
    // }
    drop(item: any) {
      swapPosition(Number(rowIndex), compIndex, item.index)
    },
    collect(monitor) {
      return {
        overing: monitor.isOver()
      }
    }
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  // 获取options
  const store = useCrowdPackStore()


  // options可能可以是一个数组，也可以是多个
  const getOptions = () => {
    if (!componentType) return undefined
    return (store as Record<string, any>)[componentType]
  }
  const options = getOptions()

  const deleteIcon = (
    <div
      className={s.deleteIcon}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        deleteFunc(rowIndex as number, compIndex)
      }}
    >
      {icons.deleteIcon}
    </div>
  )

  const getClass = () => {
    if (isMenuComponent) return 'menuComponent'
    if (dragging) return 'draggingComponent'
    if (overing) return 'overingComponent'
    return 'component'
  }

  return <div
    ref={ref}
    className={s[getClass()]}
  >
    {isMenuComponent ?
      // (menuComponent?.[componentType] || null)
      <div className={s.rightMenuItem}>
        {menuLabel[componentType]}
            <div className={s.rightMenuCountContainer}>
              {menuCount[componentType] !== 0 && (
                <div className={s.rightMenuCount}>
                  {menuCount[componentType]}
                </div>
              )}
              {icons.move}
            </div>
      </div>
      : (registeredComponent?.[componentType]({name: [rowIndex, id], deleteIcon, options, form})  || null)}
      {/*: (registeredComponent?.[componentType]?.[componentSubType] || null)}*/}
  </div>
}

export default DragComponent
