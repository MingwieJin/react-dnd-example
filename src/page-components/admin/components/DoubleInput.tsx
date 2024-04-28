import {Form, FormInstance, Input} from "antd";
import React, {useState} from "react";
import s from '../styles/new.module.less'
import {icons} from "@/constants";

export interface formProps {
  name: string[];
  label: string;
  rule?: any[];
  deleteIcon: JSX.Element;
  options?: any[];
  form: FormInstance<any>;
}

const DoubleInput = (props: formProps) => {
  const { name, label, rule, deleteIcon, form } = props

  const checkValidLeft = async (_: any, value: string) => {
    if (!value) return Promise.reject('请输入');
    const reg = new RegExp(  /^[1-9]\d*$/);
    if (!reg.test(value)) return Promise.reject('输入格式错误');
    if (Number(value) > 99) return Promise.reject('不能大于99');
    return Promise.resolve();
  };

  const checkValidRight = async (_: any, value: string) => {
    if (!value) return Promise.reject('请输入');
    const reg = new RegExp(  /^[1-9]\d*$/);
    if (!reg.test(value)) return Promise.reject('输入格式错误');

    const formData = form.getFieldsValue()
    const leftNumber = formData?.[`${name[0]}`]?.[name[1]]?.[0]
    if (leftNumber && Number(value) < leftNumber ) return Promise.reject('输入范围错误');
    if (Number(value) > 99) return Promise.reject('不能大于99');
    return Promise.resolve();
  };

  return (
    <div className={s.cardFormContainer}>
      <div className={s.title}>
        <div>
          <span className={s.moveIcon}>{icons.move}</span>
          {label}
        </div>
        {deleteIcon}
      </div>

      <div className={s.doubleInputContainer}>
        <Form.Item
          className={s.cardFormItem}
          style={{marginBottom: 0}}
          name={[...name, 0]}
          required={false}
          rules={[{ validator: checkValidLeft }]}
          validateTrigger='onBlur'
        >
          <Input placeholder='请输入' />
        </Form.Item>

        <div style={{color: '#D9D9D9', margin: '0 4px', lineHeight: '32px'}}>-</div>


        <Form.Item
          className={s.cardFormItem}
          style={{marginBottom: 0}}
          name={[...name, 1]}
          required={false}
          rules={[{ validator: checkValidRight }]}
          validateTrigger='onBlur'
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </div>
    </div>
  )
}

export default DoubleInput
