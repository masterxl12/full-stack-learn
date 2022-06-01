export function isFunction(obj) {
  return typeof obj === 'function'
}

export function updateDOM(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue
    }
    if (key === 'style') {
      let style = newProps[key]
      for (let attr in style) {
        dom.style[attr] = style[attr]
      }
    } else if (key.startsWith('on')) {
      dom[key.toLocaleLowerCase()] = newProps[key]
    } else {
      dom[key] = newProps[key]
    }
  }
}

export function setProps(dom, oldProps, newProps) {
  for (let key in oldProps) {
    if (key !== 'children') {
      if (Reflect.has(newProps, key)) {
        // 新老都有 则更新
        setProp(dom, key, newProps[key])
      } else {
        // 老的有 新的没有 则删除该属性
        // 删除在oldProps有，但newProps中没有的属性
        dom.removeAttribute(key)
      }
    }
  }
  for (let key in newProps) {
    if (key !== 'children') {
      // 老的没有 新的有 则新增属性
      if (!Reflect.has(oldProps, key)) {
        setProp(dom, key, newProps[key])
      }
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value
  } else if (key === 'style') {
    if (value) {
      for (let styleName in value) {
        dom.style[styleName] = value[styleName]
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}
