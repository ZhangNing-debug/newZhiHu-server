/**
 * 用户
 * @author: XiaoNing
 * @since:  2020/06/05
 * @update: 2020/06/05
 */
import express from "express";
import crypto from "crypto";
const {
    find,
    findById,
    create,
    checkOwner,
    update,
    delete:del,
    login,
  } = require("../api/users");
// import moment from "moment";
const router = express.Router();


router.get("/", find);// 获取用户列表

router.post("/", create);// 创建用户（需要jwt认证）
// router.post("/", create);// 创建用户（需要jwt认证）
// 

router.get("/:id", findById);// 获取特定用户

router.patch("/:id", update);// 更新用户信息（需要jwt认证和验证操作用户身份）

// router.delete("/:id", checkOwner, del);// 删除用户（需要jwt认证和验证操作用户身份）
// del
router.delete("/:id",del);// 删除用户（需要jwt认证和验证操作用户身份）

router.post("/login", login);// 用户登录

module.exports = router;