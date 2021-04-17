const extractData = require('./extractData');

const onMdPageNode = (
  { node, actions: { createNode, createParentChildLink }, getNode, createNodeId, createContentDigest },
  i18n,
  noIndex,
  type,
  fields = {},
) => {
  const result = extractData({ node, getNode }, i18n);
  if (!result) {
    return;
  }

  const { slug, locale, frontmatter } = result;

  const {
    title,
    headline,
    metaTitle,
    metaDescription,
    cover,
    datePublished,
    dateModified,
    noindex,
    template,
    sections,
  } = frontmatter;

  const fieldData = {
    title,
    headline,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || headline,
    cover,
    datePublished,
    dateModified,
    noindex: noIndex || noindex,
    template,
    sections,
    locale,
    type,
    slug,
  };

  Object.keys(fields).forEach((key) => {
    fieldData[key] = fields[key](frontmatter);
  });

  const mdType = 'MdPage';
  const id = createNodeId(`${node.id} >>> ${mdType}`);

  createNode({
    ...fieldData,
    // Required fields
    id,
    parent: node.id,
    children: [],
    internal: {
      type: mdType,
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: 'Md implementation of the Page interface',
    },
  });

  createParentChildLink({ parent: node, child: getNode(id) });

  /*
  const getMetaTitle = (title, metaTitle, slg) => {
    const purePath = i18n.purePath(slg);

    // is Root
    if (purePath === '/') {
      return metaTitle || i18n.locales[locale].siteTitle;
    }
    return `${metaTitle || title} - ${i18n.locales[locale].siteShortName}`;
  };
  */
  //    metaTitle: getMetaTitle(title, metaTitle, slug),
  //    metaDescription: metaDescription || headline || i18n.locales[locale].siteDescription,
};

module.exports = onMdPageNode;
