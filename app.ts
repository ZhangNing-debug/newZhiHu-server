/**
 * 链接数据库相关
 * @author: XiaoNing
 * @since:  2020/05/04
 * @update: 2020/05/04
 */
/***
 *  佛曰:
 *          写字楼里写字间，写字间里程序员；
 *          程序人员写程序，又拿程序换酒钱。
 *          酒醒只在网上坐，酒醉还来网下眠；
 *          酒醉酒醒日复日，网上网下年复年。
 *          但愿老死电脑间，不愿鞠躬老板前；
 *          奔驰宝马贵者趣，公交自行程序员。
 *          别人笑我忒疯癫，我笑自己命太贱；
 *          不见满街漂亮妹，哪个归得程序员？
 */

import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import v1 from './app/service';
const app = new Koa();
// Express configuration
// 链接mongodb
mongoose.connect('mongodb://localhost:27017/zhihu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('open', function (err: Error) {
  if (err) {
    console.log('数据库连接失败')
    throw err
  }
  console.log('数据库连接成功')
})
db.on('error', (err:Error) => {
  console.log(err);
});
db.once('connected', () => {
  console.log('Mongo connected');
  app.emit('ready');
});
db.on('reconnected', () => {
  console.log('Mongo re-connected');
});
db.on('disconnected', () => {
  console.log('Mongo disconnected');
});
app.use(bodyParser())
app.use(cors({
  origin: '*',
  allowMethods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ], // 设置所允许的 HTTP请求方法
  allowHeaders: ['Content-Type', 'Accept'],
  credentials: true, // 标示该响应是合法的
}));
app.use(v1.routes());
export default app
