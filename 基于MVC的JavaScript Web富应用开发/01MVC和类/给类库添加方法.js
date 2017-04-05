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

// 但在我看来这种语法有些绕，不切实际且不够简洁，很难一眼就分辨出类的静态属性和实例的属性。
// 因此我们采用另外一种不同的方法来给类添加属性，这里用到了两个函数extend() 和 include() ：
var Class = function() {
  var klass = function() {
    this.init.apply(this, arguments);
  }
  klass.prototype.init = function() {}

  // 定义prototype别名
  klass.fn = klass.prototype;

  // 定义类的别名
  klass.fn.parent = klass;

  // 给类添加属性
  klass.extend = function(obj) {
    var extended = obj.extended;
    for (var i in obj) {
      klass[i] = obj[i];
    }
    if (extended) {
      extended(klass);
    }
  };

  // 给实例添加属性
  klass.include = function(obj) {
    var included = obj.included;
    for (var i in obj) {
      klass.fn[i] = obj[i];
    }
    if (included) {
      included(klass);
    }
  };

  return klass;
}