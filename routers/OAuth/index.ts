/**
 * 第三方登录相关
 * @author: XiaoNing
 * @since:  2020/05/14
 * @update: 2020/05/14
 */
import express from 'express'
import crypto from 'crypto'
import axios from 'axios'
import { resolve } from 'bluebird'
import { log } from 'util'
// import moment from "moment";
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
// const User = require('../models/users')
const User = require('../../models/users')
const router = express.Router()
module.exports = (app: { use: (arg0: string, arg1: any) => void }) => {
  // 获取所有用户列表
  router.post('/github', function (req: any, res: any) {
    let githubConfig = {
      // 客户ID
      client_ID: '05836262c1c99fc6f393',
      // 客户密匙
      client_Secret: '00910bfbdfdbcfc8301fb9f93342469b2328b0de',
      // 获取 access_token
      // eg: https://github.com/login/oauth/access_token?client_id=7***************6&client_secret=4***************f&code=9dbc60118572de060db4&redirect_uri=http://manage.hgdqdev.cn/#/login
      access_token_url: 'https://github.com/login/oauth/access_token',
      // 获取用户信息
      // eg: https://api.github.com/user?access_token=86664b010dbb841a86d4ecc38dfeb8ac673b9430&scope=&token_type=bearer
      user_info_url: 'https://api.github.com/user?',
      // 回调地址
      redirect_uri: 'http://127.0.0.1:8080/oauth',
    }
    console.log(req.body)
    let param = {
      client_id: githubConfig.client_ID,
      client_secret: githubConfig.client_Secret,
      code: req.body.code,
      redirect_uri: githubConfig.redirect_uri,
    }
    function getToken() {
      return new Promise((resolve, reject) => {
        axios
          .post(githubConfig.access_token_url, param)
          .then((data) => {
            resolve(data.data)
          })
          .catch((e) => {
            res.json({
              message: e,
            })
          })
      })
    }
    function getUserInfo(url: any) {
      return axios
        .get(githubConfig.user_info_url + url)
        .then((data) => {
          res.status(200).json({
            message: data.data,
          })
          // res.redirect(301,'http://localhost:8080')
        })
        .catch((e) => {
          res.json({
            message: e,
          })
        })
    }
    async function showInfo() {
      let firstPromise = await getToken()
      await getUserInfo(firstPromise)
    }
    showInfo()
    // let a =  axios.post("https://github.com/login/oauth/access_token",{
    // "client_id":"05836262c1c99fc6f393",
    // "client_secret": "00910bfbdfdbcfc8301fb9f93342469b2328b0de",
    // "code":"177d48b8f7296e9f6334",
    // "redirect_uri":"http://127.0.0.1:8080/login"
    // }).then(data => {
    //   // res.json(data)
    //       // res.send(JSON.stringify({
    //       //                     msg: '获取成功',
    //       //                     status: 100,
    //       //                     data: JSON.parse("data")
    //       //                 }))
    //   // console.info(data)
    //   res.json(200,{
    //               message: data.data
    //   })
    //   // datas = data;

    // }).catch(e => {
    //       res.send(e)
    //   // console.info(e)
    // })
    // console.log(a)
    // res.send(a)
  })
  app.use('/api1.0/oauth', router)
}
// 		Client ID
// 05836262c1c99fc6f393
// Client Secret
// 00910bfbdfdbcfc8301fb9f93342469b2328b0de
