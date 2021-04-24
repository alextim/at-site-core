const resolverPassthrough = require('./helpers/resolverPassthrough');

module.exports = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: 'mdpassthrough',
    args: {
      fieldName: 'String!',
    },
    extend({ fieldName }) {
      return {
        resolve: resolverPassthrough(fieldName, 'MarkdownRemark'),
      };
    },
  });

  const typeDefs = [
    /**
     * https://www.gatsbyjs.org/docs/scaling-issues/
     *
     * Switch off type inference for SitePage.context
     */
    /*
    schema.buildObjectType({
      name: 'SitePage',
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
      fields: {
        path: {
          type: 'String!',
        },
      },
    }),
   */
    `
    type Image {
      sm: File @fileByRelativePath
      xl: File @fileByRelativePath
      alt: String
      title: String
    }

    type Section {
      title: String
      subtitle: String
      text: String
      image: Image
      items: [SectionItem]
    }

    type SectionItem {
      title: String
      to: String
      subtitle: String
      text: String
      image: Image
      icon: String
    }

    interface Page implements Node {
      id: ID!
      title: String!
      headline: String
      metaTitle: String
      metaDescription: String
      cover: Image
      template: String
      noindex: Boolean
      datePublished: Date
      dateModified: Date,
      sections: [Section]
      html: String!
      htmlAst: JSON!
      locale: String!
      type: String!
      slug: String!
    }

    type MdPage implements Page & Node @dontInfer {
      title: String!
      headline: String
      metaTitle: String
      metaDescription: String
      cover: Image
      template: String
      noindex: Boolean
      datePublished: Date
      dateModified: Date,
      sections: [Section]
      html: String! @mdpassthrough(fieldName: "html")
      htmlAst: JSON! @mdpassthrough(fieldName: "htmlAst")
      locale: String!
      type: String!
      slug: String!
    }

    # used in MdPost
    # tags, category
    type Link {
      to: String!
      title: String!
    }

    interface ILinkItem {
      id: ID!      
      to: String!
      title: String!
    }

    type FooterNav implements ILinkItem & Node @dontInfer {
      to: String!
      title: String!
      locale: String!
    }

    type MainNav implements ILinkItem & Node @dontInfer {
      to: String!
      title: String!
      submenu: [Link]
      locale: String!
    }

    type SocialLink implements ILinkItem & Node @dontInfer {
      code: String!
      to: String!
      title: String!
      locale: String!
    }

    type Translation implements Node @dontInfer {
      key: String!
      value: String!
      locale: String!
    }
  
    type Address implements Node @dontInfer {
      name: String
      alternateName: String
      legalName: String
      description: String
      contactPoint: [ContactPoint]
      postalAddress: PostalAddress
      locale: String!
    }

    type Contact implements Node @dontInfer {
      organizationType: String
      phone: [String]
      voice: Voice
      geo: Geo
      fax: String
      email: [String]
      openingHours: [[String]]
      hasMap: String
      embedMap: String
      foundingDate: Date
      priceRange: String
      currenciesAccepted: String
      paymentAccepted: String
    }

    type ContactPoint {
      name: String
      description: String
      contactType: String
      telephone: [String]
      email: [String]
      areaServed: String
    }

    type PostalAddress {
      streetAddress: [String]
      addressLocality: String
      addressRegion: String
      postalCode: String
      addressCountry: String
      addressCountryName: String
    }

    type Geo {
      latitude: Float!
      longitude: Float!
    }

    type Voice {
      skype: String
      whatsapp: String
      telegram: String
      viber: String
    }
    `,
  ];

  createTypes(typeDefs);
};
