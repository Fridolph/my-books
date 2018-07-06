class Dictionary {
  constructor() {
    this.items = {}
  }

  has(key) {
    return key in this.items
  }

  set(key, value) {
    this.items[key] = value
  }

  delete(key) {
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }

  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }

  values() {
    let ret = []
    for (let k in this.items) {
      if (this.has(k)) {
        ret.push(this.items[k])
      }
    }
    return ret
  }

  clear() {
    this.items = {}
  }

  get size() {
    return Object.keys(this.items).length
  }

  getItems() {
    return this.items
  }
}

let map = new Dictionary()
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');

console.log(map.has('Gandalf')); // true
console.log(map.size) // 3
console.log(map.values()) // [ 'gandalf@email.com', 'johnsnow@email.com', 'tyrion@email.com' ]
console.log(map.get('Tyrion')); // tyrion@email.com
