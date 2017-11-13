在JS中，函数的第一型对象first-class object，函数可以共处，可以将其视为其他类型的JS对象。

集合排序操作 - java

```java
Arrays.sort(values, new comparator<Integer>() {
  public int compare(Integer value1, Integer value2) {
    return value2 - value1;
  }
});
```

```js
values.sort((value1, value2) => value2 - value1);
```

## 函数是第一型对象

对象在JS中的功能：

* 可通过字面量进行创建
* 可赋值给变量、数组或其他对象的属性
* 可作为参数传递给函数
* 可作为函数的返回值进行返回
* 可拥有动态创建并赋值的属性
