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
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time ," +
      "article.view_count as view_count ," +
      "type.type_name as type_name " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id";

    const resluts = await app.mysql.query(sql);
    ctx.body = {
      data: resluts,
    };
  }

  async getArticleById() {
	let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id ," +
      "article.title as title ," +
      "article.introduce as introduce ," +
      "article.article_content as article_content ," +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time ," +
      "article.view_count as view_count ," +
      "type.type_name as type_name ," +
      "type.id as type_id " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;

	const reslut = await this.app.mysql.query(sql);
    this.ctx.body = { data: reslut };
  }
}

module.exports = HomeController;
