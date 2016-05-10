'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class PaymentService
 */
class PaymentService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-payment';
    super(options, alaska);
    this.payments = {};
  }
}
exports.default = PaymentService; /**
                                   * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                   * @date 2016-05-04
                                   * @author Liang <liang@maichong.it>
                                   */