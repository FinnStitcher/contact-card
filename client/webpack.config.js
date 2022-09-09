const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

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
            title: 'Webpack Plugin'
        }),
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',

            // dont precache images
            exclude: [/\.(?:png|jpg|jpeg|svg|gif)/i],

            // runtime caching means we aren't stuffing everything into the cache on startup
            // instead, as the user interacts with the website (online), things will be cached as they come up
            // runtimeCaching: [{
            //     urlPattern: /\.(?:png|jpg|jpeg|svg|gif)/i,
            //     // will attempt to get stuff from the cache before contacting the network
            //     handler: 'CacheFirst',
            //     options: {
            //         cacheName: 'images',
            //         expiration: {
            //             maxEntries: 1
            //         }
            //     }
            // }]
        })
    ]
};