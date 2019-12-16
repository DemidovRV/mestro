
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
        },
module: {
    rules: [{ 
        test: /\.js$/, 
        use: { loader: "babel-loader" }, 
        exclude: /node_modules/ 
            },
            {
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};