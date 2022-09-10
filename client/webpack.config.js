const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
                // reverse order
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Contact Cards'
        }),
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',

            // dont precache images
            exclude: [/\.(?:png|jpg|jpeg|svg|gif)/i],

            // runtime caching means we aren't stuffing everything into the cache on startup
            // instead, as the user interacts with the website (online), things will be cached as they come up
        }),
        new WebpackPwaManifest({
            name: 'Contact Cards',
            short_name: 'Contact Cards',
            description: 'Keep track of contacts!',
            background_color: '#7eb4e2',
            theme_color: '#7eb4e2',
            start_url: './',
            publicPath: './',
            icons: [
                {
                    src: path.resolve('src/images/icon-manifest.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons')
                },
                {
                    src: path.resolve('src/images/icon-manifest.png'),
                    size: '1024x1024',
                    destination: path.join('assets', 'icons'),
                    purpose: 'maskable'
                }
            ]
        })
    ]
};