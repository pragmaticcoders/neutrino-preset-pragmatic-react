const lint = require('neutrino-preset-airbnb-base');
const loaderMerge = require('neutrino-middleware-loader-merge');

module.exports = (neutrino, options = { rules: {}, globals: {} }) => {
  const rules = Object.assign({
    'babel/new-cap': 'off',
    'comma-dangle': 'off'
  }, options.rules);

  const globalsObj = Object.assign({
    shallow: true,
    render: true,
    mount: true
  }, options.globals);
  let globals = [];
  for(k in globalsObj) {
    if(globalsObj[k]) {
      globals.push(k);
    }
  }

  neutrino.use(lint, {
    eslint: {
      baseConfig: {
        extends: [
          'plugin:react/recommended'
        ]
      },
      globals,
      rules
    }
  });
};
