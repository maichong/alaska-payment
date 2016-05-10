/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-10
 * @author Liang <liang@maichong.it>
 */

const ORDER = alaska.service('alaska-order');
const Order = ORDER.model('Order');

export default class Complete extends service.Sled {
  /**
   * @param data
   *        data.payment
   */
  async exec(data) {
    let payment = data.payment;
    if (payment.state === 0) {
      for (let order of payment.orders) {
        if (!order.save) {
          order = await Order.findById(order);
        }
        if (payment.orders.length === 1) {
          order.payed += payment.amount;
        } else if (!order.payed) {
          //多个订单一起支付
          order.payed = order.pay;
        } else {
          //多个订单一起支付,并且当前订单中已经有已支付金额
          //异常情况
        }
        await ORDER.run('Pay', { order });
      }
      payment.state = 1;
      await payment.save()
    }
  }
}
