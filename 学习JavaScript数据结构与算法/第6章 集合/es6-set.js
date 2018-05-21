let set1 = new Set()
set1.add(1)
// console.log(set1.values())
// console.log(set1.has(1))
// console.log(set1.size)

set1.add(2)
set1.add(3)

let set2 = new Set()
set2.add(2)
set2.add(3)
set2.add(4)

// 模拟并集
let unionAB = new Set()
for (let x of set1) unionAB.add(x)
for (let x of set2) unionAB.add(x)
console.log('交集', unionAB);

// 模拟交集
let intersection = function(setA, setB) {
  let intersectionSet = new Set()
  for (let x of setA) {
    if (setB.has(x)) {
      intersectionSet.add(x)
    }
  }
  return intersectionSet
}
let intersectionAB = intersection(set1, set2)
console.log('并集', intersectionAB)

// 模拟差集
let difference = function(setA, setB) {
  let differenceSet = new Set()
  for (let x of set1) {
    if (!setB.has(x)) {
      differenceSet.add(x)
    }
  }
  return differenceSet
}
let dirrerenceAB = difference(set1, set2)
console.log('差集', dirrerenceAB)
