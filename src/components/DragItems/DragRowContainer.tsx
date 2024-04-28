import React, {useState} from "react";
import DropZone, {dragItem} from './DropZone'
import DragComponent, {LayoutItem} from './DragComponent'
import {generateUUID} from "@/utils";
import s from './style/drag.module.less'
import {FormInstance, message} from "antd";
import {useDrop} from "react-dnd";
import {icons} from '@/constants/icons'

/**
 * 组件容器区域
 */

export const iconList = [icons.poolIcon1, icons.poolIcon2, icons.poolIcon3]
export const poolNameList = ['交集池', '并集池', '差集池']
export const poolTipsList = ['同时满足以下特征', '满足以下其中之一特征', '排除以下其中之一特征']

interface RowContainerProps {
  data: LayoutItem[];
  rowIndex: number; // 0 交集， 1并集， 2排除
  swapPosition: (rowIndex: number, index1: number, index2: number) => void
  dropItemFromOutside: (item: dragItem, rowIndex: number) => void
  deleteFunc?: (rowIndex:number, compIndex:number) => void
  form: FormInstance<any>;
}

const DragRowContainer = (rowContainerProps: RowContainerProps) => {
  const { data, swapPosition, dropItemFromOutside, deleteFunc, form, rowIndex } = rowContainerProps;
  const [open, setOpen] = useState<boolean>(true)

  const currentPath = `${rowIndex}` // 标注当前位置

  // 获取大容器能接收的item类型
  const getAcceptItem = () => {
    const acceptItem = ['menu']
    const listArr = [0,1,2].filter(item => item !== rowIndex)
    listArr.forEach(item => {
      acceptItem.push(`component${item}`)
    })
    return acceptItem
  }

  const [{ overing }, drop] = useDrop({
    accept: getAcceptItem(),
    drop(item: any) {
      if (data?.length >= 20){
        message.warning('每个运算池最多添加20个选项')
        return
      }
      dropItemFromOutside(item, rowIndex);
    },
    collect(monitor) {
      return {
        overing: monitor.isOver()
      }
    }
  });

  return <div ref={drop} className={s.rowWrapper}
              style={{
                border: overing ? '1px solid #2994ff' : '1px solid transparent',
                background: overing ? 'rgba(230, 246, 255, 0.5)' : ''
              }}
  >

    <div className={s.containerTop}>
      <div className={s.containerLeft}>
        {iconList[rowIndex]}
        <div className={s.labelContainer}>
          <span className={s.largeTitle}>{poolNameList[rowIndex]}</span>
          <span className={s.labelNum}>{`(${data.length}/20)`}</span>
          <span className={s.tips}>{poolTipsList[rowIndex]}</span>
        </div>
      </div>

      <div onClick={() => setOpen(!open)}
           style={{height: 20, transform: open ? 'rotateX(180deg)' : '', cursor: 'pointer'}}
      >
        {icons.arrowDownIcon}
      </div>
    </div>

    <div
      className={s.rowContainer}
      style={{
        height: open ? 'auto' : 0,
        paddingBottom: open ? 16 : 0,
        minHeight: open && data.length === 0 ? 168 : 0
    }}>
      {
        data?.map((item, index) => {
          return <div key={`comp_id_${item.id}`} style={{display: 'flex'}}>
            <DragComponent data={item}
                           rowIndex={rowIndex}
                           compIndex={index}
                           deleteFunc={deleteFunc}
                           swapPosition={swapPosition}
                           form={form}
            ></DragComponent>
          </div>
        })
      }
    </div>
  </div>
}

export default DragRowContainer
