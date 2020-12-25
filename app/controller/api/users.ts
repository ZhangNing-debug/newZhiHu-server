import { any } from "bluebird";
import { log } from 'util';

// const User = require("../models/users");
import express from 'express'
import crypto from 'crypto'

const User = require('../models/users')
// const Question = require("../models/questions");
// const Answer = require("../models/answers");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config/config.json");
class UserController {
  async find(ctx:any) {
    // ctx.body = await User.find({}, function (err: any, data: any) {
    //     if (err) throw err
    //     // res.send(data)
    //   })
    ctx.body = User.find({}, function (err: any, data: any) {
      if (err) throw err
      ctx.res.send(data)
    })
  }
  async findById(ctx:any) {
    const user = await User.findById(ctx.params.id,(err:any,data:any)=>{
      if (data) {
        ctx.res.json({
          success: 200,
          message: '获取成功',
          data:data
        })
        // res.send('登录成功');
      } else {
        ctx.res.status(302).json({
          success: 302,
          message: 'ID错误',
        })
        // res.send('')
      }
    })
    console.log(user);
    
    // if (!user) {
    //   ctx.throw(404, "用户不存在");
    // }
    // ctx.body = user;
  }
  async create(ctx:any) {
    const { username,password } = ctx.query;
    const repeatedUser = await User.findOne({ username });
    if (repeatedUser) {
      // ctx.throw(409, "用户名已存在");
      ctx.res.json({
        success: 409,
        message: '用户名已存在',
      })
    }
    let md5 = crypto.createHash('SHA512')
    // 加密
    let newPas = md5.update(password).digest('hex')
    const user = await new User({
      username: username,
      password: newPas, // 将密码加密
    })
   // 保存到数据库
   User.create(user, function (err: any, data: any) {
    if (data) {
      ctx.res.json({
        success: 200,
        message: '注册成功',
        data:data
      })
    } else if(err){
      // ctx.res.status(302).json({
      //   success: 302,
      //   message: '账号重复',
      // })
    }
   })
    ctx.body = user;
  }
  async checkOwner(ctx:any, next:any) {
  console.log(ctx.params.id);
  // console.log(ctx);
  // console.log(ctx.state.user._id);
  
    // if (ctx.params.id !== ctx.state.user._id) {
    //   // ctx.throw(403, "没有权限");
    //   ctx.res.json({
    //     success: 403,
    //     message: '没有权限',
    //   })
    // }
    // await next();
  }
  async update(ctx:any) {
    const { username,password } = ctx.query;
    console.log(username,password);
    
    // ctx.verifyParams({
    //   name: { type: "string", required: false },
    //   password: { type: "string", required: false },
    //   avatar_url: { type: "string", required: false },
    //   gender: { type: "string", required: false },
    //   headline: { type: "string", required: false },
    //   locations: { type: "array", itemType: "string", required: false },
    //   business: { type: "string", required: false },
    //   employments: { type: "array", itemType: "object", required: false },
    //   educations: { type: "array", itemType: "object", required: false }
    // });
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx);
    
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.query);
    if (!user) {
      // ctx.throw(404, "用户不存在");
    }
    // ctx.body = user;
  }
  async delete(ctx:any) {
    console.log("注销")
    const user = await User.findByIdAndRemove(ctx.params.id,(err:any,data:any)=> {
      if (data) {
        ctx.res.json({
          success: 200,
          message: '删除成功',
        })
        // res.send('登录成功');
      } else {
        ctx.res.status(204).json({
          success: 204,
          message: 'ID错误',
        })
        // res.send('')
      }
    });
    // if (!user) {
    //   ctx.throw(404, "用户不存在");
    // }
    // ctx.status = 204;
  }
  async login(ctx:any) { // 登录
    const { username,password } = ctx.query;
    let SHA512 = crypto.createHash('SHA512')
    let newPas = SHA512.update(password).digest('hex')
    let postData = {
      username: username,
      password: newPas,
    }
    const user = await User.findOne(postData,(err:any,data:any)=>{
      if (data) {
        const { _id, username } = data;
        const token = jsonwebtoken.sign({ _id, username }, secret, { expiresIn: "1d" }); // 登录成功返回jwt加密后的token信息
        ctx.body = { token };
        ctx.res.json({
          success: 200,
          message: '登录成功',
          token:token,
          data:data
        })
      } else {
        ctx.res.status(302).json({
          success: 302,
          message: '账号或密码错误',
        })
      }
    });
  }
}

module.exports = new UserController();
