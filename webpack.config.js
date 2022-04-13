/* eslint-disable no-undef */
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // 自动清除沉余js
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 插件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 打包静态资源

module.exports ={
    'entry':{index:'./src/index.ts', face:'./src/face.ts'}, // 入口文件
    'output': {
        'filename': 'js/[name].min.js', // 默认为main.js  [hash]是为了避免js缓存
        'path': path.resolve(__dirname, './dist'), // path为绝对路径，用node path模块转化
        library: 'Face',
        libraryExport: "default",
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    'resolve': {
        'extensions': ['.tsx', '.ts', '.js']
    },
    'module': { // 加载 css less
        'rules': [{
            'test': /\.css$/, // js 中 require css
            'use': ['style-loader', 'css-loader']
        },
        {
            'test': /\.less$/,
            // 注意顺序
            'use': ['style-loader', 'css-loader', 'stylus-loader']
        },
        {
            'test': /\.m?js$/,
            'exclude': /(node_modules|bower_components)/,
            'use': {
                'loader': 'babel-loader',
                'options': {
                    'presets': ['@babel/preset-env'],
                    'plugins': [ // es6 内置函数转换
                        '@babel/plugin-transform-runtime'
                    ]
                }
            }
        },
        {
            'test': /\.(png|jpe?g|gif|m4a)$/, // 加载js img 对象、css 中的图片、音频等资源
            'use': [{
                'loader': 'url-loader',
                'options': {
                    // 图片大小小于等于limit值，则会以base64形式加载，不会发请求，大于这个值则用file-loader加载
                    'limit': 200 * 1024
                }
            }]
        },
        // {
        //     'test': /\.html$/, // 加载 img 标签中的图片
        //     'use': [{
        //         'loader': 'html-withimg-loader',
        //         'options': {}
        //     }]
        // },
        {
            'test': /\.tsx?$/,
            'use': [{
                'loader': 'ts-loader',
                'options': {
                    // 指定特定的ts编译配置，为了区分脚本的ts配置
                    'configFile': path.resolve(__dirname, './tsconfig.json')
                }
            }],
            'exclude': /node_modules/
        }
        ]
    },
    'plugins':[
        new HtmlWebpackPlugin({
            'filename':'index.html',
            'template':'./public/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            'from': __dirname + '/static', // 打包的静态资源目录地址
            'to': './static' // 打包到dist下面
        }])
    ],
    // 控制台信息
    'devServer': { // 开发服务器配置
        'host':'0.0.0.0',
        'port': 3000, // 端口号
        'progress': true, // 进度条
        'https': false,
        // 'contentBase': './static', // 服务默认指向文件夹
        'inline': true, // 设置为true，当源文件改变的时候会自动刷新
        'historyApiFallback': true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        'hot': false, // 允许热加载  和inline不能同时 是true
        'open': true, // 自动打开浏览器
        'disableHostCheck': true, // 外网映射
        // 'stats': 'errors-only',
        onListening(server) {
            const port = server.listeningApp.address().port

            console.log('\033[33m启动成功！ 端口:', JSON.stringify(port))
        },
    }
}