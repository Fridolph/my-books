function Set() {
  // 我们使用对象而不是数组来表示集合。JS对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的。
  let items = {}

  this.has = function(value) {
    // return value in items
    return items.hasOwnProperty(value)
  }

  this.add = function(value) {
    if (!this.has(value)) {
      items[value] = value
      return true
    }
    return false
  }

  this.remove = function(value) {
    if (this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.clear = function() {
    items = {}
  }

  // this.sizeLegacy = function() {
  //   let count = 0
  //   for (let key in items) {
  //     if (items.hasOwnProperty(key))
  //     ++count
  //   }
  //   return count
  // }

  this.size = function() {
    return Object.keys(items).length
  }

  this.values = function() {
    let values = []
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]])
    }
    return values
  }

  // 集合操作 - 并集
  this.union = function(otherSet) {
    let unionSet = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    values = otherSet.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    return unionSet
  }
  // 交集
  this.intersection = function(otherSet) {
    let intersection = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }
    return intersectionSet
  }

  // 差集
  this.difference = function(otherSet) {
    let differenceSet = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i])
      }
    }
    return differenceSet
  }

  // 子集
  this.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    } else {
      let values = this.values()
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false
        }
      }
      return true
    }
  }
}

// 使用Set类
let set = new Set()
set.add(1)
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
set.add(2)
console.log(set.values());
console.log(set.has(2));
console.log(set.size());
