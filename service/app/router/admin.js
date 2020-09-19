module.exports = app => {
    const { router, controller } = app;
    router.get('/api/admin/index', controller.admin.main.index);
}