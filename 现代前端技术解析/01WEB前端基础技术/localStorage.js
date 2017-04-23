// 核心API
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.removeItem(key)
// localStorage.clear()

/**
 * localStorage只支持简单数据类型的读取，为了方便localStorage读取对象等格式的内容，通常需要进行一层安全封装再引入使用
 */
let rkey = /^[0-9A-Za-z_@-]*$/;
let store;

// 转换对象
function init() {
  if (typeof store === 'undefined') {
    store = window['localStorage'];
  }
  return true;
}

// 判断localStorage的key是否合法
function isValidKey(key) {
  if (typeof key !== 'string') {
    return false;
  }
   return rkey.test(key);
}

module.exports = {
  // 设置localStorage单条记录
  set(key, value) {
    let success = false;
    if (isValidKey(key) && init()) {
      try {
        value += '';
        store.setItem(key, value);
        success = true;
      } catch (e) {
        console.error(e);
      }
    }
  },

  // 读取localStorage单条记录
  get(key) {
    if (isValidKey(key) && init()) {
      try {
        return store.getItem(key);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  },

  // 移除localStorage单条记录
  remove(key) {
    if (isValidkey(key) && init()) {
      try {
        store.removeItem(key);
        return true;
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  },

  // 清除localStorage所有记录
  clear() {
    if (init()) {
      try {
        for (let key in store) {
          store.removeItem(key);
        }
        return true;
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  }
}