
import get from '@xes/dh-module-getter'
export function findValue (arr = [], findKey, findValue) {
  let isFind = false
  arr.map(item => {
    if (item[findKey] === findValue) {
      isFind = true
      return true
    }
  })
  return isFind
}

export function findArrayValue (arr = [], findKey, findValue, key) {
  return get(arr.find(item => {
    return item[findKey] === findValue
  }), key, '')
}

/**
 * changeListKey([{id: 1, name: '测试'}], ['id', 'name'], ['value', 'label'])
 * [{id: 1, name: '测试'}] ==>  [{value: 1, label: '测试'}]
 * 
 * changeListKey([{id: 1, name: '测试'}], 'id', 'value')
 * [{id: 1, name: '测试'}] ==>  [{value: 1, name: '测试'}]
 * @param {Array} list 
 * @param {Array | String} oldKey 
 * @param {Array | String} newKey 
 */
export function changeListKey (list = [], oldKey, newKey) {
  let arr = []
  list.map(item => {
    let newItem = {...item}
    if(typeof oldKey === 'string') {
      let value = newItem[oldKey]
      delete newItem[oldKey]
      arr.push({[newKey]: value, ...newItem})
    }
    if(Array.isArray(oldKey)) {
      let newObject = {}
      oldKey.forEach((key, index) => {
        let value = newItem[key]
        delete newItem[key]
        newObject[newKey[index]] = value
      })
      arr.push({...newObject, ...newItem})
    }
  })
  return arr
}
/**
 * addListValue(columns, 'prop', 'id', {'slotName': 'id'})   ==> [{'prop': 'id', {'slotName': 'id'}}]
 * addListValue(columns, [{'prop': 'id'}], [{'slotName': 'id'}])   ==> [{'prop': 'id', {'slotName': 'id'}}]
 * @param {Array} list 
 * @param {String|Array} targetKey 
 * @param {String|Array} targetValue 
 * @param {Object|*} params 
 */
export function addListValue (list = [], targetKey, targetValue, params) {
  let arr = []
  list.map(item => {
    if(typeof targetKey === 'string') {
      if (item[targetKey] === targetValue) {
        item = {...item, ...params}
      }
    }
    if(Array.isArray(targetKey)) {
      targetKey.forEach(obj => {
        let isEqual = ''
        for(let key in obj) {
          if(item[key] === obj[key])
          isEqual = isEqual && (item[key] === obj[key])
        }
        if(isEqual) {
          item = {...item, ...targetValue}
        }
      })
    }
    arr.push(item)
  })
  return arr
}
/**
 * 判断两个数组是否相等
 * scalarArrayEquals([1, 2], [1, 2])
 */
export function scalarArrayEquals(array1, array2) {
  return array1.length == array2.length && array1.every(function(v,i) { return v === array2[i]});
}

export const createScript = (src) => {
  return new Promise((resolve) => {
    let script = document.createElement('script');
    script.src = src;
    if (script.readyState) { // IE
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else { // 其他浏览器
      script.onload = function () {
        resolve();
      };
    }
    document.body.insertBefore(script, document.getElementById('app'));
  });
};
// 获取Dahai-Access-Token
export const uploadHeaders = {
  'Dahai-Access-Token': JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).access_token
    : '',
  'Dahai-Product-Line': 'management-platform'
};
/**
 * @desc date range options
 * @return {object}
 */
export const dateRangeShortcutOptions = () => {
  const date = new Date()
  const getStartOfDay = day => Math.floor(day.setHours(0) / 3600000) * 3600000
  const getEndOfDay = day => Math.ceil(day.setHours(23) / 3600000) * 3600000 - 24 * 3600000 - 1
  const dayStartRange = day => getStartOfDay(new Date(date.getTime() - 3600000 * 24 * day))

  return {
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', [getStartOfDay(date), Math.ceil(date.setHours(23) / 3600000) * 3600000 - 1])
      }
    }, {
      text: '昨天',
      onClick(picker) {
        picker.$emit('pick', [dayStartRange(1), getEndOfDay(date)])
      }
    }, {
      text: '过去7天',
      onClick(picker) {
        picker.$emit('pick', [dayStartRange(7), getEndOfDay(date)])
      }
    }, {
      text: '过去14天',
      onClick(picker) {
        picker.$emit('pick', [dayStartRange(14), getEndOfDay(date)])
      }
    }, {
      text: '过去30天',
      onClick(picker) {
        picker.$emit('pick', [dayStartRange(30), getEndOfDay(date)])
      }
    }]
  }
}

export function isK12 () {
  return sessionStorage.getItem('sourceLink') === 'boss'
}

export function isVipx () {
  return sessionStorage.getItem('sourceLink') === 'vipx'
}

