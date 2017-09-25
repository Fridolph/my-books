var md = `
  优先队列，元素的添加和移除是基于优先级的。
  实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们。
  在这个示例中，我们将会在正确的位置添加元素，因此可以对它们使用默认的出列操作：
`;

function PriorityQueue() {
  let items = [];

  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let added = false;

    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      items.push(queueElement);
    }
  }

  this.print = function() {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} - ${items[i].priority}`);
    }
  }
}

var md2 = `
  默认的Queue类和PriorityQueue类实现上的区别是，要向PriorityQueue添加元素，需要创建一个特殊的元素。
  这个元素包含了要添加到队列的元素（它可以是任意类型）及其在队列中的优先级。
  如果队列为空，可以直接将元素入列。否则，就需要比较该元素与其他元素的优先级。当找到一个比要添加的元素的priority值更多（优先级更低）的项时，就把新元素插入到它之前。
  （根据这个逻辑，对于其他优先级相同，但是下你添加到队列的元素，我们同样遵循先进先出的原则）
  一旦找到priority值更大的元素，就插入新元素并终止队列循环。这样，队列也就根据优先级排序了。
`;

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('John', 2);
priorityQueue.enqueue('Jack', 1);
priorityQueue.enqueue('Jack', 2);
priorityQueue.enqueue('Camila', 1);
priorityQueue.print();

