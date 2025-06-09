require("./src/server/env");
const path = require("path");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const { MODE, HTTP_RESOURCE_URL } = process.env;
const isProduction = MODE === "production" ? true : false;
const scriptPort = HTTP_RESOURCE_URL?.split(":")?.shift() || 3004;
let localPath = 'localhost';
const publicPath = isProduction ? `auto` : `http://${localPath}:${scriptPort}/`; //生产环境资源路径自动自动生成

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: {
        "mobile": path.resolve(__dirname, "./src/client/mobile/index.jsx"),
    },
    output: {
        filename: isProduction ? 'javascripts/[name].[contenthash:8].min.js' : 'javascripts/[name].js',
        path: path.resolve(__dirname, "./dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "./src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            }
        ]
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'script-manifest.json', // 生成的清单文件名
            publicPath: publicPath, // 输出文件的公共路径
            generate: function (seed, files, entries) {
                const generater = {};
                files.forEach(file => {
                    let relatedPath = file.path.substring(publicPath.length);
                    if (file.chunk && file.chunk.name && /^((?!\.map).)*$/.test(file.path)) {
                        let entry = file.chunk.name;
                        generater[entry] = generater[entry] || {};
                        if (/\.js/.test(file.path)) {
                            generater[entry]['script'] = generater[entry]['script'] || [];
                            generater[entry]['script'].push(relatedPath);
                        }
                        if (/\.css/.test(file.path)) {
                            generater[entry]['link'] = generater[entry]['link'] || [];
                            generater[entry]['link'].push(relatedPath);
                        }
                    } else {
                        generater['files'] = generater['files'] || []
                        generater['files'].push(relatedPath);
                    }
                })
                return generater
            },
        })
    ],
    devServer: isProduction ? undefined : {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        port: scriptPort,
        host: "localhost",
        hot: true, // 开启HDM
        historyApiFallback: true, // 解决404问题
    },
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@common": path.resolve(__dirname, "./src/common"),
            "@mobile": path.resolve(__dirname, "./src/client/mobile"),
        },
        // 自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"]
    },
}