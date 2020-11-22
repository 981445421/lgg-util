const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const pathIndex = path.resolve(__dirname, '../src/index.ts');
const pathOut = path.resolve(__dirname, '../lgg-util')
const progressBar = require("progress-bar-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = function (mode) {
    return {
        entry: pathIndex,
        output: {
            path: pathOut,
            filename: 'index.js',
            libraryTarget: 'umd',
            globalObject: "this",
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".js"]
        },
        mode: mode === "development" ? "development" : "production",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {targets: "> 0.25%"}]],
                                plugins: ["@babel/plugin-transform-arrow-functions"],
                            }
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
                ,
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {targets: "> 0.25%"}]],
                                plugins: ["@babel/plugin-transform-arrow-functions"],
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            progressBar(),
            new CopyPlugin({
                patterns: [
                    {from: 'package1.json', to: 'package.json'},
                ],
                options: {
                    concurrency: 100,
                },
            }),
            new CleanWebpackPlugin()
        ]
    };
}
