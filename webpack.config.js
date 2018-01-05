const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']); 
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
//const cssOutput = new ExtractTextPlugin('../stylesheets/style.css', { allChunks: true });
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",    
    },
    { allChunks: true }
);

module.exports = {
    entry: {
        app: './src/assets/js/app.js',
        main : './src/assets/scss/app.scss'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    
    // modules
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    // PLUGINS
    plugins: [
        CleanWebpackPluginConfig,
        HtmlWebpackPluginConfig,
        extractSass,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}