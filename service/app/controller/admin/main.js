"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
    async index() {
        this.ctx.body = 'xxxxx'
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = 'SELECT user_name FROM admin_user WHERE user_name = "' + userName + '" AND password = "' + password + '"';
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            let openId = new Date().getTime();
            this.ctx.session.openId = openId;
            this.ctx.body = {
                data: '登陆成功',
                openId,
            }
        } else {
            this.ctx.body = {
                data: '登陆失败',
            }
        }
    }

    async getTypeInfo() {
        const res = await this.app.mysql.select('type');
        this.ctx.body = {
            data: res,
        }
    }
}

module.exports = MainController;