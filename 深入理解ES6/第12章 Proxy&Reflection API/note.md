
> 在ES5之前，JS对象包含许多不可枚举和不可写属性，但我们不能定义自己的不可枚举和不可写属性，ES5中引入Object.defineProperty()方法来实现这一特性。在ES6中又添加了一些内建对象，赋予更多能力。其中，Proxy是一种可以拦截并改变底层JS引擎操作的包装器，在新语言中通过它暴露内部运作的对象，从而让我们可创建内建对象。这篇会描述Proxy解决的问题并通过代码实例学习如何创建并使用Proxy特性。

<!-- more -->

## 数组问题

在ES6之前，不能通过自己定义的对象模仿JS数组对象的行为方式。当给数组的特定元素赋值时，影响到该数组的length属性，也可以通过length属性修改数组元素。

```js
let names = ['fri'];
console.log(names.length); // 1
names[2] = 'yk';
console.log(names.length); // 3
names.length = 1;
console.log(names[2]); // undefined
console.log(names[0]); // 'fri'
```

数值属性和length属性具有这种非标准行为，因而在ES6中数组被认为是exotic object（奇异对象，与普通对象相对）

## 代理和反射

调用new Proxy()可创建代替其他目标target对象的代理。（可理解为第三方中介之类的东西）

代理可以拦截JS引擎内部的底层对象操作，并触发响应特定操作的“陷阱函数”（回调）。反射API以Reflect对象的形式出现，对象中的方法的默认特性与相同的底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的Reflect方法

| 代理陷阱 | 覆写的特性 | 默认特性 |
| - | - | - |
| get | 读取一个属性值 | Reflect.get() |
| set | 写入一个属性 | Reflect.set() |
| has | in操作符 | Reflect.has() |
| deleteProperty | delete操作符 | Reflect.deleteProperty() |
| getPrototypeOf | Object.getPrototypeOf | Reflect.getPrototypeOf() |
| setPrototypeOf | Object.SetPrototypeOf | Reflect.setPrototypeOf() |
| isExtensible | Object.isExtensible() | Reflect.isExtensible() |
| preventExtensions | Object.preventExtensions() | Reflect.preventExtensions() |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor() | Reflect.getOwnPropertyDescriptor() |
| defineProperty | Object.defineProperty() | Reflect.defineProperty() |
| ownKeys | Object.keys()、Object.getOwnPropertyNames()和Object.getOwnPropertySymbols() |  |
| apply | 调用一个函数 | |
| construct | 用new调用一个函数 | Reflect.construct() |

每个陷阱覆写JS对象的一些内建特性，可以用它们拦截并修改这些特性。若仍需使用内建特性，可以使用相应的反射API方法。创建代理会让代理和反射API的关系变得清楚

## 创建一个代理

直接上代码： 

```js
let target = {};
// 用Proxy构造函数创建代理需传两个参数：目标target和处理程序handler
// 处理程序handler是定义一个或多个陷阱的对象
let proxy = new Proxy(target, {});
proxy.name = 'proxy';
console.log(proxy.name); // 'proxy'
console.log(target.name); // 'proxy'
target.name = 'target';
console.log(proxy.name); // 'target'
console.log(target.name); // 'target'
```

上例中由于`proxy.name`和`target.name`引用的都是`target.name`，因此二者的值相同，从而为`target.name`设置新值后，`proxy.name`也一同变化。

### 使用set陷阱验证属性

创建一个属性值是数字的对象，对象中每新增一个属性都要加以验证，若不是数字必须抛出错误。为实现该需求，可定义一个set陷阱覆写设置值的默认特性

set陷阱接受4个参数：
* trpTarget 用于接收属性（代理的目标）对象
* key要写入的属性键（字符串或Symbol类型）
* value 被写入属性的值
* receiver 操作发生的对象（通常是代理）

Reflect.set()是set陷阱对应的反射方法和默认特性，它和set代理陷阱一样接收4个参数，以便在陷阱中使用。若属性已设置陷阱应返回true，未设置则返回false。`Reflect.set方法基于操作是否成功来返回恰当的值`

```js
let target = { name: 'target' }
let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    // 忽略不希望受到影响的已有属性
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('属性必须是数字');
      }
    }
    // 添加属性
    return Reflect.set(trapTarget, key, value, receiver);
  }
});
// 添加一个新属性
proxy.count = 1;
console.log(proxy.count); // 1
console.log(target.count); // 1
// 由于目标已有name属性因而可以给它赋值
proxy.name = 'Proxy';
console.log(proxy.name); // 'proxy'
console.log(target.name); // 'proxy'
// 给不存在的属性赋值会报错
proxy.age = 22; // 可以通过
proxy.age = '22'; // 可以通过 
proxy.ages = [22, 33]; // 报错
proxy.ages = 22; // 通过
proxy.ages = [22, 33]; // 通过
```

说明这样使用只有一次拦截，成功赋值后的属性又可以继续覆盖了


### 用get陷阱验证对象结构

JS有一个"缺陷"，即读取不存在属性不会报错，如 

    let target = {}; 
    console.log(target.name); //undefined

在某些场景，这将导致很严重的问题，而使用代理通过检查对象结构可回避此问题。
只有当读取属性时才会检验属性，所以无论对象是否存在某个属性，都可以用get陷阱来检测，它接收3个参数：
* trapTarget 被读取属性的源对象（代理目标）
* key 要读取的属性键（字符串或Symbol）
* receiver 操作发生的对象（通常是代理）

若属性在目标上不存在，使用get陷阱和Reflect.get()时会报错，如下：

```js
get(trapTarget, key ,receiver) {
  if (!(key in receiver)) {
    throw new TypeError('属性' + key + '不存在');
  }
  return Reflect.get(trapTarget, key, receiver);
};
// 添加一个属性，程序仍正常运行
proxy.name = 'Proxy';
console.log(proxy.name); // 'Proxy'
// 若属性不存在，则报错
console.log(proxy.age); // 报错
```

这样，get可以拦截属性读取操作，并通过in操作符判断receiver上是否具有被读取的属性。

### 用has陷阱隐藏已有属性

可以用in操作符来检测给定对象中是否含有某个属性，如果自有属性或原型属性匹配这个名称或Symbol就返回true

```js
let target = {
  value: 42;
}
console.log('value' in target); // true
console.log('toString' in target); // true
```

在代理中使用has陷阱可以拦截这些in操作并返回不同的值

每当使用in操作符时都会调用has陷阱，并传入两个参数：
* trapTarget 读取属性的对象（代理的目标）
* key 要检查的属性键（字符串或Symbol）

Reflect.has()方法可接收这些参数返回in操作符的默认响应，同时使用has陷阱和Reflect.has()可以改变一部分属性被in检测时的行为，并恢复另外一些属性的默认行为，如下：

```js
let target = {
  name: 'target',
  value: 42
};
let proxy = new Proxy(target, {
  has(trapTarget, key) {
    if (key === 'value') {
      return false;
    } else {
      return Reflect.has(trapTarget, key);
    }
  }
});
console.log('value' in proxy); // false
console.log('name' in proxy); //true
console.log('toString' in proxy); // true
```

代理中的has陷阱会检查key是否为value, 如果是的话返回false,若不是则调用Reflect.has()方法返回默认行为。

### 用deleteProperty陷阱防止删除属性

delete操作符可以从对象中移除属性，如果成功则返回true,不成功则返回false。在严格模式下，如果尝试删除一个nonconfigurable(不可配置)属性则会报错，而在非严格模式下返回false

```js
let target = {
  name: 'target',
  value: 42
}
Object.defineProperty(target, 'name', {configurable: false});
console.log('value' in target); // true
let result1 = delete target.value;
console.log(result1); // true
console.log('value' in target); // false
// 在严格模式下，这样写会报错
let result2 = delete target.name;
console.log(result2); // false
console.log('name' in target); true
```

在代理中可以通过deleteProperty陷阱来改变delete的行为，每当通过delete操作符删除对象属性时，deleteProperty陷阱都会被调用，它接受两个参数：
* trapTarget 要删除属性的对象（代理的目标）
* key 要删除的属性值（字符串或Symbol）

Reflect.deleteProperty()方法为deleteProperty陷阱提供默认实现，并接受同样的两个参数，结合二者可改变delete具体表现行为，如：

```js
let target = {
  name: 'target',
  value: 42
};
let proxy = new Proxy(target, {
  deleteProperty(trapTarget, key) {
    if (key === 'value') {
      return false;
    } else {
      return Reflect.deleteProperty(trapTarget, key);
    }
  }
});
// 尝试删除proxy.value
console.log('value' in proxy); // true
let result1 = delete proxy.value;
console.log(result1); //false
console.log('value' in proxy); // true
// 尝试删除 proxy.name
console.log('name' in proxy); // true
let result2 = delete proxy.name;
console.log(result2); // true
console.log('name' in proxy); false
```

这与has陷阱很类似，deleteProperty陷阱检查key是否为value，若是返回false，否则调用Reflect.deleteProperty()方法来使用默认行为

### 原型代理陷阱

在下面两种情况下，Object上的方法会调用代理中的同名陷阱来改变方法的行为。
两个陷阱均与代理有关，但具体到方法只与每个陷阱的类型有关，setPrototypeOf陷阱接受一下参数：
* trapTarget 接受原型设置的对象（代理的目标）
* proto 作为原型使用的对象

传入Object.setPrototypeOf()方法和Reflect.setPrototypeOf()方法的均是以上两个参数，另一方面getPrototypeOf陷阱中的Object.getPrototypeOf()方法和Reflect.getPrototypeOf()方法只接收参数trapTarget

#### 原型代理陷阱的运行机制

原型代理陷阱有一些限制。首先，getPrototypeof陷阱必须返回对象或null，只要返回值导致错误时，返回值检查可以确保Object.getPrototypeOf()返回的值总是符合预期的。其次，在setPrototypeOf陷阱中，若操作失败则一定返回false。这时Object.setPrototypeOf()会抛错，若setPrototypeOf返回不是false的值，那么Object.setPrototypeOf()便假设操作成功。

```js
let target = {};
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null;
  },
  setPrototypeOf(trapTarget, proto) {
    return false;
  }  
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyProto === Object.prototype); // false
console.log(proxyProto); // null
// 成功
Object.setPrototypeOf(target, {});
// 给不存在的属性赋值会报错
Object.setPrototypeOf(proxy, {});
```

以上强调了target和proxy行为的差异。Object.getPrototypeOf()给target返回的是值，而给proxy返回值时，由于getPrototypeOf陷阱被调用，返回的是null。
同样，Object.setPrototypeOf()成功为target设置原型，而给proxy设置原型时，由于setPrototypeOf陷阱被调用，最终抛错。
若想使用两陷阱的默认行为，则可以使用Reflect上对应方法，如下：

```js
let target = {};
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return Reflect.getPrototypeOf(trapTarget);
  },
  setPrototypeOf(trapTarget, proto) {
    return Reflect.setPrototypeOf(trapTarget, proto);
  }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyProto === Object.prototype); // true
// 成功
Object.setPrototypeOf(target, {});
// 成功
Object.setPrototypeOf(proxy, {});
```

这两组方法之间的差异？

Object.getPrototypeOf()和Object.setPrototypeOf()是高级操作；而Reflect.getPrototypeOf()和Reflect.setPrototypeOf()是`底层操作`，赋予开发者可访问之前只在内部操作的[[GetPrototypeOf]]和[[SetPrototypeOf]]的权限。

Reflect.getPrototypeOf()方法是内部[[GetPrototypeOf]]操作的包裹器，Reflect.setPrototypeOf()与[[SetPrototypeOf]]与之相同。Object上相应方法虽也调用了[[GetPrototypeOf]]和[[SetPrototypeOf]]，但在这之前会执行一些额外步骤，并通过检查返回值来决定下一步操作。

若传入参数不是对象，则Reflect.getPrototypeOf()方法会抛错，而Object.getPrototypeOf()则会在操作执行前先将参数强制转化为一个对象，给这两个方法传入一个数字，会得到不同的结果：

```js
let result1 = Object.getPrototypeOf(1);
console.log(result1 === Number.prototype); // true
// 给不存在的值赋值会抛错
Reflect.getPrototypeOf(1);
```

> 当Reflect.getPrototypeOf() / Object.getPrototypeOf 和 Reflect.setPrototypeOf() / Object.setPrototypeOf() 被用于一个代理时，将调用代理陷阱getPrototypeOf和setPrototypeOf

### 对象可扩展性陷阱

ES5已通过`Object.preventExtensions()`和`Object.isExtensible()`方法修正了对象的可扩展性，ES6可以通过代理中的 preventExtensions 和 isExtensible 陷阱拦截这两个方法并调用底层对象。

基础示例：

```js
let target = {};
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  },
  preventExtensions(trapTarget) {
    return Reflect.preventExtensions(trapTarget);
  }
});
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target)); // false
console.log(Object.isExtensible(proxy)); // false
// 如果想让Object.preventExtensions()对于proxy失效，
// 那么可以在preventExtensions陷阱中返回false
let target = {};
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  },
  preventExtensions(trapTarget) {
    return false;
  }
});
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true
```

### 重复可扩展性方法

看似相似的重复方法出现在Object和Reflect上，Object.isExtensible()和Reflect.isExtensible()非常相似。当只传入非对象值时，Object.isExtensible()返回false,而Reflect.isExtensible()则抛错：

```js
let result1 = Object.isExtensible(2);
console.log(result2); // false
// 给不存在的属性赋值会抛错
let result2 = Reflect.isExtensible(2);
//
let result3 = Object.preventExtensions(2);
console.log(result3); // 2
let target = {};
let result4 = Reflect.preventExtensions(target);
console.log(result4); // true
// 给不存在的属性赋值会报错
let result5 = Reflect.preventExtensions(2);
```

这条限制类似于Object.getPrototypeOf()与Reflect.getPrototypeOf()方法之间的差异。
在这里即使2不是一个对象 Object.preventExtensions()也将作为返回值，而Reflect.preventExtensions() 方法则报错，只有当传入对象时才返回true

### 属性描述符陷阱

