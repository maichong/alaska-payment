'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _co = require('co');

let create = exports.create = (() => {
  var ref = (0, _co.wrap)(function* (ctx) {
    let user = ctx.user || service.error(403);
    let body = ctx.state.body || ctx.request.body;
    let orders = body.orders;
    if (!orders || !Array.isArray(orders) || !orders.length) service.error('missing orders');
    let payment = body.payment || service.error('missing payment');
    if (!service.payments[payment]) service.error('Unknown payment type');

    let amount = 0;
    let record = new _Payment2.default({
      user: user._id,
      payment,
      orders: []
    });
    for (let order of orders) {
      if (typeof order === 'string') {
        order = yield Order.findById(order).where('user', user._id);
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
    record.params = yield service.payments[payment].createParams(ctx, record);
    yield record.save();

    ctx.body = record.data('create');
  });
  return function create(_x) {
    return ref.apply(this, arguments);
  };
})();

var _Payment = require('../models/Payment');

var _Payment2 = _interopRequireDefault(_Payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Order = service.model('order.Order'); /**
                                             * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                             * @date 2016-05-10
                                             * @author Liang <liang@maichong.it>
                                             */

console.log(_Payment2.default);