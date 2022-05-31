import React, { ReactElement, InputHTMLAttributes, FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
  disabled?: boolean;
  size?: InputSize;
  suffix?: string | ReactElement;
  prefix?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: IconProp;
}

export const ControlledInput = () => {
  const [value, setValue] = useState<string>('')
  return <Input value={value} defaultValue={value} onChange={(e) => setValue(e.target.value)} />
}

export const Input: FC<InputProps> = (props) => {
  // 取出各种属性
  const { disabled, size, suffix, prefix, icon, style, ...restProps } = props

  // 根据属性计算不同的 className
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prefix || suffix,
    'input-group-prefix': !!prefix,
    'input-group-suffix': !!suffix,
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === undefined || value === null) {
      return ""
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props?.value)
  }

  // 根据属性判断是否要添加特定的节点
  return (
    <div className={classes} style={style}>
      {prefix && <div className="input-group-prefix">{prefix}</div>}
      {icon && <div className="icon-wrapper"><Icon title={`title-${icon}`} icon={icon} /></div>}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {suffix && <div className="input-group-suffix">{suffix}</div>}
    </div>
  )
}