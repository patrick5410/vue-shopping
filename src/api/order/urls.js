import baseUrl from '../baseUrl'
export default {
  getOrders: baseUrl + '/order/getOrders',
  getOrder: baseUrl + '/order/getOrder',
  createOrder: baseUrl + '/order/createOrder',
  pay: baseUrl + '/order/pay',
  detail: baseUrl + '/order/detail',
  cancelOrder: baseUrl + '/order/cancelOrder',
  payOrder: baseUrl + '/order/pay',
  refundOrder: baseUrl + '/order/refund',
  deleteOrder: baseUrl + '/order/deleteOrder',
  confirmReceive: baseUrl + '/order/confirmReceive'
}
