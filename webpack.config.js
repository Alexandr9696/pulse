const path = require('path'); // встроенный модуль webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        // для оптимизации, чтобы не грузились лишнии файлы(библиотеки)
        // например мы подключаем jquery в двух файлах и чтобы она не загрузилась дважды
        // мы пишем эту нстройку
        // файлы c vendors появляются из-за этого
        splitChunks: {
            chunks: "all"
        }
    };
    // минификация всех файлов при продашн сборке
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
                canPrint: true
            }),
            new TerserWebpackPlugin()
        ]
    }

    return config
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ];

    if (extra) {
        loaders.push(extra)
    }

    return loaders
};


module.exports = {
    // абсолютный путь
    context: path.resolve(__dirname, 'src'),
    // сборка по умолчанию
    mode: "development",
    // входные файлы
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    // выход
    output: {
        // название файлы
        filename: filename('js'),
        // путь (__dirname - текущая директория)
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // какие расширения webpack должен принимать по умолчанию
        extensions: ['.js', '.json', '.png'],
        // для сокращения путей
        alias: {
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    optimization: optimization(),

    devtool: isDev ? 'source-map' : '',
    plugins: [
        // добавление html файла
        new HtmlWebpackPlugin({
            template: "./index.html",
            // минифицирование файла html
            minify: {
                collapseWhitespace: isProd
            }
        }),
        // очистка предыдущих файлов в сборке
        new CleanWebpackPlugin(),
        // копирования файлов в dist
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
                force: true,
            }
        ]
),
        // создание css файла в dist
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        // подключение jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        // new FaviconsWebpackPlugin({
        //     logo: 'favicon.ico'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            // как только webpack встречает файлы с расширением css ему нужно использовать данные лоадоры
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            // работа с изображениями
            {
                test: /\.(png|jpg|svg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "img",
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
            // работа с шрифтами
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: "font",
                        useRelativePath: true}
                }]
            },
            // работы с xml файлами
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            // работа c csv файлами
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            // подключение babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    }
};