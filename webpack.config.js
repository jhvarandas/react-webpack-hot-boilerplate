// --------------------------
// Requires
// --------------------------
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// ---------------------------
// Plugin configs
// ---------------------------
// erases dist folder on each build
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);
// copies specified folder
const CopyWebpackPluginConfig = new CopyWebpackPlugin([{
	from: 'folder/to/copy/from',
	to: 'destination/folder/inside/dist'
}]);
//html copy & inject
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
//browser sync config
const BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://localhost:8080/',
    // server: {
    //     baseDir: ['dist']
    // }
}, { reload:true });
// SCSS COMPILER
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",    
    },
    { allChunks: true }
);

// ---------------------------
// Exports
// ---------------------------
module.exports = {
    entry: {
        main: ['./src/assets/js/app.js', './src/assets/scss/app.scss']
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
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: [".js", ".jsx", ".scss", ".css", ".html"]
    },
    // modules
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
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
        new webpack.HotModuleReplacementPlugin(),
        //CopyWebpackPluginConfig,
        BrowserSyncPluginConfig
    ]
}