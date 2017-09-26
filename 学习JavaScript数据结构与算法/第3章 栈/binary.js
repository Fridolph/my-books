// 声明类
class Stack {
  constructor() {
    this.items = [];
  }
  // 向栈添加元素
  push(element) {
    this.items.push(element);
  }

  // 从栈移除元素
  pop() {
    return this.items.pop();
  }

  // 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }

  // 检查栈是否为空
  isEmpty() {
    console.log(`当前栈是否为空：${this.items.length === 0}`)
  }

  // 清空栈元素
  clear() {
    this.items = [];
  }

  size() {
    console.log(`当前栈的元素有${this.items.length}个`)
  }

  // 打印栈元素
  print() {
    console.log(this.items.toString())
  }
}

function divideBy2(decNumber) {
  var remStack = new Stack(),
    rem,
    binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(divideBy2(233))