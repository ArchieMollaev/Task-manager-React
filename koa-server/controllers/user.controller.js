import Router from 'koa-router';
import jwt from 'koa-jwt';
import UserService from '../services/user.service';

const signup = async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await UserService.createNewUser(data);
};

const login = async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await UserService.login(data);
};

const validateLogin = async (ctx) => {
  const data = ctx.request.body;
  const status = await UserService.validateLogin(data);
  ctx.body = { status };
};

const getData = async (ctx) => {
  const token = ctx.request.header.authorization;
  ctx.body = await UserService.getData(token);
};

const UserController = () => {
  const router = Router();
  router.post('/signup', signup);
  router.post('/login', login);
  router.post('/validate-login', validateLogin);
  router.get('/get-data', jwt({ secret: 'secret_word' }), getData);
  return router.routes();
};

export default UserController;
