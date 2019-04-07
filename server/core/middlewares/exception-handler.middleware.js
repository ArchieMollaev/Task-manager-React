import { serverUnavailable, unauthorized } from 'boom';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { message } = err;
    console.log(message);
    if (message === 'Authentication Error') {
      ctx.body = unauthorized().output.payload;
      return;
    }
    const { payload } = err;
    ctx.body = payload || serverUnavailable('database connection failed').output.payload;
  }
};
