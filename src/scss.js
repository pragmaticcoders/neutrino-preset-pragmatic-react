const loaderMerge = require('neutrino-middleware-loader-merge');

const cssLoader = require.resolve('css-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');
const urlLoader = require.resolve('resolve-url-loader');

const DEV = process.env.NODE_ENV !== 'production';

let CLASS_LOCAL_IDENT_NAME = '[path]___[name]__[local]___[hash:base64:5]';
if (DEV) {
  CLASS_LOCAL_IDENT_NAME = '[path]___[name]__[local]';
}


function getCssOptions(options) {
  return Object.assign({
    modules: true,
    sourceMap: true,
    localIdentName: CLASS_LOCAL_IDENT_NAME
  }, options);
}


function sassModule(neutrino, options = { css: {}, scss: {} }) {
  const config = neutrino.options.config;

  const sassOptions = Object.assign({
    sourceMap: true
  }, options.scss);
  if (config && config.resolve && config.resolve.modules) {
    sassOptions.includePaths = config.resolve.modules;
  }

  const cssOptions = getCssOptions(options.css);

  neutrino.config.module
    .rule('scss')
    .test(/\.scss$/)
    .use('style')
      .loader(styleLoader)
      .end()
    .use('css')
      .loader(cssLoader)
      .options(cssOptions)
      .end()
    .use('url-loader')
      .loader(urlLoader)
      .end()
    .use('sass')
      .loader(sassLoader)
      .options(sassOptions)
  ;
}


function cssModule(neutrino, options = {}) {
  neutrino.use(loaderMerge('style', 'css'), getCssOptions(options));
}

module.exports = (neutrino, options = {}) => {
  neutrino.use(sassModule, options);
  neutrino.use(cssModule, options.css);
};
