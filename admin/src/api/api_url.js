let url = 'http://127.0.0.1:7001/api/admin/';
let servicePath = {
    checkLogin: url + 'checkLogin',
    getTypeInfo: url + 'type',
    addArticle: url + 'article/add',
    updateArticle: url + 'article/update',
    getArticleList: url + 'article/list',
    delArticle: url + 'article/del',
    getArticleById: url + 'article/'
}

export default servicePath;