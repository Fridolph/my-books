function LinkedList() {
  let Node = function(element) {
    this.element = element
    this.next = null
  }
  let length = 0
  let head = null

  // 向列表尾部添加一个新的项
  this.append = function(element) {
    let node = new Node(element)
    let current

    // 列表中第一个节点
    if (head === null) {
      head = node
    } else {
      current = node
      // 循环列表，直到找到最后一项
      while (current.next) {
        current = current.next
      }
      // 找到最后一项，将其next赋为node，建立连接
      current.next = node
    }
    // 更新列表长度
    length++
  }

  // 向列表的特定位置插入一个新的项
  this.insert = function(position, element) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      let node = new Node(element)
      let current = head
      let previous
      let index = 0
      // 在第一个位置添加
      if (position === 0) {
        node.next = current
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      // 更新列表长度
      length++
      return true
    } else {
      return false
    }
  }

  // 从列表的特定位置移除一项
  this.removeAt = function(position) {
    // 检查越界值
    if (position > -1 && position < length) {
      let current = head
      let previous
      let index = 0
      // 移除第一项
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        // 将previous与current的下一项连接起来；跳过current，从而移除它
        previous.next = current.next
      }
      length--
      return current.element
    } else {
      return null
    }
  }

  // 从列表中移除一项
  this.remove = function(element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 返回元素在列表中的索引，若列表中没有该元素则返回-1
  this.indexOf = function(element) {
    let current = head
    let index = -1
    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  this.isEmpty = function() {
    return length === 0
  }

  // 返回链表包含的元素个数，与数组的length属性类似
  this.size = function() {
    return length
  }

  this.getHead = function() {
    return head
  }

  // 由于列表项使用了Node类，就需要重写继承自JS默认的toString方法，让其只输出元素值
  this.toString = function() {
    // 首先要访问列表中的所有元素，就需要有一个起点，也就是head。我们会把current变量当作索引，控制循环访问列表
    // 我们还需要初始化用于拼接元素值的变量，接下来就是循环访问列表中的每个元素
    // 我们要用current来检查元素是否存在，然后得到元素内容进行拼接
    // 最后迭代下一个元素，最终返回列表内容的字符串
    let current = head
    let string = ''
    while (current) {
      string += current.element + (current.next ? 'n' : '')
      current = current.next
    }
    return string
  }

  this.print = function() {}
}

var md1 = `
  LinkedList数据结构还需要一个Node辅助类。Node类表示要加入列表的项，它包含一个element属性，即要添加到列表的值，以及一个next属性，即指向列表中下一个节点项的指针。

  LinkedList类也有存储列表项的数组的length属性（是一个私有变量）
  另一个重要点是，我们还需要存储第一个节点的引用。为此，可以把这个引用存储在称为head的变量中

  然后就是LinkedList类的方法
`
