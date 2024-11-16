'use client';

import { useState } from 'react';

import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
    <div className={className}>

      <Swiper
        style={{
          '--swiper-navigation-color': '#FF69B4',
          '--swiper-pagination-color': '#C71585',
        } as React.CSSProperties
        }
        spaceBetween={0}
        navigation={true}
        autoplay={{
          delay: 2000
        }}
        thumbs={{ 
          swiper: thumbsSwiper
          // swiper: thumbsSwiper && !thumbsSwiper.destroy ? thumbsSwiper : null
         }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map(i => (
            <SwiperSlide key={i}>
              <Image
                width={1024}
                height={800}
                src={`/products/${i}`}
                alt={title}
                className=' object-fill' />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(i => (
            <SwiperSlide key={i}>
              <ProductImage
                width={300}
                height={300}
                src={i}
                alt={title}
                className=' object-fill' />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>
  )
}