const { join } = require('path');

const loaderMerge = require('neutrino-middleware-loader-merge');
const react = require('neutrino-preset-react');
const jest = require('neutrino-preset-jest');
const lint = require('neutrino-preset-airbnb-base');

const cssLoader = require.resolve("css-loader");
const sassLoader = require.resolve("sass-loader");
const styleLoader = require.resolve("style-loader");

const CLASS_LOCAL_IDENT_NAME = '[path]___[name]__[local]___[hash:base64:5]';


function setupSassModule(neutrino) {
  const options = neutrino.options.config;
  const sassOptions = {
    sourceMap: true
  };

  if (options.resolve && options.resolve.modules) {
    sassOptions.includePaths = options.resolve.modules;
  }

  neutrino.config.module
    .rule("scss")
    .test(/\.scss$/)
    .use("style")
      .loader(styleLoader)
      .end()
    .use("css")
      .loader(cssLoader)
      .options({
        modules: true,
        sourceMap: true,
        localIdentName: CLASS_LOCAL_IDENT_NAME
      })
      .end()
    .use("sass")
      .loader(sassLoader)
    .options(sassOptions);
}


function setupCssModule(neutrino) {


  neutrino.use(loaderMerge('lint', 'eslint'), {
    rules: {
      'babel/new-cap': 'off',
      'comma-dangle': 'off'
    }
  });

  neutrino.use(loaderMerge('style', 'css'), {
    modules: true,
    sourceMap: true,
    localIdentName: CLASS_LOCAL_IDENT_NAME
  });
}


function setupOptions(neutrino) {
  const { options } = neutrino;

  options.jest = {
    unmockedModulePathPatterns: [
      'node_modules/react/',
      'node_modules/enzyme/'
    ],
    roots: ['<rootDir>/src/', '<rootDir>/test/'],
    setupFiles: [
      join(__dirname, './jestsetup.js')
    ],
    snapshotSerializers: [
      require.resolve('enzyme-to-json/serializer')
    ]
  };
}


module.exports = neutrino => {
  // load presets
  neutrino.use(lint);
  neutrino.use(react);
  neutrino.use(jest);

  // config presets
  setupCssModule(neutrino);
  setupSassModule(neutrino);
  setupOptions(neutrino);
};
