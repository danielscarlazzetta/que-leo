'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slideshow.css';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';


const carrusel = [
  'img_1.jpeg', 'img_2.jpeg', 'img_3.jpeg', 'img_4.jpeg', 'img_5.jpeg', 'img_6.jpeg'
]

interface Props {
  className?: string;
}

export const SlidePage = ({ className }: Props) => {
  return (
    <div className={className}>

      <div className='w-full pb-3 '>
        <Swiper
          style={{
            '--swiper-navigation-color': '#FF69B4',
            '--swiper-pagination-color': '#C71585',
            'height': '50vh',
            'width': '100%',

          } as React.CSSProperties
          }
          spaceBetween={0}
          // centeredSlides={true}
          autoplay={{
            delay: 2500,
          }}
          pagination={{
            clickable: true,
          }}
          autoHeight={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {
            carrusel.map(i => (
              <SwiperSlide key={i}
                // zoom={true}
              >
                <Image
                  //style={}
                  width={1080}
                  height={800}
                  src={`/img_carrusel/${i}`}
                  alt='img'
                  className="" />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
}
