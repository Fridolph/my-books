// 创建队列
let Queue = (function() {
  const items = new WeakMap();
  class Queue {
    constructor() {
      items.set(this, []);
    }
  
    // 向队列添加元素
    enqueue(elem) {
      items.push(elem);
    }
  
    // 向队列移除元素
    dequeue() {
      return items.shift();
    }
  
    // 查看队列头元素
    front() {
      console.log(items[0])
      return items[0];  
    }
  
    // 检查队列是否为空
    isEmpty() {
      console.log(`是否为空：${items.length === 0}`)
      return items.length === 0;
    }
  
    size() {
      console.log(`队列长度为：${items.length}`);
      return items.length;
    }
  
    // 打印队列元素
    print() {
      console.log(items.valueOf());
    }
  }
})();

// 使用Queue类
let queue = new Queue();
queue.isEmpty();

queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Camila');
queue.print();