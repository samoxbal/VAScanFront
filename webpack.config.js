const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? 'source-map' : 'eval',
    entry: {
        app: !isProduction ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3002',
            'webpack/hot/only-dev-server',
            './src/index'
        ] : [
            './src/index'
        ],
        vendor: [
            'history',
            'material-ui',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-tap-event-plugin',
            'redux'
        ]
    },
    output: {
        path: path.join(__dirname, '.build'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new ProgressBarPlugin()
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
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }),
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
