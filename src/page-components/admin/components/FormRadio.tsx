import React from "react";
import {Form, Radio} from "antd";
import {formProps} from "./DoubleInput";
import s from "../styles/new.module.less";
import {icons} from "@/constants";


const FormRadio = (props: formProps) => {
  const { name, label, rule, deleteIcon, options = [] } = props

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
          name={[...name]}
          // label={label}
          required={false}
          rules={rule}
          initialValue={options[0] === undefined ? undefined : options[0].value }
        >
          <Radio.Group
            options={options}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default FormRadio
