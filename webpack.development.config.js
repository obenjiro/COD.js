var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

module.exports = {
    entry: './public/src/app.js',
    output: {
        path: __dirname,
        filename: '/public/src/bundle.js'
    },
    devtool: 'eval-source-map',
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
                loader: 'style!css!postcss'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ]
};
