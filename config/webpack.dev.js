const path = require('path');

module.exports = {
    // 3 basic parameters: entry, mode, output
    entry: {
        // can use an array and webpack will concatenate the files
        // best practice is to only use the polyfill you'll need to reduce bundle size
        //'babel-polyfill' includes all
        //below includes only promises
        //main: [ 'core-js/fn/promise', './src/main.js' ] -> only pormises
        main: [ './src/main.js' ]
    },
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devServer: {
        // devserver runs out of the dist directory
        contentBase: 'dist',
        // shows error in browser window
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                //regular expression that looks for specified files 
                test: /\.css$/,
                //loaders to be used, stored in object since they can be configured with additional parameters
                //they run from last to first
                use: [
                    {   
                        //injects linted file into html
                        loader: 'style-loader'
                    },
                    {
                        //lints the css file
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        //defines how the extracted file will be named
                        loader: 'file-loader',
                        options: {
                            name: "[name].html"
                        }
                    },
                    {
                        //extracts to seperate file instead of bundling
                        loader: 'extract-loader'
                    },
                    {
                        //lints html file
                        loader: 'html-loader',
                        options: {
                            //targets the src attribute in img
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "images/[name].[ext]"
                            //name: "images/[name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    }

}