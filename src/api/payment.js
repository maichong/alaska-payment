/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-10
 * @author Liang <liang@maichong.it>
 */

import Payment from '../models/Payment';

const Order = service.model('order.Order');

console.log(Payment);

export async function create(ctx) {
  let user = ctx.user || service.error(403);
  let body = ctx.state.body || ctx.request.body;
  let orders = body.orders;
  if (!orders || !Array.isArray(orders) || !orders.length) service.error('missing orders');
  let payment = body.payment || service.error('missing payment');
  if (!service.payments[payment]) service.error('Unknown payment type');

  let amount = 0;
  let record = new Payment({
    user: user._id,
    payment,
    orders: []
  });
  for (let order of orders) {
    if (typeof order === 'string') {
      order = await Order.findById(order).where('user', user._id);
      if (!order) service.error('Order not found');
      if (order.state !== 200) {
        service.error('Order state error');
      }
    }
    record.orders.push(order._id);
    amount += order.pay;
    if (!record.title) {
      record.title = order.title;
    }
  }
  record.amount = amount;
  record.params = await service.payments[payment].createParams(ctx, record);
  await record.save();

  ctx.body = record.data('create');
}
