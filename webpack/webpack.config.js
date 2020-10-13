const path = require("path");
const pathIndex = path.resolve(__dirname, '../src/index');
const pathOut = path.resolve(__dirname, '../dist')
const progressBar = require("progress-bar-webpack-plugin");
console.log(pathIndex);
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
                    use: 'ts-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
        plugins: [
            progressBar()
        ]
    };
}
