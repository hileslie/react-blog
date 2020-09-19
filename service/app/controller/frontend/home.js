"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  // 首页文章列表
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

  // 根据文章id获取文章详情
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

  // 文章类型（菜单）
  async getTypeInfo() {
    const reslut = await this.app.mysql.select("type");
    this.ctx.body = { data: reslut };
  }

  // 根据文章类型获取文章列表
  async getArticleListById() {
	let id = this.ctx.params.id;
	let sql =
		"SELECT article.id as id ," +
		"article.title as title ," +
		"article.introduce as introduce ," +
		"FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time ," +
		"article.view_count as view_count ," +
		"type.type_name as type_name " +
		"FROM article LEFT JOIN type ON article.type_id = type.Id " + 
		"WHERE type_id=" + id;

	const resluts = await this.app.mysql.query(sql);
	this.ctx.body = {
		data: resluts,
	};
  }
}

module.exports = HomeController;
