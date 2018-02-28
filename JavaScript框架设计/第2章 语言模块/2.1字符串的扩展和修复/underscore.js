/**
 ** 转换为下划线风格
 */
function underscored(target) {
  return target
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/\-/g, '_')
    .toLowerCase()
}
