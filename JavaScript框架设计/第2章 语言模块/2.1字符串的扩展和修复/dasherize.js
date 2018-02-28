/**
 ** 转换为连字符风格，即CSS变量的风格
 */
function dasherize(target) {
  return underscored(target).replace(/_/g, '-')
}