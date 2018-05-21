## 分离链接

分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突最简单的方法，但是它在HashTable实例之前还需要额外的存储空间

```js
function HashTable() {
  let table = []

  this.put = function(key, value) {
    let position = loseloseHashCode(key)
    // console.log(position + '-' + key)
    // table[position] = value
    if (table[position] == undefined) {
      table[position] = new LinkedList()
    }
    table[position].append(new ValuePair(key, value))
  }

  this.remove = function(key) {
    let position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      let current = table[position].getHead()
      while (current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element)
          if (table[position].isEmpty()) {
            table[position] = undefined
          }
          return true
        }
        current = current.next
      }
      // 检查是否为第一个或最后一个元素
      if (table.element.key === key) {
        table[position].remove(current.element)
        if (table[position].isEmpty()) {
          table[position] = undefined
        }
        return true
      }
    }
    return false
  }

  this.get = function(key) {
    let position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      // 遍历链表来寻找键/值
      let current = table[position].getHead()
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
      // 检查元素在链表第一个或最后一个节点的情况
      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  this.print = function() {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i])
      }
    }
  }

  let ValuePair = function(key, value) {
    this.key = key
    this.value = value
    this.toString = function() {
      return `[${this.key} - ${this.value}]`
    }
  }

  // 在实现上面3方法前，要实现第一个方法是散列函数，它是HashTable类中的一个私有方法
  let loseloseHashCode = function(key) {
    // 给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字
    // 所以首先需要一个变量来存储这个总和，然后遍历并将从ASCII表中查到的每个字符
    // 对应的ASCII值加到hash变量中，最后返回hash值，为了得到较小数值，用 % 余数
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
}
```
