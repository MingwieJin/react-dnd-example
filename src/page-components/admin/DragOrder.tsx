import React, {useEffect, useRef, useState, useContext, useCallback} from 'react';

import { useDrag, useDrop } from 'react-dnd'

/**
 * 注册组件区域
 */

interface LayoutItem {
  type: string;
  id: string;
  componentType: string
}

// 拖拽时候传的数据
interface dragItem {
  type: string,
  path: string,
  data: LayoutItem
}

const style= {
  borderStyle:'solid',
  background: 'skyblue',
  width: 200,
  lineHeight: '60px',
  padding: '0 20px',
  border: '1px solid #000',
  margin: '0 10px',
  cursor: 'move',
}

const registeredComponent: Record<string, any> = {
  component1: <div style={style}>component1</div>,
  component2: <div style={style}>component2</div>,
  component3: <div style={style}>component3</div>
}

const menuComponent: Record<string, any> = {
  component1: <div style={style}>菜单1</div>,
  component2: <div style={style}>菜单2</div>,
  component3: <div style={style}>菜单3</div>
}

interface ComponentProps {
  data: LayoutItem,
  rowIndex: number | string; // 行index
  compIndex: number; // 组件index
  isMenu?: boolean; // 是否是菜单样式
}
const Component = (compProps: ComponentProps) => {
  const { componentType } = compProps.data;


  const currentPath = `${compProps.rowIndex}-${compProps.compIndex}`;
  const [, drag] = useDrag({
    type: 'component',
    item: {
      type: 'component',
      path: currentPath,
      data: compProps.data
    },
  });

  return <div ref={drag} className="component">
    {compProps?.isMenu ? (menuComponent?.[componentType] || null) : (registeredComponent?.[componentType] || null)}
  </div>
}

/**
 * 注册组件区域结束
 */


/**
 * 组件容器区域
 */

interface RowContainerProps {
  data: LayoutItem[];
  rowIndex: number;
  swapPosition: (item: dragItem, path2: string) => void
}

function RowContainer(rowContainerProps: RowContainerProps) {
  const ref = useRef(null);
  const { data, swapPosition } = rowContainerProps;

  const currentPath = `${rowContainerProps.rowIndex}` // 标注当前位置

  return <div ref={ref} className="rowContainer">
    {
      data?.map((item, index) => {
        return <div key={`comp_id_${item.id}`}>
          <DropZone className="drop-zone-horizental" swapPosition={swapPosition} path={`${currentPath}-${index}`}></DropZone>
          <Component data={item}
                     rowIndex={rowContainerProps.rowIndex}
                     compIndex={index}
          ></Component>
        </div>
      })
    }
    <DropZone swapPosition={swapPosition} className="drop-zone-horizental" path={`${currentPath}-${data?.length}`}></DropZone>
  </div>
}

/**
 * 组件容器区域结束
 */

/**
 * 交换区域
 */
interface DropZoneProps {
  className: string;
  path: string;
  swapPosition: (item: dragItem, path: string,) => void
}

const DropZone = (props: DropZoneProps) => {

  const { swapPosition, path } = props;

  const [{ overing }, drop] = useDrop({
    accept: ['component', 'menu'],
    drop(item: any) {
      // console.log('触发了drop', item, path)
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
                height: 20,
                background: overing ? '#027cdc' : 'red'
              }}
  ></div>
}

/**
 * 交换区域结束
 */


const MissionList = () => {

  const [cardListTotal, setCardListTotal] = useState<LayoutItem[][]>([
    // 交集池
    [
      {
        id: '0',
        type: 'component',
        componentType: 'component1'
      },
      {
        id: '1',
        type: 'component',
        componentType: 'component2'
      },
    ],
      // 并集池
    [
      {
        id: '5',
        type: 'component',
        componentType: 'component3'
      },
      {
        id: '6',
        type: 'component',
        componentType: 'component1'
      },
    ],
      // 排除池
    []
  ]
  )

  const [menuList, setMenuList] = useState([{
    id: '8',
    type: 'component',
    componentType: 'component3'
  }])


  // item 被拖拽的物体 path2: 目标路径
  const swapPosition = (item: dragItem, path2: string) => {


    const newList = {...cardListTotal}
    // 如果是menu拖过来的不用删除
    if (item.path.indexOf('menu') === -1) {
      const pathForm = item.path.split('-')
      // 删除原来的item
      newList[parseInt(pathForm[0])].splice(parseInt(pathForm[1]), 1)
    }

    const pathTo = path2.split('-')
    newList[parseInt(pathTo[0])].splice(parseInt(pathTo[1]), 0, item.data)

    setCardListTotal(newList)
  }

  return (
    <div style={{display: 'flex'}}>
      <div style={{border: '1px solid #ccc', minWidth: 200}}>
        <div>左侧菜单</div>
        <Component data={menuList[0]}
                   rowIndex='menu'
                   compIndex={0}
        ></Component>
      </div>

      <div style={{border: '1px solid #ccc', minWidth: 200}}>
        <div>交集区</div>
        <RowContainer swapPosition={swapPosition} rowIndex={0} data={cardListTotal[0]}></RowContainer>
      </div>

      <div style={{border: '1px solid #ccc', minWidth: 200}}>
        <div>并集区</div>
        <RowContainer swapPosition={swapPosition} rowIndex={1} data={cardListTotal[1]}></RowContainer>
      </div>

      <div style={{border: '1px solid #ccc', minWidth: 200}}>
        <div>排除区</div>
        <RowContainer swapPosition={swapPosition} rowIndex={2} data={cardListTotal[2]}></RowContainer>
      </div>
    </div>
  );
};

export default MissionList;
