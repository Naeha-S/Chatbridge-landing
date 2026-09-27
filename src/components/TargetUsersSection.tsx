import React from 'react';
import AppleCardsCarouselDemo from './apple-cards-carousel-demo';

export const TargetUsersSection: React.FC = () => {
  return (
    <section className="border-b border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl transition-colors overflow-hidden">
      <AppleCardsCarouselDemo />
    </section>
  );
};
