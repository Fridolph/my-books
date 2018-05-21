function HashTable() {
  var table = []

  this.put = function(key, value) {
    var position = loseloseHashCode(key)
    console.log(position + '-' + key)
    table[position] = value
  }

  this.remove = function(key) {
    table[loseloseHashCode(key)] = undefined
  }

  this.get = function(key) {
    // 首先，我们会使用所创建的散列函数来求出给定 key 所对应的位置。这个函数会返回值的位置，
    // 因此我们所要做的就是根据这个位置从数组 table 中获得这个值。
    return table[loseloseHashCode(key)]
  }

  this.print = function() {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i])
      }
    }
  }

  // 在实现上面3方法前，要实现第一个方法是散列函数，它是HashTable类中的一个私有方法
  var loseloseHashCode = function(key) {
    // 给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字
    // 所以首先需要一个变量来存储这个总和，然后遍历并将从ASCII表中查到的每个字符
    // 对应的ASCII值加到hash变量中，最后返回hash值，为了得到较小数值，用 % 余数
    var hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
}

// var hash = new HashTable();
// hash.put('Gandalf', 'gandalf@email.com');
// hash.put('John', 'johnsnow@email.com');
// hash.put('Tyrion', 'tyrion@email.com');
// console.log(hash.get('Gandalf'));
// console.log(hash.get('Loiane'));

// 处理散列表中的冲突
var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.print()
