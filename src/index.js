const { join } = require('path');

const loaderMerge = require('neutrino-middleware-loader-merge');
const react = require('neutrino-preset-react');
const jest = require('neutrino-preset-jest');
const lint = require('neutrino-preset-airbnb-base');

const cssLoader = require.resolve('css-loader');
const sassLoader = require.resolve('sass-loader');
const styleLoader = require.resolve('style-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CLASS_LOCAL_IDENT_NAME = '[path]___[name]__[local]___[hash:base64:5]';

function setupExtractText(neutrino) {
  const { options } = neutrino;
  const styleRule = neutrino.config.module.rule('scss');
  const styleTest = styleRule.get('test');
  const styleFallback = {
    loader: styleRule.use('style').get('loader'),
    options: styleRule.use('style').get('options') };
  const styleLoaders = Array.from(styleRule.uses.store.keys())
    .filter((key) => key !== 'style')
    .map((key) => styleRule.use(key))
    .map((use) => ({loader: use.get('loader'), options: use.get('options')}));

  const loaders = ExtractTextPlugin.extract({
    fallback: options.fallback || styleFallback|| 'style-loader',
    use: options.use || styleLoaders || 'css-loader'
  });

  styleRule.uses.clear();
  loaders.forEach(({loader, options}) => {
    styleRule.use(loader).loader(loader).options(options);
  });

  neutrino.config.plugin('extract')
    .use(ExtractTextPlugin, [options.filename || '[name]-[contenthash].css']);
};

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


function setupLinterModule(neutrino) {
  neutrino.config.when(neutrino.config.module.rules.has('lint'), () => {
    neutrino.use(loaderMerge('lint', 'eslint'), {
      baseConfig: {
        extends: [
          'plugin:react/recommended'
        ]
      },
      rules: {
        'babel/new-cap': 'off',
        'comma-dangle': 'off'
      }
    });
  });
}


function setupCssModule(neutrino) {
  neutrino.use(loaderMerge('style', 'css'), {
    modules: true,
    sourceMap: true,
    localIdentName: CLASS_LOCAL_IDENT_NAME
  });
}

function getJestOptions(neutrino) {
  return {
    unmockedModulePathPatterns: [
      'node_modules/react/',
      'node_modules/enzyme/'
    ],
    setupFiles: [
      join(__dirname, './jestsetup.js')
    ],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy')
    },
    snapshotSerializers: [
      require.resolve('enzyme-to-json/serializer')
    ]
  };
}

module.exports = (neutrino) => {
  // load presets
  neutrino.use(lint);
  neutrino.use(react);
  neutrino.options.tests = 'src';  // TODO: refactor code to remove this hack
  neutrino.use(jest, getJestOptions(neutrino));
  // config presets
  setupLinterModule(neutrino);
  setupCssModule(neutrino);
  setupSassModule(neutrino);
  if ( process.env.NODE_ENV === 'production') {
    setupExtractText(neutrino);
  }
};
