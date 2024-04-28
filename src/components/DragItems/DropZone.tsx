import {useDrop} from "react-dnd";
import React from "react";
import {LayoutItem} from "@/components/DragItems/DragComponent";
import {message} from "antd";

// 拖拽时候传的数据
export interface dragItem {
  type: string,
  path: string,
  data: LayoutItem
}

/**
 * 交换区域
 */
interface DropZoneProps {
  className: string;
  path: string;
  swapPosition: (item: dragItem, path: string,) => void
  containerLength?: number;
}

const DropZone = (props: DropZoneProps) => {

  const { swapPosition, path, containerLength = 0} = props;

  const [{ overing }, drop] = useDrop({
    accept: ['component'],
    drop(item: any) {
      // console.log('触发了drop', item, path)
      if (containerLength >= 20){
        message.warning('不能超过20个')
        return
      }
      swapPosition(item, path);
    },
    collect(monitor) {
      return {
        overing: monitor.isOver()
      }
    }
  });
  return <div ref={drop}
              className={`drop-zone ${props.className} ${overing ? 'focus' : ''}`}
              style={{
                width: containerLength === 0 ? '100%' :20,
                minHeight: containerLength === 0 ? 140 : 120,
                background: overing ? 'rgba(85,132,255, 0.5)' : 'transparent'
              }}
  ></div>
}

export default DropZone
