"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, home";
  }

  async getArticleList() {
    const { ctx, app } = this;
    let sql =
      "SELECT article.id as id ," +
      "article.title as title ," +
      "article.introduce as introduce ," +
      "article.add_time as add_time ," +
      "article.view_count as view_count ," +
      "type.type_name as type_name " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id";

    const resluts = await app.mysql.query(sql);
    ctx.body = {
      data: resluts,
    };
  }
}

module.exports = HomeController;