export const API_NEXTGEN_URL = "https://api.nextgen.guardianapps.co.uk";

export const PORT = process.env.PORT || 5000;

// This list is a direct copy from https://github.com/guardian/frontend/blob/6da0b3d8bfd58e8e20f80fc738b070fb23ed154e/static/src/javascripts/projects/common/modules/onward/related.js#L27
// If you change this list then you should also update ^
// order matters here (first match wins)
export const WHITELISTED_TAGS = [
  // sport tags
  "sport/cricket",
  "sport/rugby-union",
  "sport/rugbyleague",
  "sport/formulaone",
  "sport/tennis",
  "sport/cycling",
  "sport/motorsports",
  "sport/golf",
  "sport/horse-racing",
  "sport/boxing",
  "sport/us-sport",
  "sport/australia-sport",

  // football tags
  "football/championsleague",
  "football/premierleague",
  "football/championship",
  "football/europeanfootball",
  "football/world-cup-2014",

  // football team tags
  "football/manchester-united",
  "football/chelsea",
  "football/arsenal",
  "football/manchestercity",
  "football/tottenham-hotspur",
  "football/liverpool"
];
