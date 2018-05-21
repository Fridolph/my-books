var str = `
  链表有多种不同类型。在链表中，一个节点只有链向下一个节点的链接。而在双向链表中，链接是双向的，一个链向下一个元素，另一个链向前一个元素
`

function DoublyLinkedList() {
  let Node = function(element) {
    this.element = element
    this.next = null
    this.prev = null // 新增
  }
  let length = 0
  let head = null
  let tail = null // 新增

  this.insert = function(position, element) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      let node = new Node(element)
      let current = head
      let previous
      let index = 0
      // 在第一个位置添加
      if (position === 0) {
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else if (position === length) {
        current = tail
        current.next = node
        node.prev = current
        tail = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
      }
      length++
      return true
    } else {
      return false
    }
  }
}
