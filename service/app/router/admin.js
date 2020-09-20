module.exports = app => {
    const { router, controller, middleware } = app;
    const adminauth = middleware.adminauth();
    router.get('/api/admin/index', controller.admin.main.index);
    router.post('/api/admin/checkLogin', controller.admin.main.checkLogin);
    router.get('/api/admin/type', adminauth, controller.admin.main.getTypeInfo);
    router.post('/api/admin/article/add', adminauth, controller.admin.main.addArticle);
    router.post('/api/admin/article/update', adminauth, controller.admin.main.updateArticle);
    router.get('/api/admin/article/list', adminauth, controller.admin.main.getArticleList);
    router.post('/api/admin/article/del', adminauth, controller.admin.main.delArticle);
    router.get('/api/admin/article/:id', adminauth, controller.admin.main.getArticleById);
}