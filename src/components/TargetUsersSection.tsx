import React from 'react';
import AppleCardsCarouselDemo from './apple-cards-carousel-demo';

export const TargetUsersSection: React.FC = () => {
  return (
    <section className="border-b border-neutral-200/80 dark:border-white/10 bg-[#0C0D11] text-white transition-colors overflow-hidden py-8 sm:py-12">
      <AppleCardsCarouselDemo />
    </section>
  );
};
