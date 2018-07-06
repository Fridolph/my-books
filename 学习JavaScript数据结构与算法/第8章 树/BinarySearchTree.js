// insertNode函数会帮助我们找到新节点应该插入的正确位置
var insertNode = function(node, newNode) {
  // 如果树非空，需要找到插入新节点的位置。因此在调用insertNode方法时要通过参数传入树的根节点和要插入的节点
  // 如果新节点的键小于当前节点的键
  if (newNode.key < node.key) {
    // 那么需要检查当前节点的左侧子节点，如果没有左侧子节点，就在那里插入新节点
    if (node.left === null) {
      node.left = newNode
    } else {
      // 如果有左侧子节点，需要通过递归调用insertNode方法继续找到树的下一层
      // 在这里，下次将要比较的节点将会是当前节点的左侧子节点
      insertNode(node.left, newNode)
    }
  } else {
    // 如果节点的键比当前节点的大，同时当前节点没有右侧子节点，就在那里插入新的节点
    if (node.right === null) {
      node.right = newNode
    } else {
      // 如果有右侧子节点，同样需要递归调用insertNode方法，但是要用来和新节点比较的节点将会是右侧子节点
      insertNode(node.right, newNode)
    }
  }
}

function BinarySearchTree() {
  var Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  var root = null

  // 向树中插入一个新节点 经历3步
  this.insert = function(key) {
    // 1 创建用来表示新节点的Node类实例，只需要向构造函数传递我们想用来插入树的节点值
    // 它的左指针和右指针的值会由构造函数自动设置为null
    var newNode = new Node(key)

    // 2 验证这个插入操作是否为一种特殊情况 —— 插入节点是树的第一个节点 若是，就将根节点指向新节点
    if (root === null) {
      root = newNode
    } else {
      // 3 将节点加在非根节点的其他位置，徐哟呵一个私有的辅助函数
      insertNode(root, newNode)
    }
  }
}
