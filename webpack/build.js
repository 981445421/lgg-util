const webpack = require('webpack');
const config = require('./webpack.config');
const Compiler = webpack(config("production"));
Compiler.run(function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.message) {
            console.error(err.message);
        }
        return;
    }
    if (err || stats.hasErrors()) {
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
        }));
        return console.error("打包出现错误")
    }
})
