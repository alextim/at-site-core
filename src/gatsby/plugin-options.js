const sanitize = (x, defaultValue) => (x === undefined ? defaultValue : x);
const sanitizeTrue = (x) => !!sanitize(x, true);

module.exports = (pluginOptions) => ({
  pageDirs: pluginOptions.pageDirs || { page: 'pages' },
  i18n: pluginOptions.i18n,
  noIndex: sanitizeTrue(pluginOptions.noIndex),
});


