const loaderMerge = require('neutrino-middleware-loader-merge');
const react = require('neutrino-preset-react');

const cssLoader = require.resolve('css-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');

const lint = require('./lint');
const extractStyles = require('./extractStyles');
const jest = require('./jest');

const CLASS_LOCAL_IDENT_NAME = '[path]___[name]__[local]___[hash:base64:5]';


function setupSassModule(neutrino) {
  const config = neutrino.options.config;
  const sassOptions = {
    sourceMap: true
  };

  if (config && config.resolve && config.resolve.modules) {
    sassOptions.includePaths = config.resolve.modules;
  }

  neutrino.config.module
    .rule('scss')
    .test(/\.scss$/)
    .use('style')
      .loader(styleLoader)
      .end()
    .use('css')
      .loader(cssLoader)
      .options({
        modules: true,
        sourceMap: true,
        localIdentName: CLASS_LOCAL_IDENT_NAME
      })
      .end()
    .use('sass')
      .loader(sassLoader)
    .options(sassOptions);
}


function setupCssModule(neutrino) {
  neutrino.use(loaderMerge('style', 'css'), {
    modules: true,
    sourceMap: true,
    localIdentName: CLASS_LOCAL_IDENT_NAME
  });
}

module.exports = (neutrino, options = {}) => {
  // load presets
  neutrino.use(lint);
  neutrino.use(react);
  neutrino.options.tests = 'src';  // TODO: refactor code to remove this hack
  neutrino.use(jest, options.jest);
  // config presets
  setupCssModule(neutrino);
  setupSassModule(neutrino);
  if ( process.env.NODE_ENV === 'production') {
    neutrino.use(extractStyles, options.extractStyles);
  }
};
