import React from 'react';
import CardCarousel from './CardCarousel';
import carouselGalleryInfo from './carouselGalleryData.example.json';
import carouselQueenInfo from './carouselQueenData.example.json';

export default {
  title: 'Card Carousel',
  component: CardCarousel,
};

const Template = (args) => <CardCarousel {...args} />;

export const GalleryCard = {
  args: {
    carouselInfo: carouselGalleryInfo,
    gallery: 4,
  },
};

export const QueenCard = {
  args: {
    carouselInfo: carouselQueenInfo,
    queen: 5,
  },
};
