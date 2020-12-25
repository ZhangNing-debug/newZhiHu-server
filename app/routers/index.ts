/**
 * 主要
 * @author: XiaoNing
 * @since:  2020/05/04
 * @update: 2020/05/04
 */
import express from "express";
import crypto from "crypto";
// import moment from "moment";
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
// const User = require('../models/users')
// const User = require('../models/users')

const router = express.Router();
module.exports = (app: { use: (arg0: string, arg1: any) => void }) => {
    // import express = require('express');

    router.get('/login', function (req: any, res: { render: (arg0: string) => void; }) {
        res.render('login');
    });
    router.get('/register', function (req: any, res: { render: (arg0: string) => void; }) {
        res.render('register');
    });

    app.use('/index/api', router)
}