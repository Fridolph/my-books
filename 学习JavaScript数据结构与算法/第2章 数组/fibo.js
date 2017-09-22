/*
 * @Author: fridolph 
 * @Date: 2017-09-21 11:41:41 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-09-21 11:43:05
 */
var fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 2;

for (var i = 3; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}

for (var i = 1; i < fibonacci.length; i++) {
  console.log(fibonacci[i]);
}