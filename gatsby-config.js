
const TITLE = 'Oh Word';

module.exports = {
  siteMetadata: {
    siteUrl: `https://ohword.flanny.app`,
    title: TITLE,
  },
  plugins: [
    `gatsby-plugin-use-query-params`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway`,
          `Ranchers`,
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: TITLE,
        short_name: TITLE,
        start_url: `/`,
        background_color: `#f0f1e7`,
        theme_color: `#f0f1e7`,
        display: `standalone`,
        icon: `static/img/logo/logo.png`,
        include_favicon: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-CNFGV4ZHRG",
        ],
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
};
