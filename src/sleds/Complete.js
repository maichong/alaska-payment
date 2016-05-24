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
    payment.state = 1;
    await payment.save()
  }
}
