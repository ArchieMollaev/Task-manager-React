import Router from 'koa-router';
import jwt from 'koa-jwt';
import UserController from './user.controller';
import ColumnController from './column.controller';
import CardController from './card.controller';

export const publicRoutes = () => {
  const publicRouter = Router();
  publicRouter.use(UserController());
  return publicRouter.routes();
};

export const privateRoutes = () => {
  const privateRouter = Router();
  privateRouter.use(jwt({ secret: 'secret_word', key: 'auth' }));
  privateRouter.use(ColumnController());
  privateRouter.use(CardController());
  return privateRouter.routes();
};
