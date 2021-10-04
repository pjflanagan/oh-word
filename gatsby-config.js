module.exports = {
  siteMetadata: {
    siteUrl: `https://crosswordcubes.flanny.app`,
    title: `Cross Word Cubes`,
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
        name: `Cross Word Cubes`,
        short_name: `Cross Word Cubes`,
        start_url: `/`,
        background_color: `#024e98`,
        theme_color: `#024e98`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
