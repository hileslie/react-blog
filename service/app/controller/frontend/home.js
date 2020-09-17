'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let res = await this.app.mysql.get('blog_content', [])
    console.log(res)
    ctx.body = res;
  }
}

module.exports = HomeController;
