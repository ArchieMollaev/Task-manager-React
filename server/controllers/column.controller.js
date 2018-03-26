import Router from 'koa-router';
import ColumnService from '../services/column.service';

const create = async (ctx) => {
  const { id } = ctx.state.auth;
  const data = ctx.request.body;
  ctx.body = await ColumnService.create(id, data);
};

const remove = async (ctx) => {
  const { id } = ctx.state.auth;
  const { columnId } = ctx.params;
  ctx.body = await ColumnService.remove(id, columnId);
};

const rename = async (ctx) => {
  const { id } = ctx.state.auth;
  const { columnId } = ctx.params;
  const data = ctx.request.body;
  ctx.body = await ColumnService.rename(id, columnId, data);
};

const ColumnController = () => {
  const router = Router();
  router.post('/create-column', create);
  router.del('/remove-column/:columnId', remove);
  router.patch('/rename-column/:columnId', rename);
  return router.routes();
};

export default ColumnController;
