/**
 * TypeScript interfaces for UIFoundry registry components
 * These types provide proper typing for all converted components
 */

export interface BaseComponentProps {
  className?: string;
  [key: string]: any;
}

export interface HeroComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  alertLabel?: string;
  alertLink?: string;
  media?: {
    light?: { url: string; alt: string };
    dark?: { url: string; alt: string };
  };
}

export interface CTAComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  actions?: Array<{
    label?: string;
    href?: string;
    variant?: "default" | "outline" | "ghost";
  }>;
}

export interface FeatureItem {
  title?: string;
  description?: string;
  icon?: string;
}

export interface FeaturesComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  features?: FeatureItem[];
}

export interface FAQItem {
  question?: string;
  answer?: string;
}

export interface FAQComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  faqs?: FAQItem[];
}

export interface PricingTier {
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface PricingComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  tiers?: PricingTier[];
}

export interface TeamMember {
  name?: string;
  role?: string;
  bio?: string;
  image?: { url: string; alt: string };
  social?: Array<{ platform?: string; url?: string }>;
}

export interface TeamsComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  members?: TeamMember[];
}

export interface StatItem {
  label?: string;
  value?: string;
  description?: string;
}

export interface StatsComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  stats?: StatItem[];
}

export interface GalleryItem {
  image?: { url: string; alt: string };
  title?: string;
  description?: string;
}

export interface GalleryComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  images?: GalleryItem[];
}

export interface TestimonialItem {
  content?: string;
  author?: string;
  role?: string;
  company?: string;
  avatar?: { url: string; alt: string };
}

export interface TestimonialsComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  testimonials?: TestimonialItem[];
}

export interface NavigationItem {
  label?: string;
  href?: string;
  children?: NavigationItem[];
}

export interface HeaderComponentProps extends BaseComponentProps {
  logo?: { url: string; alt: string };
  navigation?: NavigationItem[];
  ctaButton?: { label?: string; href?: string };
}

export interface FooterComponentProps extends BaseComponentProps {
  logo?: { url: string; alt: string };
  navigation?: NavigationItem[];
  social?: Array<{ platform?: string; url?: string }>;
  copyright?: string;
}

export interface AboutComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  content?: string;
  image?: { url: string; alt: string };
}

export interface ContactComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  email?: string;
  phone?: string;
  address?: string;
  social?: Array<{ platform?: string; url?: string }>;
}

export interface NewsletterComponentProps extends BaseComponentProps {
  header?: string;
  subheader?: string;
  placeholder?: string;
  buttonText?: string;
}

// Union type for all component props
export type ComponentProps =
  | HeroComponentProps
  | CTAComponentProps
  | FeaturesComponentProps
  | FAQComponentProps
  | PricingComponentProps
  | TeamsComponentProps
  | StatsComponentProps
  | GalleryComponentProps
  | TestimonialsComponentProps
  | HeaderComponentProps
  | FooterComponentProps
  | AboutComponentProps
  | ContactComponentProps
  | NewsletterComponentProps;

// Generic component interface that all registry components should implement
export interface RegistryComponentInterface {
  (props: ComponentProps): React.JSX.Element;
}
