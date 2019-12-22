export type ServiceType = "onwards" | "contributions";
export type LayoutType = "fourPlusFour" | "relatedContent";

export type PillarType =
  | "news"
  | "opinion"
  | "sport"
  | "culture"
  | "lifestyle"
  | "labs";

export interface TrailType {
  url: string;
  linkText: string;
  isLiveBlog: boolean;
  ageWarning: string;
  image?: string;
  pillar: PillarType;
}

export interface OnwardsType {
  layout: LayoutType;
  heading: string;
  trails: TrailType;
}
