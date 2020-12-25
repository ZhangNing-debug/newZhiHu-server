/**
 * 第三方登录相关
 * @author: XiaoNing
 * @since:  2020/05/14
 * @update: 2020/05/14
 */
const axios = require('axios')
const Router = require('koa-router')
const router = new Router({
  prefix: '/oauth',
})

router.post('/githubInfo', async (ctx: any) => {
  try {
    const { client_id, client_secret, code } = ctx.request.body
    let param = {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      // redirect_uri: githubConfig.redirect_uri,
    }
    function getToken() {
      return new Promise((resolve, reject) => {
        axios
          .post('https://github.com/login/oauth/access_token', param)
          .then((data) => {
            resolve(data.data)
          })
          .catch((e) => {
            reject(e)
          })
      })
    }
    function getUserInfo(url: any) {
      return new Promise((resolve, reject) => {
        try {
          axios
          .get(`https://api.github.com/user?${url}`)
          .then((data) => {
            resolve(data)
          })
          .catch((e) => {
            reject(e)
          })
        } catch (e) {
          reject(e)
        }
      })
    }
    let firstPromise = await getToken()
    console.log('info', firstPromise)
    let result:any = await getUserInfo(firstPromise)
    // console.log('info', result)
    ctx.status = 200;
    ctx.body = {token:firstPromise,info:result.data};
  } catch (error) {
    console.log('error',error)
    // ctx.throw(400, error.message);
    ctx.status = 401;
    ctx.body = {message:'code过期'};
  }
})

export default router

// import { resolve } from 'bluebird'
// import { log } from 'util'
// import moment from "moment";
// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const User = require('../models/users')
// const User = require('../../models/users')
// 		Client ID
// 05836262c1c99fc6f393
// Client Secret
// 00910bfbdfdbcfc8301fb9f93342469b2328b0de
