import React from "react";

interface ComponentProps {
  header?: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  media?: {
    light?: { url: string; alt: string };
    dark?: { url: string; alt: string };
  };
  actions?: Array<{ label?: string; href?: string }>;
  features?: Array<{ title?: string; description?: string; icon?: string }>;
  faqs?: Array<{ question?: string; answer?: string }>;
  members?: Array<{ name?: string; role?: string; bio?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  testimonials?: Array<{ content?: string; author?: string; role?: string }>;
  [key: string]: any;
}

import {
  BLOCK_SLUG_TEAMS_1_HEADING,
  BLOCK_SLUG_TEAMS_1_MEMBERS,
} from "~/payload/constants/blocks";

const blockComponents = {
  [BLOCK_SLUG_TEAMS_1_HEADING]: Teams_1_Heading,
  [BLOCK_SLUG_TEAMS_1_MEMBERS]: Teams_1_Members,
};

export default function Teams_1({ blocks }: ComponentProps) {
  return <RenderBlocks blocks={blocks} blockComponents={blockComponents} />;
}
