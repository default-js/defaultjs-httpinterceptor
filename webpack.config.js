const path = require("path");
const webpack = require("webpack");
const project = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = (env, argv) => {
    const devMode = argv.mode == "development";

    return {
        entry: "./index.js",
        optimization: {
			minimize: !devMode,
			minimizer: [
				// https://webpack.js.org/plugins/terser-webpack-plugin/
				new TerserPlugin({
					parallel: true,
				})
			],
		},
        devtool: devMode ? "inline-source-map" : "source-map" ,
        devServer: {
            open: true,
			allowedHosts: "all",
			client: {
				overlay: true,
				progress: true,
				reconnect: true,
			},
            devMiddleware: {
				index: true,
				writeToDisk: false,
			},
			static: ["./WebContent"],
			watchFiles: { paths: ["src/**/*", "./WebContent"] },
        },
        output: {
            filename: devMode ? `${project.buildname}.js` : `${project.buildname}.min.js`,
            path: path.resolve(__dirname, "dist")
        },
        plugins: []
    };
};
