
> 既然是改进，那么我们在了解之余更应该付诸实践，这样才能帮助我们理解和增加效率。ES5的几个迭代方法就已非常实用了，ES6里增加了更多的功能，在下文中，我们一边学习官方的API一边运用于实践，本系列写作目的重在理解与实践。凑的废话字数也够了，于是开始正文吧。

<!-- more -->

## 新增功能

### 创建数组

在ES5之前，我们要创建一个数组有两个种方式: 

    var arr1 = new Array()
    var arr2 = []

```js
let arr = new Array(2);
console.log(arr.length); // 2
console.log(arr[0]); // undefined
console.log(arr[1]); // undefined
// -----
arr = new Array('2');
console.log(arr.length); // 1
console.log(arr[0]); // "2"
// -----
items = new Array(1, 2);
console.log(arr.length); // 2
console.log(arr[0]); // 1
console.log(arr[1]); // 2
```

**Array.of()**

对于Array构造函数，如果传一个参数则为生成的数组长度，如果是多个，则为数组中对应项，像上面如果数据类型为字符串，一个参数也会对对象一项… 总之就是很绕很难理解是吧
那么ES6的Array.of就很方便了，下面上代码

```js
let arr = Array.of(1, 2);
console.log(arr.length); // 2
console.log(arr[0]); // 1
console.log(arr[1]); // 2
arr = Array.of(2);
console.log(arr.length); // 1
console.log(arr[0]); // 2
arr = Array.of('2');
console.log(arr.length); // 1
console.log(arr[0]); // "2"
```

> Array.of() 不通过Symbol.species属性确定返回值的类型。它使用当前构造函数来确定返回数据的类型

**Array.from()**

在ES6之前，JS不支持直接将非数组对象转化为真实数组，arguments就是一种类数组对象。在之前我们通常会这么处理：

```js
function makeArray() {
  var args = [];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  // 使用args
}
```

这种方法在函数作用域内创建args数组，再将arguments的每一项元素复制到新数组中，虽然有效，但其实非常麻烦，在这个过程中，我们发现了另一种有效的方式：

```js
function makeArray() {
  var args = Array.prototype.slice.call(arguments);
  // 使用args
}
```

重点在于slice方法，并用call将this绑定为当前函数的arguments，这样来实现类数组到数组的转换。在ES6中我们还可以使用Array.from()

```js
function makeArray() {
  var args = Array.from(arguments);
  // 使用args
}
```

Array.from()方法调用会基于arguments对象中的元素创建一个新数组。同时args是Array的一个实例，Array.from()方法也是通过this来确定返回数组的类型的。
Array.from()方法还可以处理类数组对象和可迭代对象，也就是说方法能够将所有含有Symbol.iterator属性的对象转换为数组，例如：

```js
let numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;    
  }
}
let numbers2 = Array.from(number, value => value * 2);
console.log(numbers2); // 2, 4, 6
```

### 为所有数组添加的新方法

**find()和findIndex()**

`find()和findIndex()`都接受两个参数：一个回调函数，另一个为可选参数，用于指定回调函数中this的值。
二者的区别在于，find()返回查找到的值，findIndex()返回查到值的索引。

```js
let nums = [2, 4, 8, 16, 32, 64, 88, 99]
console.log(nums.find(n => n > 64)); // 88
console.log(nums.findIndex(n => n <= 64)) // 0
```

可看到，一次只返回一个值，如果我们要将结果都拿出来呢，这里留个疑问，后面填坑

**fill()**

`fill()`可以用指定的值填充一个至多个数组元素，下面上代码：

```js
let nums = [1,2,3,4];
nums.fill(1);
console.log(nums); // 1,1,1,1
```

这里可看到只添一个参数，所有的都被填为了1，若要保留特定项不受影响，我们可以这样操作：

```js
let nums = [1,2,3,4];
nums.fill(1, 2);
console.log(nums); // 1,2,1,1
nums.fill(3,2); // 1,2,3,3
nums.fill(4,3); // 1,2,3,4
nums.fill(0,-1); // 1,2,3,0
nums.fill(-1,-2); // 1,2,-1,0
```

**copyWithin**

该方法与fill()类似，其也可以同时改变数组中的多个元素，fill是将数组元素赋值为一个指定的值，而copyWithin()则是从数组中复制元素的值，说再多也没例子好：

```js
let nums = [1,2,3,4];
// 从数组的索引2开始粘贴值, 从数组的索引0开始复制值
nums.copyWithin(2, 0);
console.log(nums); // 1,2,1,2
// 来个数多点的
for (var i = 0; i < 20; i++) {
  nums.push(i);
}
nums.copyWithin(6, 0);
// [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
```

### 定型数组

定型数组是一种用于处理数值类型数据的专用数组。以下可为了解：

> 在JS中，数字是以64位浮点格式存储的，并按需转换为32位证书，所以算数运算非常慢，无法满足webGL的需求。因此在ES6中引入定型数组来解决这个问题，并提高更高性能的算数运算。所谓定型数组，就是将任何数字转换为一个包含数字比特的数组，随后就可以通过我们熟悉的数组方法来作进一步处理。ES6采用定型数组为语言的正式格式来确保更好的跨JS引擎兼容性以及与JS数组的互操作性。尽管ES6的定型数组与webGL中的不一样，但是仍保留了足够的相似之处

**数值数据类型**

定型数组支持存储和操作以下8种不同的数值类型：

* 有符号的8位整数 int8
* 无符号的8位整数 uint8
* 有符号的16位整数 int16
* 无符号的16位整数 uint16
* 有符号的32位整数 int32
* 无符号的32位整数 uint32
* 32位浮点数 float32
* 64位浮点数 float64

简单来说就是，如果用普通的JS数字来存储8位整数，会浪费56个比特，这些比特原本可以存储在其他8位整数或小于56比特的数字。
所有与定型数组有关的操作和对象都集中在这8个数据类型上，在使用它们之前，需要创建一个数组缓冲区来存储这些数据。

ps (由于笔者目前的工作和学习中暂时用不到这些特性就略读跳过了~) 更多请参考 深入ES6第10章

## 小结

ES6进一步强化了数组功能，我们来看看

用于创建数组用：
* Array.of()
* Array.from()

数组增强功能：在数组实例上调用
* fill()
* copyWithin
* 定型数组

严格来讲定型数组不是数组，因为它们不继承自Array，但它们看起来确实很像，行为也像数组。
定型数组中的值属于8种不同数值数据类型中的一个，它们是基于ArrayBuffer对象构建的，用于表示一个或多个数字底层的数位。
按位运算更适合用定型数组来操作，其不会像JS数字类型的操作那样将值在多种格式间反复转换。
