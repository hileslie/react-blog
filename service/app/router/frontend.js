module.exports = app => {
    const { router, controller } = app;
    router.get('/frontend/index', controller.frontend.home.index);
    router.get('/frontend/get/article/list', controller.frontend.home.getArticleList);
    router.get('/frontend/get/article/detail/:id', controller.frontend.home.getArticleById);
}