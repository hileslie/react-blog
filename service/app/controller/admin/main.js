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

    async addArticle() {
        let tmp = this.ctx.request.body;
        const res = await this.app.mysql.insert('article', tmp);
        const insertSuccess = res.affectedRows === 1;
        const insertId = res.insertId;
        this.ctx.body = {
            success: insertSuccess,
            insertId,
        }
    }

    async updateArticle() {
        let tmp = this.ctx.request.body;
        const res = await this.app.mysql.update('article', tmp);
        const updateSuccess = res.affectedRows === 1;
        this.ctx.body = {
            success: updateSuccess,
        }
    }

    async getArticleList() {
        let sql =
        "SELECT article.id as id ," +
        "article.title as title ," +
        "article.introduce as introduce ," +
        "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time ," +
        "article.view_count as view_count ," +
        "type.type_name as type_name " +
        "FROM article LEFT JOIN type ON article.type_id = type.Id " + 
        "ORDER BY article.id DESC";

        const res = await this.app.mysql.query(sql);
        this.ctx.body = {
            list: res
        }
    }

    async delArticle() {
        let id = this.ctx.request.body.id;
        const res = await this.app.mysql.delete('article', {'id': id})
        this.ctx.body = {
            data: res,
        }
    }
}

module.exports = MainController;