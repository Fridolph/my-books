// JavaScript 中，在构造函数中给类添加函数和给对象添加属性是一模一样的
function Person() {}
// Person.find = function(id){
//   // ...
// };
// var person = Person.find(1);

// 要想给构造函数添加实例函数，则需要用到构造函数的 prototype ：
// Person.prototype.breath = function(){
//   console.log('breath');
// };
// var person = new Person();
// person.breath();

// 常用模式，给类的prototype起一个别名fn, 参考jQuery
Person.fn = Person.prototype;

Person.fn.say = function() {
  console.log('Person.fn.say');
};

var person = new Person();
person.say();