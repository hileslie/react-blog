module.exports = app => {
    const { router, controller } = app;
    const adminauth = app.middleware.adminauth();
    router.get('/api/admin/index', controller.admin.main.index);
    router.post('/api/admin/checkLogin', controller.admin.main.checkLogin);
}