import { defineConfig } from 'vite';
import Plugins from './presets/index';
const { resolve } = require('path')

export default defineConfig({
	plugins: [Plugins()],
	build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'),
					mock: resolve(__dirname, './mock/mockPage/index.html'),
				},
			},
	},
	server: {
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //host: 'localhost',  // 指定服务器主机名
    port: 8888, // 指定服务器端口
    proxy: { // 为开发服务器配置自定义代理规则
      '/snow': { // 匹配请求路径，localhost:3000/snow
        target: 'https://www.snow.com/', // 代理的目标地址
        changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets
        // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
        // rewrite: (path) => path.replace(/^\/snow/, '') // 路径重写
      }
    }
  }
  // base: '/vite-tp/'
});
