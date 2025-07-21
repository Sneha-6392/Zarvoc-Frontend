import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../Styles/swiper-custom.css';

const slides = [
  'https://cmsimages.shoppersstop.com/EOSS_preview_sale_web_7ffc245564/EOSS_preview_sale_web_7ffc245564.png',
  'https://cmsimages.shoppersstop.com/Fragrance_Affair_KV_30th_May_25_web_2119c126b7/Fragrance_Affair_KV_30th_May_25_web_2119c126b7.jpg',
  'https://cmsimages.shoppersstop.com/Entry_Banner_web_90704e9cc4/Entry_Banner_web_90704e9cc4.png',
  'https://cmsimages.shoppersstop.com/Mac_Web_6e9bc3db68/Mac_Web_6e9bc3db68.jpg',
  'https://cmsimages.shoppersstop.com/GIF_Colour_Pop_SS_Web_cc91c55982/GIF_Colour_Pop_SS_Web_cc91c55982.gif'
];

const PromoSlider = () => {
  useEffect(() => {
    const pagination = document.querySelector('.swiper-pagination');
    if (pagination) {
      pagination.style.position = 'relative';
      pagination.style.marginTop = '1rem';
    }
  }, []);

  return (
    <section className="w-full">
      <Swiper
        className="mySwiper"
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className="flex justify-center items-center">
            {/* Reduced height from 500px to 300px */}
            <div className="relative w-full h-[300px] flex justify-center items-center overflow-hidden">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PromoSlider;
