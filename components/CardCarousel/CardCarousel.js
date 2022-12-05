/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import CardGallery from '../CardGallery/CardGallery';
import CardHome from '../CardHome/CardHome';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CardCarousel = ({ carouselInfo, gallery, queen }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: queen || gallery,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      style={{ marginBottom: '40px' }}
    >
      {
        carouselInfo.map((info, index) => (
          <SwiperSlide key={index}>
            { gallery && <CardGallery index galeria={info} /> }
            { queen && <CardHome {...info} /> }
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};

CardCarousel.propTypes = {
  carouselInfo: PropTypes.array.isRequired,
  gallery: PropTypes.number,
  queen: PropTypes.number,
};

export default CardCarousel;
