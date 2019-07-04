const formatConst = '$1-$2-$3' // 时间格式
const MINUTE = 60 * 1000 // 1分
const HOUR = MINUTE * 60 // 1小时
const DAY = HOUR * 24 // 1天
const MONTH_LIST = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

// 订单状态 订单状态（-3已退款;-2=退款中;-1=已取消;100=待支付,200=待发货 ,400=已完成）
export const OrderStatus = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '待支付',
    value: '100'
  },
  {
    label: '待发货',
    value: '200'
  },
  {
    label: '已完成',
    value: '400'
  },
  {
    label: '已取消',
    value: '-1'
  },
  {
    label: '退款中',
    value: '-2'
  },
  {
    label: '已退款',
    value: '-3'
  }
]

// 订单记录 操作记录（0=未使用;1使用中;2=已使用;-1=已失效;）
export const OrderRecord = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '未使用',
    value: '0'
  },
  {
    label: '使用中',
    value: '1'
  },
  {
    label: '已使用',
    value: '2'
  },
  {
    label: '已失效',
    value: '-1'
  }
]

// 月份
export const formatMonth = (e) => {
  if (e.constructor !== Date) {
    e = new Date(e)
  }
  if (e.toString() === 'Invalid Date') throw new Error('请传入正确的时间!')
  const m = e.getMonth()
  return MONTH_LIST[m]
}

// 时间格式化
export const format = (e, f = formatConst) => {
  if (isNull(e)) {
    return e
  }
  if (e.constructor !== Date) {
    e = new Date(e)
  }
  if (e.toString() === 'Invalid Date') throw new Error('请传入正确的时间!')
  // eslint-disable-next-line prefer-const
  let [y, m, d, hh, mm, ss] = [e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()]
  if (m < 10) m = '0' + m
  if (d < 10) d = '0' + d
  if (hh < 10) hh = '0' + hh
  if (mm < 10) mm = '0' + mm
  if (ss < 10) ss = '0' + ss
  return `${y}-${m}-${d}-${hh}-${mm}-${ss}`.replace(/(.+)-(.+)-(.+)-(.+)-(.+)-(.+)/, f)
}

// 金额格式化
export const formatCurrency = (num, float) => {
  if (typeof num === 'object' && !num) num = '0'
  if (typeof num !== 'string') num = num.toString()
  if (/[^0-9.]/.test(num)) return 'invalid value'
  num = num.replace(/^(\d*)$/, '$1.')
  num = (num + '00').replace(/(\d*\.\d\d)\d*/, '$1')
  num = num.replace('.', ',')
  var re = /(\d)(\d{3},)/
  while (re.test(num)) { num = num.replace(re, '$1,$2') }
  num = num.replace(/,(\d\d)$/, '.$1')
  num = num.replace(/^\./, '0.')
  if (float) {
    return num.substr(0, num.length - 3)
  }
  return num
}

// 消息时间格式化
export const msgFormat = (e) => {
  const nowDate = new Date()
  const targetDate = new Date(e)
  const c = nowDate - targetDate
  if (c < MINUTE) {
    return `${Math.ceil(c / 1000)}秒之前`
  } else if (c < HOUR && c >= MINUTE) {
    return `${Math.floor(c / MINUTE)}分钟之前`
  } else if (c < DAY && c >= HOUR) {
    return `${Math.floor(c / HOUR)}小时之前`
  } else if (c >= DAY) {
    return `${Math.floor(c / DAY)}天之前`
  }
}

// 性别格式化
export const genderFormat = (e) => {
  switch (e) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '未知'
  }
}

// 快速获取数组
export const getKeyArr = (value, key, targetArr) => {
  for (let j = 0; j < targetArr.length; j++) {
    const t = targetArr[j]
    if (t[key] === value) {
      return {
        index: j,
        object: t
      }
    }
  }
  return {
    index: -1
  }
}

// 快速排序
export const quicksort = (arr, key) => {
  if (arr.length <= 1) {
    return arr
  }
  const proiindex = Math.floor(arr.length / 2)
  const proift = arr.splice(proiindex, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] >= proift[key]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort(left, key).concat([proift], quicksort(right, key))
}

// 城市递归 转为 element的级联数据结构
export const recursion = (arr) => {
  const newArr = []
  for (const a of arr) {
    const o = {}
    const c = a.citylist || a.arealist
    o.value = a.name
    o.label = a.name
    if (c && c.length > 0) {
      o.children = recursion(c)
    }
    newArr.push(o)
  }
  return newArr
}

// 是否为空
export const isNull = (value) => {
  if (value === null || value === undefined || value === '') {
    return true
  }
  if (value instanceof Array && value.length === 0) {
    return true
  }
  return false
}

// sort分类的级联数组
export const quickSortArr = (list) => {
  const allObj = []
  if (!list) return
  for (const item of list) {
    const { reclation, id } = item
    item.label = item.typeName
    item.value = item.id
    let len = 0
    if (reclation.indexOf(',') > -1) {
      const r = reclation.split(',')
      len = r.length - 1
    }
    if (allObj[len]) {
      if (!allObj[len].obj[id]) {
        allObj[len].obj[id] = true
        allObj[len].arr.push(item)
      }
    } else {
      allObj[len] = {
        obj: {
          [id]: true
        },
        arr: [item]
      }
    }
  }
  const reverse = allObj.reverse()
  for (let q = 0; q < reverse.length; q++) {
    const _reverse = reverse[q]
    const _reverseArr = _reverse.arr.sort((a, b) => { return a.sort - b.sort })
    if (q === 0) continue
    for (const item of _reverseArr) {
      const id = item.id // 上级
      const pTypeArr = reverse[q - 1].arr // 下级
      for (const r of pTypeArr) {
        if (r.pType === id) {
          if (item.children) {
            item.children.push(r)
          } else {
            item.children = [r]
          }
        }
      }
    }
  }
  if (reverse[reverse.length - 1]) {
    return reverse[reverse.length - 1].arr
  }
}

export const labelSortArr = (list) => {
  if (list.length < 1) return
  list.forEach(function(item) {
    delete item.children
  })
  var map = {}
  list.forEach(function(item) {
    item.label = item.name
    item.value = item.id
    item.typeName = item.name
    map[item.id] = item
  })
  var val = []
  list.forEach(function(item) {
    var parent = map[item.parentid]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      val.push(item)
    }
  })
  return val
}

export const goodsSortArr = (list) => {
  if (list.length < 1) return
  list.forEach(function(item) {
    delete item.children
  })
  var map = {}
  list.forEach(function(item) {
    item.label = item.name
    item.value = item.id
    item.typeName = item.name
    map[item.id] = item
  })
  var val = []
  list.forEach(function(item) {
    var parent = map[item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      val.push(item)
    }
  })
  return val
}

export const returnParentId = (id, list) => {
  var obj = {}
  if (!list && list.length < 1) {
    return false
  }
  list.forEach(item => {
    obj[item.id] = item.parentid
  })
  var arr1 = []
  var search = (id) => {
    arr1.unshift(id)
    if (obj[id] === 0) {
      return arr1
    } else {
      return search(obj[id])
    }
  }
  const userId = search(id)
  return userId
}
export const returnParentid = (id, list) => {
  var obj = {}
  if (!list && list.length < 1) {
    return false
  }
  list.forEach(item => {
    obj[item.id] = item.parentId
  })
  var arr1 = []
  var search = (id) => {
    arr1.unshift(id)
    if (obj[id] === 0) {
      return arr1
    } else {
      return search(obj[id])
    }
  }
  const userId = search(id)
  return userId
}

export const returnNull = (val) => {
  if (!val) {
    return '-'
  } else {
    return val
  }
}
// 去除空格
export const trim = (e) => {
  return e.replace(/^\s+|\s+$/g, '')
}
