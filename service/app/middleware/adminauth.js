module.exports = option => {
    return async function adminauth(ctx, next) {
        console.log(ctx.session.openId)
        if (ctx.session.openId) {
            await next()
        } else {
            ctx.body ={
                data: '未登录',
            }
        }
    }
}