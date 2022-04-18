# React Project

React framework front-end project template

### 项目结构

```bash
|-[react-project]               [root 根目录]
    |-[mock]                    [mock server]
        |-[demo]                [多级目录]
            |- user.js          API配置文件
        |- app.js               API配置文件
    |-[node_modules]            [npm 包管理]
    |-[sciprts]                 [前端工程化配置]
        |- utils.js             工程化常量、工具
		|- webpack.base.js      webpack公共配置
		|- webpack.dev.js       webpack 开发模式配置
		|- webpack.prod.js      webpack 生产模式配置
    |-[src]                     [Source Code]
        |- [assets]             [静态资源]
        |- [commons]            [通用工具、方法]
            |- [http]           [拦截器，请求方法封装]
            |- history.js       history的封装，API看下方
        |- [components]         [公共基础组件，不具备业务行为]
            |-[button]          [组件目录]
                |- index.js     组件配置导出文件
                |- style.less   样式文件
        |- [containers]         [页面管理]
            |-[dashboard]       [dashboard页面]
                |- index.js     页面配置导出文件
                |- style.less   样式文件
        |- [routers]            [路由配置]
            |- index.js         路由配置导出文件
            |- style.less       样式文件
        |- app.js               入口配置文件
        |- index.html           入口静态页面
   |- .babelrc
   |- .gitignore
   |- .proxyconfig              webpack-dev-server.proxy配置
   |- .editorconfig
   |- package.json
   |- README.md
   ...
```

### 安装使用
> 开发环境区分真实联调和本地mock server工作模式，mock相关API配置查看根目录下的/mock目录

#### 开发环境
```bash
# 安装依赖
npm install

# 启动项目
npm start
# or
npm run mock

# 访问路径 http://0.0.0.0:8000
```

#### 生产环境
```bash
# 安装项目依赖
npm install

# 构建项目(client)
npm run build
```

### history

没有封装`history`本身的API，只是根据不通环境调用了不同的方法
```js
/*-------------------@commons/history.js------------------*/

// 开发/生产环境
export default const history = createBrowserHistory()

/*----------------------引入使用-----------------------------*/

// 使用
import history from '@commons/history';

// push
history.push('/path/xxx', state)

// replace
history.replace('/path/xxx', state)

// goBack
history.goBack()
