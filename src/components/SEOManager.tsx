import React from 'react';
import { PageView, GuideSlug } from '../types';
import { usePageSeo } from '../hooks/usePageSeo';

interface SEOManagerProps {
  currentView: PageView;
  activeGuideSlug?: GuideSlug;
}

/**
 * Headless SEOManager component that dynamically manages HTML document head tags,
 * meta tags, OpenGraph cards, Twitter cards, canonical links, and Schema.org JSON-LD
 * structured data graphs per view route.
 */
export const SEOManager: React.FC<SEOManagerProps> = ({ currentView, activeGuideSlug }) => {
  usePageSeo(currentView, activeGuideSlug);
  return null;
};
