/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-04
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * @class PaymentService
 */
class PaymentService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-payment';
    super(options, alaska);
    this.payments = {};
  }
}

export default new PaymentService();
