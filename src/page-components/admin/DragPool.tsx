import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  FormInstance,
  message
} from 'antd';

import s from './styles/new.module.less'
import {dragItem} from "@/components/DragItems/DropZone";
import DragComponent, {LayoutItem} from "@/components/DragItems/DragComponent";
import DragRowContainer from "@/components/DragItems/DragRowContainer";
import {generateUUID} from "@/utils";
import router from 'next/router';
import {useCrowdPackStore} from "@/store";
import {icons} from '@/constants/icons'
import DoubleInput, {formProps} from "./components/DoubleInput";
import FormRadio from "./components/FormRadio";
import FormCheckbox from "./components/FormCheckbox"
import {cloneDeep} from "lodash";
import LeftMenu from './components/LeftMenu'
import {initConut, transferMenuLevel} from "@/constants";
import DrapLayer from "@/components/DragItems/DropLayer";
import {useDrop} from "react-dnd";

interface componentParams {
  name: string[];
  deleteIcon: JSX.Element;
  options?: any[];
  form: FormInstance<any>;
}

// 组件注册
export const registeredComponent: Record<string, any> = {
  age: (params: componentParams) => DoubleInput({
    ...params,
    label: menuLabel.age,
    deleteIcon: params.deleteIcon
  }),
  gender: (params: componentParams) => FormRadio({
    ...params,
    label: menuLabel.gender,
    rule: [{ required: true, message: '请选择'}],
  }),
  resideEstatePrice: (params: componentParams) => FormCheckbox({
    ...params,
    label: menuLabel.resideEstatePrice,
    rule: [{ required: true, message: '请选择'}],
  }),
}

// 菜单注册
export const menuLabel: Record<string, string> = {
  age: '年龄',
  gender: '性别',
  resideEstatePrice: '小区价格',
}

/**
 * 新增一个菜单需要添加
 * menuComponent新增菜单
 * 如果有option, store需要添加对应option
 * registeredComponent需要添加如何渲染组件
 * initConut中增计数
 * transferMenuLevel中添加映射关系
 */

export const menuComponent: Record<string, any[]> = {
  population: [{
    key: 'age',
    label: menuLabel.age
  }, {
    key: 'gender',
    label: menuLabel.gender
  }],
  regional: [{
    key: 'resideEstatePrice',
    label: menuLabel.resideEstatePrice
  }],
}


const NewCrowdPack = () => {
  const [initialValues, setInitialValues] = useState<Record<string, any>>({
    0: {},
    1: {},
    2: {}
  })
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [coverDeviceNum, setCoverDeviceNum] = useState<number>() // 覆盖设备数
  const [loading, setLoading] = useState<boolean>(false)
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [confirmBtnLoading, setConfirmBtnLoading] = useState<boolean>(false)
  const [cardListTotal, setCardListTotal] = useState<LayoutItem[][]>([
      // 交集池
      [
        // {
        //   id: `age_${generateUUID()}`,
        //   type: 'component',
        //   componentType: 'age'
        // },
      ],
      // 并集池
      [],
      // 排除池
      []
    ]
  )

  const [menuCount, setMenuCount] = useState<Record<string, number>>(initConut);

  const [form] = Form.useForm();
  const {setOptions} = useCrowdPackStore()

  // 初始化list
  useEffect(() => {
    initOptions()
  }, [])

  // 初始化选项
  const initOptions = () => {

    const phoneBrand: any = [{
      label: '华为',
      vale: 1,
    }, {
      label: '小米',
      vale: 2,
    }]

    const carBrand: any = [{
      label: '奔驰',
      vale: 1,
    }, {
      label: '宝马',
      vale: 2,
    }, {
      label: '奥迪',
      vale: 3,
    }]


    setOptions({
      carBrand,
      phoneBrand,
    })

  }

  // 用于元素换row了以后数据也跟随过去
  const switchData = (rowIndex: number, tarRowIndex: number, key: string) => {
    // console.log('交换数据', rowIndex, tarRowIndex, key)
    const formData = form.getFieldsValue()
    const tmpData = formData[rowIndex][key]
    if (!formData[tarRowIndex]) formData[tarRowIndex] = {}
    formData[tarRowIndex][key] = cloneDeep(tmpData)
    delete formData[rowIndex][key]

    form.setFieldsValue(formData)
  }

  // 更换同一个rowContainer里的元素位置
  const swapPosition = (rowIndex: number, index1: number, index2: number) => {
    // console.log('更换位置', rowIndex, index1, index2)
    const newList = {...cardListTotal}
    const tmp = newList[rowIndex][index1]
    newList[rowIndex][index1] = newList[rowIndex][index2]
    newList[rowIndex][index2] = tmp
    setCardListTotal(newList)
  }

  // 用于rowContainer放置了区域以外的元素
  const dropItemFromOutside = (item: dragItem, rowIndex: number) => {
    // console.log('放置了区域以外的物体', item)
    const newList = {...cardListTotal}
    const newData = {...item.data}
    const isMenuDragToArea = item.path.indexOf('menu') !== -1
    // 如果不是menu拖过来的那么用删除远位置的数据
    if (!isMenuDragToArea) {
      const pathForm = item.path.split('-')
      // 删除原来的item
      newList[parseInt(pathForm[0])].splice(parseInt(pathForm[1]), 1)
      switchData(parseInt(pathForm[0]), rowIndex, newData.id)
    }

    if (isMenuDragToArea) {
      newData.id = `${newData.id}_${generateUUID()}`
      changeLabelNumber(newData.componentType)
    }
    newList[rowIndex].push(newData)
    setCardListTotal(newList)
  }

  const generateAge = (data: Record<string, any>) => {
    const result = data.map((item: string) => parseInt(item))
    return result
  }

  const generageData = (key: string, i: string, res: Record<string, any>) => {
    switch (key) {
      case 'age':
        return generateAge(res[i])
      default:
        return res[i]
    }
  }

  // 生成下发用的数据
  const generateParams = (res: Record<string, any>) => {
    const result: Record<string, any> = {}
    for (const i in res) {
      const key = i.split('_')[0]
      const resultData = generageData(key, i, res)
      if (result[key]) result[key].push(resultData)
      else result[key] = [resultData]
    }
    return result
  }

  // 变更菜单label选择数量
  const changeLabelNumber = (label: string, isIncrease = true) => {
    const countData = {...menuCount}
    if (countData[label] !== undefined) isIncrease ? countData[label]++ : countData[label]--
    if (countData[transferMenuLevel[label]] !== undefined)
      isIncrease ? countData[transferMenuLevel[label]]++ : countData[transferMenuLevel[label]]--
    setMenuCount(countData)
  }

  const getFormData = async () => {
    try {
      const data = await form.validateFields()
      const intersectionPool = generateParams(data[0]) // 交集
      const unionPool = generateParams(data[1]) // 并集
      const differencePool = generateParams(data[2]) // 排除
      const intersectionPoolLength = Object.keys(intersectionPool).length
      const unionPoolLength = Object.keys(unionPool).length
      const differencePoolLength = Object.keys(differencePool).length
      if (intersectionPoolLength === 0 && unionPoolLength === 0 && differencePoolLength === 0) {
        message.warning('三个池子不能同时为空')
        return false
      }

      const params: any = {}
      if (intersectionPoolLength) params.intersectionPool = intersectionPool
      if (unionPoolLength) params.unionPool = unionPool
      if (differencePoolLength) params.differencePool = differencePool
      return params
    } catch (e) {
      message.warning('请完善所有卡片信息')
      return false
    }
  }

  // 计算数据
  const getCover = async (needOpenModal = false) => {
    const params = await getFormData()
    if (params === false) {
      setLoading(false)
      return
    }
    console.log('输出', params)
  }

  // 删除方法
  const deleteFunc = (rowIndex: number, compIndex: number) => {
    const newList = {...cardListTotal}
    const key = newList[rowIndex][compIndex].componentType
    newList[rowIndex].splice(compIndex, 1)
    setCardListTotal(newList)
    changeLabelNumber(key, false)
  }

  // 用于消除ios drop在空位置的延迟, 本身没有任何实际功能
  const [, drop] = useDrop({
    accept: ['menu', 'component1', 'component2', 'component3'],
    drop(item) {},
  });

  return (
    <div className={s.labelContainer} ref={drop}>
      <DrapLayer />

      {/*左侧菜单选择*/}
      {<LeftMenu menuCount={menuCount} />}

      {/*右侧标签池*/}
      <div className={s.rightSelectArea}>

        <Form form={form} initialValues={initialValues} labelCol={{ flex: '0 0 70px' }}>
          {/*<div>交集区</div>*/}
          <div className={s.labelArea} style={{marginTop: 0}}>
            <DragRowContainer
              form={form}
              swapPosition={swapPosition}
              dropItemFromOutside={dropItemFromOutside}
              deleteFunc={deleteFunc}
              rowIndex={0}
              data={cardListTotal[0]}
            />
          </div>

          <div className={s.tipsBetweenContainer}>
            <div className={s.tipsBetween}>
              且
            </div>
          </div>
          {/*<div>并集区</div>*/}
          <div className={s.labelArea}>
            <DragRowContainer
              form={form}
              swapPosition={swapPosition}
              dropItemFromOutside={dropItemFromOutside}
              deleteFunc={deleteFunc}
              rowIndex={1}
              data={cardListTotal[1]}
            />
          </div>

          <div className={s.tipsBetweenContainer}>
            <div className={s.tipsBetween}>
              且不满足(排除)
            </div>
          </div>
          {/*<div>排除区</div>*/}
          <div className={s.labelArea}>
            <DragRowContainer
              form={form}
              swapPosition={swapPosition}
              dropItemFromOutside={dropItemFromOutside}
              deleteFunc={deleteFunc}
              rowIndex={2}
              data={cardListTotal[2]}
            />
          </div>
        </Form>


        <div className={s.bottomBtnArea}>
          <div className={s.btnLeft}>
            <span>
              {icons.deviceIcon}
            </span>
          </div>
          <div className={s.btnRight}>
            <Button className={s.bottomBtn} onClick={() => router.back()}>取消</Button>
            <Button
              className={s.bottomBtnSubmit}
              disabled={coverDeviceNum === 0 || coverDeviceNum === undefined}
              type="primary"
              onClick={() => getCover(true)}
              loading={confirmBtnLoading}
            >提交</Button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default NewCrowdPack;
