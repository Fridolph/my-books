(function() {
  var queue = [], paused = false, results;

  /**
   * [test 接受一个包含多个断言的函数. 这些断言可以是同步或是异步，并放置在队列中等待执行]
   * @param  {[type]}   name [description]
   * @param  {Function} fn   [description]
   */
  this.test = function(name, fn) {
    queue.push(function() {
      results = document.getElementById('results');
      results = assert(true, name).appendChild(document.createElement("ul"));

      fn();
    });

    runTest();
  };

  /**
   * [pause test内部函数调用，告诉该测试套件暂停执行测试，直到测试组完成]
   */
  this.pause = function() {
    paused = true;
  };

  /**
   * [resume 恢复测试，经过短暂的延迟，开始下一个测试的运行，旨在避免出现长时间运行的代码块]
   */
  this.resume = function() {
    paused = false;
    setTimeout(runTest, 1);
  };

  /**
   * [runTest 内部实现函数，在测试排队时从列中移除时调用。用于检查当前套件目前是否没被暂停以及队列中是否有测试任务。一旦满足，取出一个测试并执行；测试组完成后，runTest()会检查套件目前是否暂停，若没（意味测试中只有异步测试）runTest()将开始执行下一组测试]
   */
  function runTest() {
    if (!paused && queue.length) {
      queue.shift()();

      if (!paused) {
        resume();
      }
    }
  }

  this.assert = function assert(value, desc) {
    var li = document.createElement("li");

    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);

    if (!value) {
      li.parentNode.parentNode.className = "fail";
    }
    return li;
  }
})();