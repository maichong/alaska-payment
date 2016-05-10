'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-03
 * @author Liang <liang@maichong.it>
 */

class Payment extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = Payment;
Payment.label = 'Payment Logs';
Payment.defaultColumns = 'title user payment amount state createdAt';
Payment.defaultSort = '-createdAt';
Payment.nocreate = true;
Payment.noedit = true;
Payment.api = {
  create: 3,
  show: 3
};
Payment.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true,
    private: true
  },
  user: {
    label: 'User',
    ref: 'alaska-user.User',
    private: true
  },
  orders: {
    label: 'Orders',
    ref: ['alaska-order.Order'],
    private: true
  },
  amount: {
    label: 'Amount',
    type: Number,
    require: true,
    private: true
  },
  payment: {
    label: 'Payment',
    type: 'select',
    options: [],
    require: true
  },
  params: {
    label: 'Params',
    type: Object,
    required: true
  },
  state: {
    label: 'State',
    type: 'select',
    number: true,
    default: 0,
    options: [{
      label: 'Pending',
      value: 0
    }, {
      label: 'Success',
      value: 1
    }, {
      label: 'Failed',
      value: -1
    }]
  },
  failure: {
    label: 'Failure Reason',
    type: String
  },
  createdAt: {
    label: 'Created At',
    type: Date
  }
};