const { join } = require('path');

const loaderMerge = require('neutrino-middleware-loader-merge');
const react = require('neutrino-preset-react');
const jest = require('neutrino-preset-jest');
const lint = require('neutrino-preset-airbnb-base');

function setupModule(neutrino) {


  neutrino.use(loaderMerge('lint', 'eslint'), {
    rules: {
      'babel/new-cap': 'off',
      'comma-dangle': 'off'
    }
  });

  neutrino.use(loaderMerge('style', 'css'), {
    modules: true,
    localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
  });

  neutrino.use(loaderMerge('compile', 'babel'), {
    plugins: [require.resolve('babel-plugin-react-css-modules')]
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
      join(__dirname, '../node_modules/enzyme-to-json/serializer')
    ]
  };
}


module.exports = neutrino => {
  // load presets
  neutrino.use(lint);
  neutrino.use(react);
  neutrino.use(jest);

  // config presets
  setupModule(neutrino);
  setupOptions(neutrino);
};
