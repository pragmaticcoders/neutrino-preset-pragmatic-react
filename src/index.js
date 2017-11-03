const react = require('neutrino-preset-react');

const lint = require('./lint');
const extractStyles = require('./extractStyles');
const jest = require('./jest');
const scss = require('./scss');


module.exports = (neutrino, options = {}) => {
  neutrino.use(lint);
  neutrino.use(react);
  neutrino.options.tests = 'src';  // TODO: refactor code to remove this hack
  neutrino.use(jest, options.jest);
  neutrino.use(scss, options);

  if ( process.env.NODE_ENV === 'production') {
    neutrino.use(extractStyles, options.extractStyles);
  }
};
