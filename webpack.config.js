const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (_env, argv) => {
    const config = {
        entry: "./src/index.tsx",
        output: {
            path: resolve('build'),
            filename: "[name].js",
            publicPath: argv.mode === "development" ? "/" : "/national-day-h5-2021",
        },
        module: {
            rules: [{
                test: /\.tsx$/,
                include: resolve("src"),
                use: "babel-loader"
            }, {
                test: /\.less$/,
                include: resolve("src"),
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }]
        },
        plugins: [new HtmlWebpackPlugin({
            template: "./template/index.html"
        })],
        resolve: {
            extensions: [".tsx", ".js"]
        },
        devtool: argv.mode === "development" ? "eval-source-map" : "source-map",
        devServer: {
            host: "0.0.0.0",
            port: 3000,
            open: true,
            useLocalIp: true,
        }
    }
    return config;
}