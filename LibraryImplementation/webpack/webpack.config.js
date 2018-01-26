const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/out',
        filename: 'out.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
                // {output}/file.txt
            { from: 'src/main.js', to: 'main.js' },
            { from: 'src/content.js', to: 'content.js' },
            { from: 'src/manifest.json', to: 'manifest.json' },

        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    }
};
