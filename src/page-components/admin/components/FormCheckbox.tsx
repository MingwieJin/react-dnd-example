import React from "react";
import {Form, Checkbox, Tooltip} from "antd";
import {formProps} from "./DoubleInput";
import s from "../styles/new.module.less";
import {icons} from "@/constants";


const FormCheckbox = (props: formProps) => {
  const { name, label, rule, deleteIcon, options = [] } = props

  return (
    <div className={s.cardFormContainer}>
      <div className={s.title}>
        <div className={s.topContainer}>
          <span className={s.moveIcon}>{icons.move}</span>
          {label}
        </div>
        {deleteIcon}
      </div>

      <div className={s.doubleInputContainer}>
        <Form.Item
          className={
            s.cardFormCheckBoxItem
        }
          name={[...name]}
          required={false}
          rules={rule}
        >
          <Checkbox.Group
            options={options}
          ></Checkbox.Group>
        </Form.Item>
      </div>
    </div>
  )
}

export default FormCheckbox
