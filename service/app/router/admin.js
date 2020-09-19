module.exports = app => {
    const { router, controller, middleware } = app;
    const adminauth = middleware.adminauth();
    router.get('/api/admin/index', controller.admin.main.index);
    router.post('/api/admin/checkLogin', controller.admin.main.checkLogin);
    router.get('/api/admin/type', adminauth, controller.admin.main.getTypeInfo);
}