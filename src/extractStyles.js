const ExtractTextPlugin = require('extract-text-webpack-plugin');

let filename = '[name]-[contenthash].css';


module.exports = (neutrino, options = { plugin: {}, loader: {} }) => {
  const pluginOptions = Object.assign({
    filename
  }, options.plugin);

  const styleRule = neutrino.config.module.rule('scss');
  const styleTest = styleRule.get('test');
  const styleFallback = {
    loader: styleRule.use('style').get('loader'),
    options: styleRule.use('style').get('options')
  };

  const styleLoaders = Array.from(styleRule.uses.store.keys())
    .filter((key) => key !== 'style')
    .map((key) => styleRule.use(key))
    .map((use) => ({loader: use.get('loader'), options: use.get('options')}));

  const loaderOptions = Object.assign({
    fallback: styleFallback|| 'style-loader',
    use: styleLoaders || 'css-loader'
  }, options.loader);

  const loaders = ExtractTextPlugin.extract(loaderOptions);

  styleRule.uses.clear();

  loaders.forEach(({loader, options}) => {
    styleRule.use(loader).loader(loader).options(options);
  });

  neutrino.config.plugin('extract')
    .use(ExtractTextPlugin, [pluginOptions]);
};
