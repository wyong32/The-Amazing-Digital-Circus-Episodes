import { siteEmail, siteName, siteUrl, brandLogo, socialImage } from "./siteSeo.js";

/** @param {string} path */
export function absoluteUrl(path) {
  return new URL(path, siteUrl).toString();
}

/** @param {string | undefined} value */
export function toIsoDate(value) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const cleaned = value.replace(/^Updated\s+/i, "").trim();
  const parsed = Date.parse(cleaned);
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed).toISOString().slice(0, 10);
}

/** 仅首页：WebSite + Organization */
export function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        email: siteEmail,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(brandLogo),
        },
      },
    ],
  };
}

/**
 * Explained / Guides 详情页
 * @param {object} options
 */
export function buildArticleSchema({
  pageUrl,
  title,
  description,
  image = socialImage,
  datePublished,
  dateModified,
  section,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: pageUrl,
    inLanguage: "en-US",
    image: absoluteUrl(image),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(section ? { articleSection: section } : {}),
  };
}

/**
 * Episodes / Characters 等指南页
 * @param {object} options
 */
export function buildWebPageSchema({ pageUrl, title, description, image = socialImage }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "en-US",
    image: absoluteUrl(image),
  };
}
