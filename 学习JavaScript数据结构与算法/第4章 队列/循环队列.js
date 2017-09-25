var md = `
  还有另一个修改版的队列实现，就是循环队列。
  循环队列的一个例子就是击鼓传花游戏。下面示例中，我们来模拟实现这样一个游戏：
`;

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

// 循环队列
function hotPotato(nameList, num) {
  let queue = new Queue();

  for (let i= 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  let eliminated = '';

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(`${eliminated}在击鼓传花游戏中被淘汰`);
  }
  return queue.dequeue();
}

let names = [
  'John',
  'Jack',
  'Camila',
  'Ingrid',
  'Carl'
];

let winner = hotPotato(names, 7);
console.log(`The winner is: ${winner}`)