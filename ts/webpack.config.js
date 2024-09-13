const
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyPlugin = require("copy-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    OverwolfPlugin = require('./overwolf.webpack'),
    webpack = require('webpack');
    ;

module.exports = env => ({
    entry: {
        background: './src/background/background.ts',
        list: './src/front/list/list.ts',
        upload: './src/front/upload/upload.ts',
        desktop: './src/front/desktop/desktop.ts',
        in_game: './src/front/in_game/in_game.ts',  
        main: './src/js/main.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                    postcssOptions: {
                        plugins: () => [
                        require('autoprefixer')
                        ]
                    }
                    }
                },
                {
                    loader: 'sass-loader'
                }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'js/[name].js'
    },
    plugins: [
        new CleanWebpackPlugin,
        new CopyPlugin({
            patterns: [ { from: "public", to: "./" } ],
        }),
        new HtmlWebpackPlugin({
            template: './src/background/background.html',
            filename: path.resolve(__dirname, './dist/background.html'),
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            template: './src/front/list/list.html',
            filename: path.resolve(__dirname, './dist/list.html'),
            chunks: ['list']
        }),
        new HtmlWebpackPlugin({
            template: './src/front/upload/upload.html',
            filename: path.resolve(__dirname, './dist/upload.html'),
            chunks: ['upload']
        }),
        new HtmlWebpackPlugin({
            template: './src/front/desktop/desktop.html',
            filename: path.resolve(__dirname, './dist/desktop.html'),
            chunks: ['desktop']
        }),
        new HtmlWebpackPlugin({
            template: './src/front/in_game/in_game.html',
            filename: path.resolve(__dirname, './dist/in_game.html'),
            chunks: ['in_game']
        }),
        new OverwolfPlugin(env),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
})
