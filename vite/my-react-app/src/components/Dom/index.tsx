import React, { useEffect, useRef } from 'react'
import styles from './styles.module.less'
import { _Omit } from '../../ts'

const DomIndex = () => {
  const childRef = useRef<any>()

  interface Todo {
    title: string
    description: string
    completed: boolean
    createdAt: number
  }
  type TodoPreview = _Omit<Todo, 'description'>
  const a: TodoPreview = {
    title: 'Clean room',
    completed: false,
    createdAt: 1615544252770,
  }
  console.log(a, '***^^^')

  useEffect(() => {
    const dom = document.querySelector('#child')
    console.log('🚀 ~ file: index.tsx ~ line 9 ~ useEffect ~ dom', (dom as HTMLElement).offsetParent)
    const { height, width, top, left } = childRef.current?.getBoundingClientRect() // 相对于视口区域，而不是绝对的
    console.log('🚀 ~ file: index.tsx ~ line 9 ~ useEffect ~ height, width', height, width, top, left)
    // offsetWidth/offsetHeight 是指一个元素的 CSS 「标准宽高」，它包含了边框、内边距、元素内容以及滚动条（如果存在的话)
    // offsetHeight || offsetWidth = 通过 CSS height + CSS padding + CSS content + 水平滚动条（如果存在且渲染的话）
    console.log('小鸡鸡。。。', childRef.current?.offsetHeight, childRef.current?.offsetWidth)
    // clientWidth/clientHeight 返回当前节点的可视宽度和高度（不包括边框border、边距margin）（包括内边距padding），包含元素内容以及内边距
    // clientHeight = 通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算
    console.log('小鸭鸭。。。', childRef.current?.clientHeight, childRef.current?.clientWidth)

    // scrollWidth/scrollHeight 没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同
    // 有垂直滚动条情况下：clientHeight + 滚动条高度
    console.log('小猫猫。。。', childRef.current?.scrollHeight, childRef.current?.scrollWidth)

    // offsetTop/offsetLeft -> offsetTop就是是相对于其offsetParent元素的顶部内边距的距离
    // 父元素的指定： 1. 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素,
    //              2. 如果没有父元素那么参照点就是body )为参照物，
    // 也即看其父元素是否指定了position的值。如果父元素没有设置position属性，就会一层层往上找，直到找到已定位的父元素或者table,td,th,body元素
    // 当前元素相对于父元素（offsetParent -> ）上边的偏移量。如果没有父元素那么参照点就是body（和有没有滚动条没有关系）
    console.log('小嘿嘿1。。。', childRef.current?.offsetTop, childRef.current?.offsetLeft)
    console.log('小嘿嘿2。。。', (dom as HTMLElement)?.offsetTop, (dom as HTMLElement)?.offsetLeft)
    childRef.current.addEventListener('scroll', () => {
      // console.log('小鸭鸭~。。。', childRef.current?.clientHeight, childRef.current?.clientWidth)
      // console.log('小猫猫~。。。', childRef.current?.scrollHeight, childRef.current?.scrollWidth)
      // console.log('****~。。。', childRef.current?.scrollTop, childRef.current?.scrollLeft)
      // scrollTop 滚动条向下滚动的距离（元素顶部被遮住部分的高度）
      // 判断滚动到底部
      console.log(
        childRef.current.scrollTop,
        '((((()))))',
        childRef.current.clientHeight,
        '***',
        childRef.current.scrollHeight,
      )
      if (childRef.current.scrollTop + childRef.current.clientHeight >= childRef.current.scrollHeight) {
        console.log('滚动到底部...')
      }
    })
  }, [])

  const bdList = [
    { name: '苹果', id: '403' },
    { name: '工一', id: '15011' },
    { name: '棕熊', id: '15020' },
    { name: '火山', id: '748' },
    { name: '维子', id: '14935' },
    { name: '左慈', id: '13919' },
    { name: '里昂', id: '10704' },
    { name: '墨萧', id: '10571' },
    { name: '小果', id: '10758' },
    { name: '非烟', id: '10808' },
    { name: '怡宝', id: '11911' },
    { name: '火星', id: '14745' },
    { name: '荣轩', id: '12261' },
    { name: '斯凯', id: '14930' },
    { name: '星言', id: '12796' },
    { name: '紫苏', id: '402' },
    { name: '鼓手', id: '696' },
    { name: '骑士', id: '10665' },
    { name: '三月', id: '10775' },
    { name: '小猪', id: '11436' },
    { name: '坦克', id: '15017' },
    { name: '沉凡', id: '14102' },
    { name: '宏图', id: '14147' },
    { name: '晚荣', id: '14197' },
  ]
  let commonStr = 'https://api.hunliji.com/hms/betaService/bds?'
  let bdCode = bdList.map((item) => `${commonStr}id=${item.id}&name=${item.name}`)
  console.log('🚀 ~ file: index.tsx ~ line 69 ~ DomIndex ~ bdCode', bdCode)

  let data = [
    {
      id: 110000,
      areaName: '北京',
      parentId: 0,
      shortName: '北京',
      level: 1,
      cid: -1,
      coreArea: 1,
      bindingCities: -1,
      childrenShop: [
        {
          id: 110100,
          areaName: '北京市',
          parentId: 110000,
          shortName: '北京',
          shortPy: 'bj',
          pinyin: 'beijing',
          level: 2,
          cid: 1,
          kind: 'A',
          coreArea: 0,
          bindingCities: 1,
          cityLine: 1,
          childrenShop: [
            {
              id: 110101,
              areaName: '东城区',
              parentId: 110100,
              shortName: '东城',
              pinyin: 'dongcheng',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1229,
            },
            {
              id: 110102,
              areaName: '西城区',
              parentId: 110100,
              shortName: '西城',
              pinyin: 'xicheng',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1230,
            },
            {
              id: 110105,
              areaName: '朝阳区',
              parentId: 110100,
              shortName: '朝阳',
              pinyin: 'chaoyangqu',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1231,
            },
            {
              id: 110106,
              areaName: '丰台区',
              parentId: 110100,
              shortName: '丰台',
              pinyin: 'fengtaiqu',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1232,
            },
            {
              id: 110107,
              areaName: '石景山区',
              parentId: 110100,
              shortName: '石景山',
              pinyin: 'shijingshan',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1233,
            },
            {
              id: 110108,
              areaName: '海淀区',
              parentId: 110100,
              shortName: '海淀',
              pinyin: 'haidian',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1234,
            },
            {
              id: 110109,
              areaName: '门头沟区',
              parentId: 110100,
              shortName: '门头沟',
              pinyin: 'mentougou',
              level: 3,
              cid: -1,
              kind: 'F',
              coreArea: 1,
              bindingCities: 1235,
            },
            {
              id: 110111,
              areaName: '房山区',
              parentId: 110100,
              shortName: '房山',
              pinyin: 'fangshan',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1236,
            },
            {
              id: 110112,
              areaName: '通州区',
              parentId: 110100,
              shortName: '通州',
              pinyin: 'tongzhou',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1237,
            },
            {
              id: 110113,
              areaName: '顺义区',
              parentId: 110100,
              shortName: '顺义',
              pinyin: 'shunyi',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1238,
            },
            {
              id: 110114,
              areaName: '昌平区',
              parentId: 110100,
              shortName: '昌平',
              pinyin: 'changping',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1239,
            },
            {
              id: 110115,
              areaName: '大兴区',
              parentId: 110100,
              shortName: '大兴',
              pinyin: 'daxing',
              level: 3,
              cid: -1,
              kind: 'A',
              coreArea: 1,
              bindingCities: 1240,
            },
            {
              id: 110116,
              areaName: '怀柔区',
              parentId: 110100,
              shortName: '怀柔',
              pinyin: 'huairou',
              level: 3,
              cid: 1241,
              kind: 'F',
              coreArea: 0,
              bindingCities: 1241,
              cityLine: 1,
            },
            {
              id: 110117,
              areaName: '平谷区',
              parentId: 110100,
              shortName: '平谷',
              pinyin: 'pinggu',
              level: 3,
              cid: 1242,
              kind: 'F',
              coreArea: 0,
              bindingCities: 1242,
              cityLine: 1,
            },
            {
              id: 110228,
              areaName: '密云区',
              parentId: 110100,
              shortName: '密云',
              pinyin: 'miyun',
              level: 3,
              cid: -1,
              kind: 'F',
              coreArea: 1,
              bindingCities: 1243,
            },
            {
              id: 110229,
              areaName: '延庆区',
              parentId: 110100,
              shortName: '延庆',
              pinyin: 'yanqing',
              level: 3,
              cid: 1244,
              kind: 'F',
              coreArea: 0,
              bindingCities: 1244,
              cityLine: 1,
            },
          ],
        },
      ],
    },
  ]

  const listMap = []

  const _data = data?.map((e: any) => {
    listMap.push({
      label: e?.areaName,
      value: e?.id,
    })

    return {
      label: e?.areaName,
      value: e?.id,
      children: e?.childrenShop?.map((x: any) => {
        listMap.push({
          label: x?.areaName,
          value: x?.cid,
        })

        return {
          label: x?.areaName,
          value: x?.cid,
          children: x?.childrenShop
            ?.filter((k: any) => k?.cid > 0)
            ?.map((j: any) => {
              listMap.push({
                label: j?.areaName,
                value: j?.cid,
              })

              return {
                label: j?.areaName,
                value: j?.cid,
              }
            }),
        }
      }),
    }
  })
  // console.log(_data)

  return (
    <>
      <table className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.child} id="child" ref={childRef}>
            {['内容一', '内容二', '内容三'].map((item, idx) => (
              <div
                style={{ background: `rgba(0,255,100,${Math.random().toFixed(2)})`, height: 150, width: 150 }}
                key={idx}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </table>
    </>
  )
}

export default DomIndex
