/**
 * @function getOrderTotal
 * @param {Object} customer - 顾客信息 关于下订单者的一组信息
 * @param {Array} lineItems - 包括所购商品、商品数量及每种商品的单位运费
 * @param {String} discountCode - 可选择使用的折扣码，加入运费和税费之前使用该码
 * @return {Object} total - 返回一个封装对象
 */
var getOrderTotal = function(customer, lineItems, idscountCode) {
  var discountTotal = 0;
  var lineItemTotal = 0;
  var shippingTotal = 0;
  var taxTotal = 0;

  for (var i = 0; i < lineItems.length; i++) {
    var lineItem = lineItems[i];
    lineItemTotal += lineItem.price * lineItem.quantity;
    shippingTotal += lineItem.shippingPrice * lineItem.quantity;
  }

  if (discountCode === '20PERCENT') {
    discountTotal = lineItemTotal * 0.2;
  }

  if (customer.shiptoState === 'CA') {
    taxTotal = (lineItemTotal - discountTotal) * 0.08;
  }

  var total = 
}