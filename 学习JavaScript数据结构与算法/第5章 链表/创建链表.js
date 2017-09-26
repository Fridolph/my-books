/**
 * LinkedList链表 数据结构 
 */
function LinkedList() {
  // 其需要一个Node辅助类，Node类表示要加入链表的项
  // 它包含一个element属性，即要添加到链表的值，以及一个next属性，即指向链表中下一个节点项的指针
  let Node = function(element) {
    this.element = element;
    this.next = null;
  }
  // LinkedList类也有存储链表项的数量length属性
  let length = 0;
  // 我们还需要存储第一个节点的引用 head
  let head = null;

  // 向链表尾部添加一个新的项
  this.append = function(element) {
    let node = new Node(element),
        current;

    // 链表中第一个节点
    if (head === null) {
      head = node;
    } else {
      current = node;

      // 循环链表，直到找到最后一项
      while (current.next) {
        current = current.next;
      }

      // 找到最后一项，将其next赋为node, 建立链接
      current.next = node;
    }
    // 更新链表的长度
    length++;
  }

  // 向链表的特定位置插入一个新的项
  this.insert = function(position, element) {}

  // 从链表的特定位置移除一项
  this.removeAt = function(position) {
    // 1检查越界值
    if (position > -1 && position < length) {
      let current = head, // 2
          previous,  // 3
          index = 0; // 4
      
      // 5移除第一项 
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) { // 6
          previous = current; // 7
          current = current.next; // 8
        }
        // 9 将previous与current的下一项链接起来： 跳过current，从而移除它
        previous.next = current.next;
      }
      length--; // 10

      return current.element;
    } else {
      return null; // 11
    }
  }

  // 从链表中移除一项
  this.remove = function(element) {}

  // 返回元素在链表的索引，若没有则返回-1
  this.indexOf = function(element) {}

  // 若链表中不包含任何元素返回true，反之false
  this.isEmpty = function() {}

  // 返回链表包含的元素个数
  this.size = function() {}
  this.getHead = function() {}
  this.toString = function() {}
  this.print = function() {}
}
