var quickSort = function (arr) {　　
  if (arr.length <= 1) { // 如果数组长度小于1直接返回，没必要排序了
    return arr;
  }
  // 从数组正中得到索引
  var pivotIndex = Math.floor(arr.length / 2);　　
  // 以索引为界，分割原数组， [ [比基准数小的值组成的数组] , 基准数, [比基准数大的值组成的数组] ]
  var pivot = arr.splice(pivotIndex, 1)[0];　　
  var left = [];　　
  var right = [];　　
  for (var i = 0; i < arr.length; i++) {　　　　
    if (arr[i] < pivot) {　　　　　　
      left.push(arr[i]);　　　　
    } else {　　　　　　
      right.push(arr[i]);　　　　
    }　　
  }
  return quickSort(left).concat([pivot], quickSort(right));
};