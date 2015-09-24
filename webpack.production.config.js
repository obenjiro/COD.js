var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');

module.exports = {
    entry: {
        javascript: "./public/src/app.js",
        html: "./public/src/index.html",
    },
    output: {
        path: __dirname + '/public/build',
        filename: '/bundle.js'
    },
    module: {
        loaders:
        [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?sourceMaps=true'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]!html-minify"
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ],
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: false
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('/bundle.css'),
        new webpack.optimize.UglifyJsPlugin()
    ],
    'html-minify-loader': {
        comments: true,
        quotes: true
    }
};
