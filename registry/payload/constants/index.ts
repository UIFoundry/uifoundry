export * from "./collections";

export const AUTOSAVE_INTERVAL = 200;

export const FLEX_ALIGNMENT = {
  left: "left",
  right: "right",
  center: "center",
} as const;
export type HeaderAlignment =
  (typeof FLEX_ALIGNMENT)[keyof typeof FLEX_ALIGNMENT];

export const AUTH_PROVIDERS = {
  apple: "apple",
  atlassian: "atlassian",
  cognito: "cognito",
  discord: "discord",
  dropbox: "dropbox",
  facebook: "facebook",
  figma: "figma",
  github: "github",
  gitlab: "gitlab",
  google: "google",
  huggingface: "huggingface",
  kakao: "kakao",
  kick: "kick",
  line: "line",
  linear: "linear",
  linkedin: "linkedin",
  microsoft: "microsoft",
  naver: "naver",
  notion: "notion",
  paypal: "paypal",
  reddit: "reddit",
  roblox: "roblox",
  salesforce: "salesforce",
  slack: "slack",
  spotify: "spotify",
  tiktok: "tiktok",
  twitch: "twitch",
  twitter: "twitter",
  vk: "vk",
  zoom: "zoom",
} as const;
export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];
