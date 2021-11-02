const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const app = new Koa()

app.use(static(__dirname + '/public'))
const render = views(__dirname + '/public', { extension: 'html'})
app.context.render = render()

app.use(async ctx => {
    await ctx.render('index.html')
})

app.listen(3008, () => console.log('app is listening on port 3008'))