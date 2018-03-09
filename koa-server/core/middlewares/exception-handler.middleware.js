import Boom from 'boom';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { status, body } = err;
    ctx.status = status;
    ctx.body = body || Boom.unauthorized('Authentication Error').output.payload;
  }
};
