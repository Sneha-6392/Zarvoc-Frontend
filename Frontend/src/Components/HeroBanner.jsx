import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

function HeroBanner() {
  const slides = [
    {
      id: 1,
      image: "https://cmsimages.shoppersstop.com/EOSS_preview_sale_web_7ffc245564/EOSS_preview_sale_web_7ffc245564.png",
      alt: "Slide 1"
    },
    {
      id: 2,
      image: "https://cmsimages.shoppersstop.com/Fragrance_Affair_KV_30th_May_25_web_2119c126b7/Fragrance_Affair_KV_30th_May_25_web_2119c126b7.jpg",
      alt: "Slide 2"
    },
    {
      id: 3,
      image: "https://cmsimages.shoppersstop.com/Entry_Banner_web_90704e9cc4/Entry_Banner_web_90704e9cc4.png",
      alt: "Slide 3"
    },
    {
      id: 4,
      image: "https://cmsimages.shoppersstop.com/Mac_Web_6e9bc3db68/Mac_Web_6e9bc3db68.jpg",
      alt: "Slide 4"
    },
    {
      id: 5,
      image: "https://cmsimages.shoppersstop.com/GIF_Colour_Pop_SS_Web_cc91c55982/GIF_Colour_Pop_SS_Web_cc91c55982.gif",
      alt: "Slide 5"
    }
  ];

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden">
              <img 
                src={slide.image} 
                alt={slide.alt}
                className="w-full h-full object-cover object-top" 
              />
              {/* Optional: white fade at bottom */}
              <div 
                className="absolute bottom-0 left-0 w-full h-28 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroBanner;
