const isValidLocale = (locale, fileNode, i18n) => {
  if (!locale) {
    if (process.env.WARNINGS) {
      console.warn(`The file "${fileNode.relativePath}" does not contain locale in it's name'.'`);
    }
    return false;
  }
  if (!i18n.isValidLang(locale)) {
    if (process.env.WARNINGS) {
      console.warn(
        `The file "${fileNode.relativePath}" has unsupported locale "${locale}" in it's name`,
      );
    }
    return false;
  }
  return true;
};

module.exports = isValidLocale;
