import React from 'react';
import { Helmet } from "react-helmet";

const TITLE = 'Crossword Cubes';
const DESCRIPTION = 'Can you beat my score?';
const ROOT = "https://crosswordcubes.flanny.app";
const IMG = `${ROOT}/img/social/social.png`;
const IMG_TW = `${ROOT}/img/social/social-tw.png`;
const FAVICON = `${ROOT}/img/logo/favicon.png`;

const AUTHOR = "Peter James Flanagan";
const HANDLE = "@peterjflan";

const faviconLinks = [
  // { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16x16 },
  { rel: "icon", type: "image/png", sizes: "32x32", href: FAVICON },
  // { rel: "shortcut icon", type: "image/png", href: favicon64x64 },
];

export const HeadComponent = () => {
  return (
    <Helmet link={faviconLinks}>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

      <title>{TITLE}</title>

      {/* Social */}
      <meta name="description" content={DESCRIPTION} />
      <meta name="author" content={AUTHOR} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMG} />
      <meta property="og:url" content={ROOT} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:image:secure_url" content={IMG} />

      {/* Twitter */}
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={HANDLE} />
      <meta name="twitter:creator" content={HANDLE} />
      <meta name="twitter:image" content={IMG_TW} />

    </Helmet>
  );
}
