const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const rtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );

const entry = defaultConfig.entry();
entry.index =  path.resolve( `${ process.env.WP_SRC_DIRECTORY }/index.js` );

const reactConfig = {
    ...defaultConfig,
    entry,
    plugins: [
        ...defaultConfig.plugins,
        new rtlCssPlugin( {filename: `[name]-rtl.css`} ),
    ],
};

const assetsConfig = {
    ...defaultConfig,
    entry: {
        'admin': ['./assets/src/js/admin.js', './assets/src/css/admin.css'],
        //'cartick': ['./assets/src/js/cartick.js', './assets/src/css/cartick.scss']
    },
    output: {
        ...defaultConfig.output,
        filename: './js/[name].js',
        path: path.resolve( process.cwd(), 'assets/dist' ),
    },
    module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            {
                                                // Options
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            ],
        },

    plugins: [
        new MiniCSSExtractPlugin(
            {
                filename: "./css/[name].css"
            }
        ),
    ],
}

module.exports = [reactConfig, assetsConfig];