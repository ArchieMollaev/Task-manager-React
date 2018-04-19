import Router from 'koa-router';
import CardService from '../services/card.service';

const create = async (ctx) => {
  const { id } = ctx.state.auth;
  const data = ctx.request.body;
  ctx.body = await CardService.create(id, data);
};

const remove = async (ctx) => {
  const { id } = ctx.state.auth;
  const { columnId, cardId } = ctx.params;
  ctx.body = await CardService.remove(id, columnId, cardId);
};

const update = async (ctx) => {
  const { id } = ctx.state.auth;
  const { columnId, cardId } = ctx.params;
  const data = ctx.request.body;
  ctx.body = await CardService.update(id, columnId, cardId, data);
};

const replace = async (ctx) => {
  const { id } = ctx.state.auth;
  const data = ctx.request.body;
  ctx.body = await CardService.replace(id, data);
};

const CardController = () => {
  const router = Router();
  router.post('/create-card', create);
  router.del('/remove-card/col=:columnId&card=:cardId', remove);
  router.patch('/update-card/col=:columnId&card=:cardId', update);
  router.patch('/replace-card', replace);
  return router.routes();
};

export default CardController;
