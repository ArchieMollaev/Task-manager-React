import Router from 'koa-router';
import ColumnService from '../services/column.service';

const createColumn = async (ctx) => {
  const token = ctx.request.header.authorization;
  const data = ctx.request.body;
  ctx.body = await ColumnService.createColumn(token, data);
};

const removeColumn = async (ctx) => {
  const token = ctx.request.header.authorization;
  const data = ctx.request.body;
  ctx.body = await ColumnService.removeColumn(token, data);
};

const ColumnController = () => {
  const router = Router();
  router.post('/create-column', createColumn);
  router.post('/remove-column', removeColumn);
  return router.routes();
};

export default ColumnController;
