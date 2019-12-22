import urljoin from "url-join";
import fetch from "node-fetch";

import { API_NEXTGEN_URL, WHITELISTED_TAGS } from "../config";
import { ServiceType, OnwardsType } from "../types";

export const buildArticleUrl = (service: ServiceType, path: string) => {
  // Eg. path = onwards/uk-news/2019/dec/21/uk-weather-rain-and-floods-hit-christmas-getaway
  let article = path.replace(new RegExp("^/" + service), "");
  // article = /uk-news/2019/dec/21/uk-weather-rain-and-floods-hit-christmas-getaway
  return urljoin("https://www.theguardian.com", article);
  // returns https://www.theguardian.com/uk-news/2019/dec/21/uk-weather-rain-and-floods-hit-christmas-getaway
};

const firstPopularTag = (pageTags: string[], isPaidContent: boolean) => {
  // This function looks for the first tag in pageTags, that also exists in our whitelist
  if (!pageTags) {
    // If there are no page tags we will never find a match so
    return false;
  }

  let isInWhitelist = (tag: string) => WHITELISTED_TAGS.includes(tag);

  // For paid content we just return the first tag, otherwise we
  // filter for the first tag in the whitelist
  return isPaidContent ? pageTags[0] : pageTags.find(isInWhitelist);
};

export const getOnwards = async (url: URL) => {
  let onwards: OnwardsType[] = [];

  let {
    hasRelated,
    hasStoryPackage,
    isAdFreeUser,
    config: {
      pageId,
      isPaidContent,
      showRelatedContent,
      keywordIds,
      contentType
    }
  } = await fetch(
    // Reconstruct the passed url adding .json?dcr which we need to force dcr to return json
    urljoin(url.origin, `${url.pathname}.json?dcr=true`)
  ).then(article => article.json());

  if (hasStoryPackage) {
    // Always fetch the story package is it exists
    let storyPackage = await fetch(
      urljoin(API_NEXTGEN_URL, "story-package", `${url.pathname}.json?dcr=true`)
    ).then(result => result.json());

    onwards.push({
      heading: storyPackage.heading,
      trails: storyPackage.trails,
      layout: "relatedContent"
    });
  } else if (isAdFreeUser && isPaidContent) {
    // Don't show any related content (other than story packages) for
    // adfree users when the content is paid for
  } else if (showRelatedContent && hasRelated) {
    // Related content can be a collection of articles based on
    // two things, 1: A popular tag, or 2: A generic text match
    let pageTags = keywordIds.split(",");
    let popularTag = firstPopularTag(pageTags, isPaidContent);

    let relatedUrl;
    if (popularTag) {
      // Use popular in tag endpoint
      relatedUrl = `/popular-in-tag/${popularTag}.json`;
    } else {
      // Default to generic related endpoint
      relatedUrl = `/related/${pageId}.json`;
    }
    relatedUrl += "?dcr=true";

    // --- Tag excludes --- //
    let tagsToExclude = [];
    // Exclude ad features from non-ad feature content
    if (!isPaidContent) {
      tagsToExclude.push("tone/advertisement-features");
    }
    // We don't want to show professional network content on videos or interactives
    if (
      contentType.toLowerCase() === "video" ||
      contentType.toLowerCase() === "interactive"
    ) {
      tagsToExclude.push("guardian-professional/guardian-professional");
    }

    // Add any exclude tags to the url
    if (tagsToExclude.length > 0) {
      let queryParams = tagsToExclude.map(tag => `exclude-tag=${tag}`);
      relatedUrl += `&${queryParams.join("&")}`;
    }

    let relatedContent = await fetch(
      urljoin(API_NEXTGEN_URL, relatedUrl)
    ).then(result => result.json());

    onwards.push({
      heading: relatedContent.heading,
      trails: relatedContent.trails,
      layout: "relatedContent"
    });
  }

  return onwards;
};
