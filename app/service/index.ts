// const Router = require('koa-router');
import Router from 'koa-router';
import oauth from './oauth/routes';
import user from './users/routes';
// const oauth = require('./oauth/routes');
// const user = require('./users/routes');
const v1 = new Router({
  prefix: '/v1',
});

v1.use(oauth.routes());
v1.use(user.routes());

// console.log(v1)
export default v1;
