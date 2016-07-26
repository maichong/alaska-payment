/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Create extends alaska.Sled {
  async exec(data) {
    let payment = data.payment;
    if (!payment) {
      //前置钩子未生成任何支付记录
      service.error('Can not create any payment');
    }
    return payment;
  }
}
