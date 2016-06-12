/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-10
 * @author Liang <liang@maichong.it>
 */

export async function create(ctx) {
  let user = ctx.user || service.error(403);
  let body = ctx.state.body || ctx.request.body;
  body.user = user;
  let payment = await service.run('Create', body);

  if (payment.state == 1) {
    await service.run('Complete', { payment });
  }

  ctx.body = payment.data('create');
}
