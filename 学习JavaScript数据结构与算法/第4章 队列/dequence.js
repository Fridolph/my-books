// 创建队列
class Queue {
  constructor() {
    this.items = [];
  }

  // 向队列添加元素
  enqueue(elem) {
    this.items.push(elem);
  }

  // 向队列移除元素
  dequeue() {
    return this.items.shift();
  }

  // 查看队列头元素
  front() {
    console.log(this.items[0])
    return this.items[0];  
  }

  // 检查队列是否为空
  isEmpty() {
    console.log(this.items.length === 0)
    return this.items.length === 0;
  }

  // 打印队列元素
  print() {
    console.log(this.items.valueOf());
  }
}

// 使用Queue类
let queue = new Queue();
queue.isEmpty();

queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Camila');
queue.print();