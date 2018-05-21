var md = `
  优先队列，元素的添加和移除是基于优先级的。
  实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们。
  在这个示例中，我们将会在正确的位置添加元素，因此可以对它们使用默认的出列操作：
`;

function PriorityQueue() {
  let items = []
  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }

  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority)
    let added = false

    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement)
        added = true
        break
      }
    }
    if (!added) {
      items.push(queueElement)
    }
  }

  this.print = function() {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].priority} - ${items[i].element}`)
    }
  }
  // 其他方法和默认Queue实现相同
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

var md3 = `
  第一个被添加的元素是优先级为2的John，因此此队列为空，所以它是队列中唯一元素。接下来，添加了优先级为1的Jack。
  由于Jack优先级高于John，它就成了队列中的第一个元素。然后添加了优先级也为1的Camila. Camila的优先级和Jack相同，
  所以它会被插入到Jack之后（因为Jack先被插入队列）Camila优先级高于John，所以它会被插入到John之前。
  我们在这里实现的优先队列称为最小优先队列，因为优先级的值较小的元素被放置在队列最前面（1代表更高的优先级）。
  最大优先队列与之相反，把优先级较大的元素放置在队列最前面
`
