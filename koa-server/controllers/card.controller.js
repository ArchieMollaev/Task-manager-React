import Router from 'koa-router';
import CardService from '../services/card.service';

const createCard = async (ctx) => {
  const token = ctx.request.header.authorization;
  const data = ctx.request.body;
  ctx.body = await CardService.createCard(token, data);
};

const removeCard = async (ctx) => {
  const token = ctx.request.header.authorization;
  const data = ctx.request.body;
  ctx.body = await CardService.removeCard(token, data);
};

const CardController = () => {
  const router = Router();
  router.post('/create-card', createCard);
  router.post('/remove-card', removeCard);
  return router.routes();
};

export default CardController;
