## 使用ES6的类语法

首先我们要知道的是，ESMAScript5及早期版本中是没有类的概念的。
最相近的思路是创建一个自定义类型，例如：

```js
function Person(name) {
  this.name = name
}
Person.prototype.sayname = function() {
  console.log(this.name);
}
var person = new Person('fri');
person.sayname(); // 'fri'
console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
```

上面的代码首先创造一个构造函数，然后定义方法并赋值给构造函数的原型，从而实现继承。

### 基本类声明

```js
class Person {
  // 等价于上面的Person构造函数
  constructor(name) {
    this.name = name;
  }
  // 等价于Person.prototype.sayname
  sayname() {
    console.log(this.name);
  }
}
let person = new Person('fri');
person.sayname(); // 'fri'
console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
console.log(typeof Person); // 'function'
console.log(typeof Person.prototype.sayname); // 'function'
```

通过对比，可以看出，这里通过在`constructor`方法名来定义构造函数，`其私有属性是实例中的属性，不会出现在原型上，且只有在类的构造函数或方法中创建`，上面的name就是一个私有属性

类声明仅仅是基于已有自定义类型声明的语法糖。所以，`Person`声明实际上创建了一个具有构造函数方法行为的函数。

---

### 为何使用类语法

尽管类与自定义类型之间拥有诸多相似处，但我们更需牢记以下差异性：

* 函数声明可以被提升，而类声明与let声明类似，不能被提升；真正执行声明语句之前，它们会一直存在于临时死区中
* 类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行
* 在自定义类型中，需要通过`Object.defineProperty()`方法手工制定某个方法为不可枚举；而在类中，所有方法都是不可枚举的
* 每个类都有一个名为[[Construct]]的内部方法，通过关键字new调用那些不含[[Construct]]的方法会导致程序抛出错误
* 使用除关键字new以外的方式调用类的构造函数会导致程序抛出错误
* 在类中修改类名会导致程序报错

### 类表达式

**基本的类表达式语法**

```js
let Person = class {
  // ... 代码省略，和上面的类一样
}
```

结论：

1. 类表达式不需要标识符在类后
2. 类表达式在功能上等价于类声明
3. 类声明和类表达式均不会被提升

接第3点，二者最重要的区别是，name属性不同，匿名类表达式的name属性值是一个空字符串，而类声明的name属性值为类名。

**命名类表达式**

```js
let Person = class Person2 {
  // ...代码省略, 同上
}
```

由于标识符 Person2只存在于类定义中，因此它可被用在像sayname()这样的方法中，而在类外部，不存在名为Person2的绑定，因而typeof Person2的值为undefined

在JS引擎中，类表达试的实现与类声明稍有不同。类声明通过`let定义的外部绑定`与通过`const定义的内部绑定`具有相同名称；而`命名类表达式通过const定义`名称，从而上例的Person2只能在类内部使用。

### 作为一等公民的类

> 在程序中，一等公民是制一个可以传入函数，可从函数返回，且可赋值给变量的值。

那么，JS中的函数自然是一等公民，类其实就是这样一个语法糖所以也是一等公民。JS允许通过多种方式使用类的特性

```js
// 例，可以将类作为参数传入函数中
function createObject(classDef) {
  return new classDef();
}
let obj = createObject(class {
  sayHi() {
    console.log('Hi!');
  }
})
obj.sayHi(); // 'Hi'
```

上例通过调用`createObject()`函数时传入一个匿名类表达式作为参数，然后通过new实例化这个类并返回其实例赋值给变量obj。

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayname() {
    console.log(this.name);
  }
}('fri');
person.sayname(); // 'fri'
```

这里创建一个立即执行的匿名类表达式，此模式可以使用类语法创建单例，且不会在作用域中暴露类的引用，后面的小括号表明正在调用函数，所以可给函数传参。

### 访问器属性

尽管应该在类构造函数中创建其属性，但类也支持直接在原型上定义访问器属性。如下：

```js
class CustomHtmlElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnpropertyDescriptor(CustomHtmlElement.prototype, 'html');
console.log('get' in descriptor); // true
console.log('set' in descriptor); // true
```

代码中CustomHtmlElement类是一个针对现有DOM元素的包装器，通过getter和setter方法将元素的innerHTML方法委托给html属性，该属性访问器是在CustomHtmlElement.prototype上创建的，与其他方法相同，创建时声明该属性不可枚举

### 可计算成员名称

类和对象字面量有很多相似处，类方法和访问器属性支持使用可计算名称，例如：

```js
let mothodName = 'sayName';
class Person {
  constructor(name) {
    this.name = name;
  }
  // 通过变量来给类定义中的方法命名
  [methodName]() {
    console.log(this.name);
  }
}
let me = new Person('fri');
me.sayName(); // 'fri' 
```

通过相同方式可以在属性⑦属性中计算可计算名称

```js
let propertyName = 'html';
class CustomHtmlElement {
  constructor(element) {
    this.element = element;
  }
  get [propertyName]() {
    return this.element.innerHTML;
  }
  set [propertyName](value) {
    this.element.innerHTML = value
  }
}
```

这里通过propertyName变量并使用`getter`和`setter`方法为类添加html属性，且可像往常一样通过 `.html`访问该属性

### 生成器方法

```js
class MyClass {
  *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
}
let instance = new MyClass();
let iterator = instance.createIterator();
```

以上代码创建了MyClass类，它有一个生成器方法`createIterator`，其返回值为一个硬编码在生成器中的迭代器。
如果想要类是用来表示集合的，那么为它定义一个默认迭代器会更好，例：

```js
class Collection {
  constructor() {
    this.items = [];
  }
  *[Symbol.iterator]() {
    yield *this.items.values();
  }
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
  console.log(x);
}
// 输出:
// 1
// 2
// 3
```

现在可以将Collection的实例用于for-of循环中，或用展开运算符操作。

### 静态成员

ES5之前我们通常这么来用：

```js
function Person(name) {
  this.name = name;
}
// 静态方法
Person.create = function(name) {
  return new Person(name);
}
// 实例方法
Person.prototype.sayname = function() {
  console.log(this.name);
}
var person = Person.create('fri');
```

由于工厂方法`Person.create()`使用的数据不依赖Person的实例，因而其会被认为是一个静态方法。
ES6的类语法简化了该过程，下面我们用ES6语法重写上面：

```js
class Person {
  // 等价于Person构造函数
  constructor(name) {
    this.name = name;
  }
  // 等价于Person.prototype.sayname
  sayName() {
    console.log(this.name);
  }
  // 等价于Person.create
  static create(name) {
    return new Person(name);
  }
}
let person = Person.create('fri');
```

Person有一个静态方法`create()`，它的语法与sayname()的区别只在于是否使用`static关键字`。
类中的所有方法和访问器属性都可以用static关键字来定义，唯一的限制是不能将static用于定义构造函数方法。

注：不可在实例中访问静态成员，必须要直接在类中访问静态成员

### 继承与派生类

同样的，我们来看看ES5的写法，再对比下ES6写法来学习

```js
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function() {
  return this.length * this.width;
}
function Square(length) {
  Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
var square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
```

为了实现继承，必须用一个创建自`Rectangle.prototype`的新对象重写`Square.prototype`，并调用Rectangle.call()方法。
那么我们看下ES6能做哪些简化，代码如下：

```js
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
}
class Square extends Rectangle {
  constructor(length) {
    // 等价于Rectangle.call(this, length, length)
    super(length, length);
  }
}
let square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
```

Square类通过`extends关键字`继承Rectangle类，在Square构造函数中通过super()调用Rectangle构造函数并传入相应参数。
继承自其他类的类被称作为派生类，如果在派生类中指定了构造函数则必须要调用super()。
如果选择不使用构造函数，则当创建新的类实例时会自动调用super()并传入所有参数

**使用super()注意事项**