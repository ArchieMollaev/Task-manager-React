import Router from 'koa-router';
import jwt from 'koa-jwt';
import UserService from '../services/user.service';

const registration = async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await UserService.create(data);
};

const authorization = async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await UserService.authorization(data);
};

const validateLoginName = async (ctx) => {
  const data = ctx.request.body;
  const status = await UserService.validateLoginName(data);
  ctx.body = { status };
};

const getData = async (ctx) => {
  const { login } = ctx.state.auth;
  ctx.body = await UserService.getData(login);
};

const UserController = () => {
  const router = Router();
  router.post('/signup', registration);
  router.post('/login', authorization);
  router.post('/validate-login', validateLoginName);
  router.get('/get-data', jwt({ secret: 'secret_word', key: 'auth' }), getData);
  return router.routes();
};

export default UserController;
