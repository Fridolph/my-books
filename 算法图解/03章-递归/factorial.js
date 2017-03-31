/**
 * 如果使用循环，程序的性能可能更高；如果使用递归，程序可能更容易理解。
 * 如何选择要看什么对你来说更重要
 */

// 循环方法
function factorial1(n) {
  for (var i = 1; i <= n; i++) {
    i = n * (n - 1);
  }
  return i;
}

// 递归实现
function factorial2(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}