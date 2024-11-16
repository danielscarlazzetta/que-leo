'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';


const carrusel = [
  'img_1.jpeg', 'img_2.jpeg', 'img_3.jpeg', 'img_4.jpeg', 'img_5.jpeg', 'img_6.jpeg'
]

interface Props {
  className?: string;
}


export const SlideMobilPage = ({ className }: Props) => {
  return (
    <div className={className}>

      <div className='h-[300px] w-full'>
        <Swiper
          style={{
            '--swiper-navigation-color': '#FF69B4',
            '--swiper-pagination-color': '#C71585',
            'height': '30vh',
            'width': '100%'
          } as React.CSSProperties
          }
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
          }}
          pagination={{
            clickable: true,
          }}
          autoHeight={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper2'
        >
          {
            carrusel.map(i => (
              <SwiperSlide key={i}>
                <Image
                  width={600}
                  height={400}
                  src={`/img_carrusel/${i}`}
                  alt='img'
                  className="object-fill" />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
}
