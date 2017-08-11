
> Promise可以实现其他语言类似Future和Deferred一样的功能，是另一种异步编程的选择。它既可以像事件和回调函数一样指定稍后执行的代码，也可以明确指示代码是否成功执行。本文重在讨论Promise是如何运转的，所以实践和代码依然是我们的重点，要完全理解其原理，了解构建Promise的一些基本概念尤为重要。

<!-- more -->

## 异步编程相关知识点

我们知道的JS是单线程，具体来说：JavaScritp引擎同一时刻只允许执行一个代码块。那么就需要跟踪即将运行的代码块，那些代码块将被添加到任务队列。每当JavaScript引擎中的一段代码结束执行，事件循环会执行队列中的下一个任务，它（事件循环）是JS引擎中的一段程序，负责监控代码执行并管理任务队列。

### 事件模型

我们先来看一段代码

```js
let btn = document.querySelector('#btn');
btn.onclick = e => {
  console.log('clicked!');
}
```
单击btn会打印出 clicked 来，这个过程是先赋值给onclick的函数被添加到任务队列中，只有前面的任务都完成后它才会被执行

### 回调模式

回调模式与事件模型类似，异步代码都会在未来的某个时间点执行，二者区别是回调函数中被调用的函数是作为参数传入的，示例如下：

```js
readFile('example.txt', function(err, contents) {
  if (err) throw err;
  console.log(contents);
})
console.log('hi');
```

readFile执行，但当去读取文件时就会暂停，转而执行后面的程序，打印出了hi，当readFile()结束执行时，会向任务队列的末尾添加一个新任务，该任务包含回调函数及相应的参数，当队列前面所有的任务完成才执行该任务，并最终执行`console.log(contents)`

现在来看还是很方便的，但如果执行的回调任务多了…… 那么头皮发麻是一定的…… 所以 -> 才有了后面的Promise ~ 只有生成器、Async啥的放后面来说了，扎扎实实打基础先。

## Promise基础

Promise相当于异步操作结果的占位符，它既不订阅也不传回调，而是让函数返回一个Promise
```js
// readFile承诺将在未来的某个时刻完成
let promise = readFile('exm.txt');
```
这段代码，readFile()并不会立即开始读取文件，函数会先返回一个表示异步读取操作的Promise对象，未来对这个对象的操作完全取决于Promise的生命周期。

### Promise的生命周期

* Fulfilled Promise异步操作成功完成
* Rejected  Promise异步操作未能成功完成

内部属性[[PromiseState]]被用来表示Promise的三种状态：`pending`、`fulfilled`及`rejected`。只有当Promise的状态改变时，通过then()方法来采取特定的行动。
Promise具有then方法，它接受两个参数，第一个是当Promise状态转变为fulfilled时要调用的函数；第二个是当Promise状态变为rejected时要调用的函数。

> 如果一个对象实现了上述的then()方法，那这个对象我们称之为thenable对象。所有的Promise都是thenable对象

每次调用then或catch方法都会创建一个新任务，当Promise被resolved时执行，这些任务最终会被加入到一个为Promise量身定制的队列中

### 创建未完成的Promise

```js
// Node.js示例
let fs = require('fs');
function readFile(filename) {
  return new Promise((resolve, reject) => {
    // 触发异步操作
    fs.readFile(filename, {encoding: 'utf8'}, (err, contents) => {
      // 检查是否有错
      if (err) {
        reject(err);
        return;
      }
      // 成功读取文件
      resolve(contents);
    })
  })
}
let promise = readFile('example.txt');
// 同时监听执行完成和执行被拒
promise.then(contents => {
  // 完成
  console.log(contents);
}).catch(err => {
  // 拒绝
  console.log(err.message);
})
```

## 全局的Promise拒绝处理

有关Promise的其中一个最具争议的问题是，如果没有拒绝处理程序的情况下拒绝一个Promise，那么不会提示失败信息。

```js
let rejected = Promise.reject(42);
// 此rejected还没有被处理
rejected.catch(value => {
  // 现在rejected已经被处理了
  console.log(value)
})
```

### 我们来看看在Node.js环境下的拒绝处理

* unhandledRejection 在一个`事件循环中`，当Promise被拒绝，并且没有提供拒绝处理程序时被调用
* rejectionHandled 在一个`事件循环后`，当Promise被拒绝，并且没有提供拒绝处理程序时被调用

我们还是来看一下实际代码：

```js
let rejected;
process.on('unhandledRejection', (reason, promise) => {
  console.log(reason.message); // 'explosion'
  console.log(rejected === promise); // true
})
rejected = Promise.reject(new Error('Explosion'));
```

以上代码创建了一个已拒绝的Promise和一个错误对象，并监听了unhandledRejection事件，事件处理程序分别接受错误对象和Promise作为它的两个参数。
rejectionHandled事件处理程序只有一个参数——被拒绝的Promise：

```js
let rejected;
process.on('rejectionHandled', promise => {
  console.log(rejected === promise); // true  
});
rejected = Promise.reject(new Error('Explosion'));
// 等待添加拒绝错误处理
setTimeout(() => {
  rejected.catch(value => {
    console.log(value.message);  // 'Explosion'
  })
}, 1000)
```

这里的rejectionHandled事件在拒绝处理程序最后被调用时触发，如果在创建rejected之后直接添加拒绝处理程序，那么rejectionHandled事件不会被触发，因为rejected创建的过程与拒绝处理程序的调用在同一个事件循环中，此时rejectionHandled事件尚未生效。

### 浏览器环境的拒绝处理

浏览器也是通过触发两个事件来识别未处理的拒绝的，虽然这些事件是在window对象上触发的，但实际上与Node.js中的完全等效

* unhandledrejection 同上Node.js
* rejectionhandled 同上Node.js

在Node.js的实现中，事件处理程序接受多个独立参数，而在浏览器中，事件处理程序接受一个有以下属性的事件对象作为参数：

* type 事件名称（'unhandledrejection'或'rejectionhandled'）
* promise 被拒绝的Promise对象
* reason 来自Promise的拒绝值

浏览器实现中固定另一处不同是，在两个事件中都可以使用拒绝值reason，例如：

```js
let rejected;
window.onhandledrejection = function(event) {
  console.log(event.type); // 'unhandledrejection'
  console.log(event.reason.message); // 'Explosion'
  console.log(rejected === event.promise); // true
};
window.onrejectionhandled = function(event) {
  console.log(event.type); // 'rejectionhandled'
  console.log(event.reason.message); // 'Explosion'
  console.log(rejected === event.promise); // true
}
rejected = Promise.reject(new Error('Explosion'));
```

以上Node.js环境与浏览器环境中的处理差不多，区别在于，事件处理程序中检索信息的位置不同。

## 串联Promise

每次调用then或catch方法时实际上创建并返回了另一个Promise，只有当第一个Promise完成或被拒绝后，第二个才会被解决，示例如下：

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
})
p1.then(value => console.log(value))
  .then(() => console.log('Finished'))
// 42
// Finished
```

调用p1.then后返回第二个Promise，然后又调用then，只有当第一个Promise被解决后才会调用第二个then的完成处理程序，如果将拆开，可写成如下：

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
});
let p2 = p1.then(value => console.log(value));
p2.then(() => console.log('Finished'));
```

在这个非串联版本的代码中，调用p1.then()的结果被存储在了p2中，然后p2.then()被调用来添加最终的完成处理程序。

### 捕捉错误

在之前的示例中，完成处理程序或拒绝处理程序中可能发生错误，而Promise链可以用来捕获这些错误

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
});
p1.then(value => throw new Error('Boom'))
  .catch(err => console.log(err.message));
```

p1完成处理程序，而后抛错，链式调用第二个Promise的catch方法后，可以通过它的拒绝处理程序接收这个错误，如果拒绝处理程序抛出错误，也可以通过相同的方式接收到这个错误：

```js
let p1 = new Promise((resolve, reject) => {
  throw new Error('Explosion');
});
p1.catch(err => {
  console.log(error.message); // 'Explosion'
  throw new Error('Boom');
}).catch(err => {
  console.log(err.message); // 'Boom'
});
```

此处的执行器抛出错误并触发Promise p1的拒绝处理程序，这个处理程序又抛出另一个错，并且第二个Promise拒绝处理程序捕获，链式Promise调用可以感知到链中其他Promise错误。

注：务必在Promise链的末尾留有一个拒绝处理程序以确保能正确处理所有可能发生的错误

### Promise链的返回值

Promise链可以给下游Promise传递数据。 上面代码很多都已经显示出了

```js
let p1 = new Promise((resolve, reject) => {
  reject(66);
});
p1.catch(value => {
  console.log(value); // '66'
  return value + 1;
}).then(value => console.log(value)); // '67'
```

执行器调用reject方法向Promise的拒绝处理程序传入值66，最终返回value+1。拒绝处理程序中返回的值仍可用在下一个Promise的完成处理程序中，在必要时，即使其中一个Promise失败也能恢复整条链的执行。

### Promise链中返回Promise

同样的还是来看例子：

```js
let p1 = new Promise((resolve, reject) => {
  resolve(6);
});
let p2 = new Promise((resolve, reject) => {
  resolve(8);
});
p1.then(value => {
  // 第一个完成处理程序
  console.log(value); // 6
  return p2;
}).then(value => {
  // 第二个完成处理程序
  console.log(value); // 8
});
```

关于这个模式需要注意的是，第二个完成处理程序被添加到了第三个Promise而不是p2。我们来看另一种可能发生的情况

```js
let p1 = new Promise((resolve, reject) => {
  resolve(66);
});
let p2 = new Promise((resolve, reject) => {
  reject(88);
});
p1.then(value => {
  // 第一个完成处理程序
  console.log(value); // 66
  return p2;
}).then(value => {
  // 第二个完成处理程序
  console.log(value); // 从未调用
});
```

这个示例中由于p2被拒绝了，所以处理程序永不会被调用，所以，无论怎样，我们都应添加一个拒绝处理程序

```js
let p1 = new Promise((resolve, reject) => {
  resolve(66);
});
let p2 = new Promise((resolve, reject) => {
  reject(88);
});
p1.then(value => {
  // 第一个完成处理程序
  console.log(value); // 66
  return p2;
}).catch(value => {
  // 拒绝处理程序
  console.log(value); // 88
});
```

p2被拒绝后，拒绝处理程序被调用并传入p2的拒绝值 88.

## 响应多个Promise

在ES6中可以使用Promise.all()和Promise.race()方法来监听多个Promise

### Promise.all() 和 Promise.race()

该方法只接受一个参数并返回一个Promise，该参数是一个含有多个受监视Promise的可迭代对象。只有当可迭代对象中所有Promise都被解决后返回的Promise才会被解决，只有当可迭代对象中所有Promise都被完成后返回的Promise才会被完成，示例如下：

```js
let p1 = new Promise((resolve, reject) => {
  resolve(66);
});
let p2 = new Promise((resolve, reject) => {
  resolve(88);
});
let p3 = new Promise((resolve, reject) => {
  resolve(99);
});
let p4 = Promise.all([p1, p2, p3]);
p4.then(value => {
  console.log(Array.isArray(value)); // true
  console.log(value[0]); //66
  console.log(value[1]); //88
  console.log(value[2]); //99
})
```

对于所有传入Promise.all()方法的Promise只要有一个被拒绝，那么返回的Promise没等所有Promise都完成就立即被拒绝

**Promise.race()**

该方法监听多个Promise方法，与all稍有不同的是，只要有一个Promise被解决，返回的Promise就被解决，毋须等到所有Promise都被完成。一旦数组中某个Promise被完成，Promise.race()也会像Promise.all()一样返回特定的Promise

## 基于Promise的异步任务执行

来点实战~

```js
const fs = require('fs');
/* 创建可以在其他地方使用的迭代器 */
function run(taskDef) {
  let task = taskDef();
  // 开始执行任务
  let result = task.next();
  // 不断调用next()的递归函数
  function step() {
    // 如果有更多任务要做
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
            return;
          }
          result = task.next(data);
          step();
        })
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }
  // 启动递归进程
  step();
}
/* 定义一个可用于任务执行器的函数 */
function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, callback);
  };
}
/* 执行一个任务 */
run(function *() {
  let contents = yield readFile('config.json');
  doSomethingWith(contents);
  console.log('Done');
})
```

实现起来多多少少还是有一些问题：

1. 逻辑让人困惑（在返回值是函数的函数中包裹每一个函数）
2. 无法区分返回值（用作任务执行器回调函数的返回值和一个不是回调函数的返回值）

说了这么多，于是用Promise来改写主要逻辑部分吧：

```js
const fs = require('fs');
function run(taskDef) {
  // 创建迭代器
  let task = taskDef();
  // 开始执行任务
  let result = task.next();
  // 递归函数遍历
  (function step() {
    // 如果有更多任务要做
    if (!result.done) {
      // 用一个Promise来解决会简化问题
      let promise = Promise.resolve(result.value);
      promise.then(value => {
        result = task.next(value);
        step();
      }).catch(err => {
        result = task.throw(err);
        step();
      });
    }
  }());
}
// 定义一个可用于任务执行器的函数
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(contents);
      }
    })
  })
}
// 执行一个任务
run(function *() {
  let contents = yield readFile('config.json');
  doSomethingWith(contents);
  console.log('Done');
});
```

在该版本中，一个通用的run()函数执行生成器创建一个迭代器，它调用task.next()方法来启动任务并递归调用step()方法直到迭代器完成。

**未来的异步任务执行**

```js
// 省略部分代码
(async function() {
  let contents = await readFile('config.json');
  console.log('Done');
});
```

在函数前添加关键字async表示该函数以异步模式运行，await关键字表示调用readFile('config.json')的函数应该返回一个Promise，否则，响应应该被包裹在Promise中。

## 总结

Promise的设计目标是改进JavaScript中的异步编程，它能够更好地掌控并组合多个同步操作，比事件系统和回调更符合我们的逻辑认知。

1. 执行Promise，会将其内部的任务添加到JS引擎队列并在未来执行
2. Promise有3个状态：pending进行中、fulfilled已完成和rejected已拒绝，一旦进入pending只能变成已完成或已拒绝且该过程不可逆
3. 通过then方法可以添加完成处理程序或拒绝处理程序，通过catch方法智能添加拒绝处理程序
4. 通过Promise.all()或Promise.race()来处理多个执行任务
5. 迭代器及Async都是基于Promise实现的，让我们拥抱Promise进行异步编程