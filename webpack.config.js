const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin= require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
let mode = "development";
let target = "web"; // this to fix a webpack bug, where if we change anything in css doesn't auto reflect(HMR) in browser.
const plugins =  [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
        template: "./src/index.html"
    })
];
if(process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
} 
if(process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}
module.exports = {
    mode: mode,
    target: target,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },

    module: {
        rules:[
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
            }, 
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        }
                    },
                    "css-loader", 
                    "postcss-loader", 
                    "sass-loader"
                ],
            },
            {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            }
        }
        ]
    },
    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx"]
    },

    devtool: "source-map",
    devServer: {
        contentBase: './dist',
        hot: true,
    }
}