import {useDragLayer} from "react-dnd";
import React, {CSSProperties} from "react";
import s from './style/drag.module.less'
import type { XYCoord } from 'react-dnd';
import {menuLabel} from "@/page-components/admin/DragPool";
import {icons} from "@/constants";

const getItemStyles = (
  initialCursorOffset: XYCoord | null,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) => {
  if (!currentOffset || !initialCursorOffset || !initialOffset) {
    return {
      display: 'none',
    };
  }

  const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x);
  const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y);

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}


const DragLayer = () => {
  const { isDragging, item, initialOffset, currentOffset, initialCursorOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    // itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    initialCursorOffset: monitor.getInitialClientOffset(),
  }));


  // if (!isDragging) {
  //   return null;
  // }

  const label = item ? menuLabel[item?.data?.componentType] : ''

  return (
    <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      left: 0,
      top: 0,
      display: isDragging ? '' : 'none'
    }}>
      <div style={getItemStyles(initialCursorOffset, initialOffset, currentOffset)}>
        <div className={s.dragLayerItem}>
          <span className={s.dragLayerTitle}>{label}</span>
          <span>{icons.move}</span>
        </div>
      </div>
    </div>
  );
}

export default DragLayer
