/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-10
 * @author Liang <liang@maichong.it>
 */

export default class Complete extends service.Sled {
  /**
   * @param data
   *        data.payment
   */
  async exec(data) {
    if (!data.done) service.error('No valid payment complete hooks');
    let payment = data.payment;
    payment.state = 1;
    await payment.save();
    return payment.toObject();
  }
}
