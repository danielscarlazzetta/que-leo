'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from 'next/image';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {


  return (
    <div className={className}>

      <Swiper
        style={{
          '--swiper-navigation-color': '#FF69B4',
          '--swiper-pagination-color': '#C71585',
          width: '100vw',
          height:'500px'
        } as React.CSSProperties
        }
        pagination
        autoplay={{
          delay: 2000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map(i => (
            <SwiperSlide key={i}>
              <ProductImage
                width={500}
                height={420}
                src={i}
                alt={title}
                className='object-fill' />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}