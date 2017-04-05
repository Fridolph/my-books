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

// 这段代码是“类”库的增强版，我们使用 extend() 函数来生成一个类，这个函数的参数
// 是一个对象。通过迭代将对象的属性直接复制到类上 ：
// var Person = new Class();
Person.extend({
  find: function(id) {
    console.log('find' + id);
  },
  exists: function(id) {
    console.log('exists' + id);
  }
});

// var person = Person.find(1);

// include()函数的工作原理也是一样的，只不过不是将属性复制到类中，而是赋值到类的原型中。
// 换句话说，这里的属性是类实例的属性，而不是类的静态属性
var Person = new Class();
Person.include({
  save: function() {
    console.log('saved ...');
  },
  destroy: function(id) {
    console.log('destroyed ' + id);
  }
});

// var person = new Person();
// person.save();

// 同样的，这里支持extended和included的回调。
// 将属性传入对象后就会触发这两个回调
Person.extend({
  extended: function(klass) {
    console.log(klass + ' was extended!');
  }
}); 

var ORMModule = {
  save: function() {
    // 共享函数...
  }
}

var Person = new Class();
var Asset = new Class();
Person.include(ORMModule);
Asset.include(ORMModule);