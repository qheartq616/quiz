// vue.config.js
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    // https: true, // 链接是否使用https访问 但可能在微信中不能打开（安全性问题） 不写此行配置默认 使用http协议打开
    host: '127.0.0.1',
    port: '3000', 	// 指定要监听请求的端口号
    open: true, 	  // 是否运行好直接在默认浏览器打开
    hot: true,		  // 用于设置代码保存时是否进行热更新（局部刷新，不刷新整个页面）

    /* 接口代理器设置 可以配置多个*/
    proxy: {
      '/QQMusicApi': {
        target: 'http://localhost:3300',                   // 实际访问的服务器地址
        secure: false,                // 如果是https接口，需要配置这个参数
        changeOrigin: true,           // 是否跨域
        ws: false,                    // 是否启用websockets
        pathRewrite: { '/QQMusicApi': '' }, // 重写请求路径  开头是/api的替换为 空串
      },
    },
  },
};
