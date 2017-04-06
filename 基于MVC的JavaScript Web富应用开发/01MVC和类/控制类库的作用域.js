var Class = function(parent) {
  var klass = function() {
    this.init.apply(this, arguments);
  };
  klass.prototype.init = function() {}
  klass.fn = klass.prototype;

  // 添加一个proxy函数
  klass.proxy = function(func) {
    var self = this;
    return (function() {
      return func.apply(self, arguments);
    });
  }

  // 在实例中也添加这个函数
  klass.fn.proxy = klass.proxy;

  return klass;
}
