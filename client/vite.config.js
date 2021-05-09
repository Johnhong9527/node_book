const path = require('path')
module.exports = {
  port: 8080,
  // 是否自动在浏览器打开
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
    // '/@components/': path.resolve(__dirname, './src/components')
  }
}