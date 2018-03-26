import Koa from 'koa';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import { publicRoutes, privateRoutes } from './controllers';
import exceptionHandlerMiddleware from './core/middlewares/exception-handler.middleware';

const app = new Koa();
const bodyParser = convert(KoaBody());

app.use(bodyParser);

app.use(exceptionHandlerMiddleware);

app.use(publicRoutes());
app.use(privateRoutes());
app.listen(3001);

