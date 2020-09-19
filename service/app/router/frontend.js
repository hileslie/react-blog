module.exports = app => {
    const { router, controller } = app;
    router.get('/api/article/list', controller.frontend.home.getArticleList);
    router.get('/api/article/detail/:id', controller.frontend.home.getArticleById);
    router.get('/api/type', controller.frontend.home.getTypeInfo);
}