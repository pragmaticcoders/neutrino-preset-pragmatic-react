const { join } = require('path');
const merge = require('deepmerge');

const jest = require('neutrino-preset-jest');

module.exports = (neutrino, options = {} ) => {
  neutrino.use(jest, merge({
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
  }, options));
};
