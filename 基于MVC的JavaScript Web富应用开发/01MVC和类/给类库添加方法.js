// 直接给类设置属性和设置其静态成员是等价的
var Person = function() {}
Person.find = function(id) {
  console.log(id);
}
var person = Person.find(1);

// 给类的原型设置的属性在实例中也是可用的：
Person.prototype.save = function() {
  console.log('saved...');
}
var person = new Person();
person.save();