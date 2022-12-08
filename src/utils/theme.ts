import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import elementPackage from 'element-plus/package.json'
import axios from 'axios'

/**
 * 写入新的样式到 style
 * @param elNewStyle 新的样式表
 */
export const writeNewStyle = (elNewStyle: string) => {
  // 删除 @font-face 样式，删除原因：不去覆盖编译后的 @font-face
  // 解决错误：GET http://localhost:8080/fonts/element-icons.ttf net::ERR_ABORTED 404 (Not Found)
  // 解决错误：GET http://localhost:8080/fonts/element-icons.woff net::ERR_ABORTED 404 (Not Found)
  elNewStyle = deleteFontface(elNewStyle)
  // 创建 style 标签
  const style = document.createElement('style')
  // style 标签中写入新的样式
  style.innerHTML = elNewStyle
  // 把style标签插入到head中，样式自动覆盖
  document.head.appendChild(style)
}

/**
 * 根据主题色，生成新的样式表
 * @param primaryColor 主题色
 */
export const generateNewStyle = async (primaryColor: string) => {
  // 1.生成标记替换模版
  const colors = generateColors(primaryColor)
  // 2.获取 element-plus 的全部样式，并且把需要替换的样式打上标记
  let cssText = await getOriginalStyle()
  // 3.根据标记替换模版替换打过标记的样式，得到最终的样式表
  Object.keys(colors).forEach((key: string) => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })
  return cssText
}

// 根据主题色生成替换配方
export const generateColors = (primary: string) => {
  if (!primary) { return }
  // 替换模版
  // colors：key 为替换标记，value 为要替换成的样式
  const colors: any = {
    primary
  }
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

// 获取当前 element-plus 的默认样式表
const getOriginalStyle = async () => {
  // 获取项目的 element-plus 的版本
  const version = elementPackage.version
  // element-plus 的全部样式链接
  const url = `https://unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`
  // 请求样式
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

// 返回 style 的 template
const getStyleTemplate = (data: string) => {
  // element-plus 的默认主题色
  // colorMap：key为要替换的原样式，value为标记
  const colorMap: any = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  // 将 element-plus 的原样式中要替换的样式打上标记
  Object.keys(colorMap).forEach((key: string) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  return data
}

// 删除 @font-face 样式
const deleteFontface = (style: string): string => {
  const index1 = style.indexOf('@font-face')
  const index2 = style.indexOf('}', index1)
  const deleteStr = style.substring(index1, index2 + 1)
  style = style.replace(deleteStr, '')
  if (style.indexOf('@font-face') !== -1) {
    style = deleteFontface(style)
  }
  return style
}
