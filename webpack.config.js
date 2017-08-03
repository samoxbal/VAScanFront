const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? 'source-map' : 'eval',
    entry: !isProduction ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3002',
        'webpack/hot/only-dev-server',
        './src/index'
    ] : [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {   test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        { loader: 'postcss-loader' }
                    ]
                }),
                include: path.join(__dirname, 'src')
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 3002,
        publicPath: '/static/',
        hot: true,
        historyApiFallback: true,
        inline: true,
        proxy: {
          "*": "http://localhost:3000"
        }
    }
};
