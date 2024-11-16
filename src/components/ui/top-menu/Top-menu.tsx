'use client'

import { title_font } from "@/config/fonts";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useCartStore, useUiStore } from "@/store";
import { useEffect, useState } from "react";
import Image from "next/image";

export const TopMenu = () => {

  const isSideMenuOpen = useUiStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/*Logo*/}

      {/* <div>
        <Link href="/">
          <span className={`${title_font.className} antialiased font-bold`}>
            Que leo
          </span>{" "}
          <span className="text-pink-500"> Shop</span>{" "}
        </Link>
      </div> */}

      <div>
        <Link href="/">
          <Image
            src="/imgs/queleo3.jpg"
            alt="Que leo Shop"
            width={150} 
            height={50} 
            className="cursor-pointer mt-4 mb-4"
            priority
          />
        </Link>
      </div>


      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Ninos
        </Link>
      </div>

      {/* search cart menu */}
      <div className="flex items-center ">

        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-6 h-6" />
        </Link>

        <Link href={
          ((totalItemsInCart === 0) && loaded) ?
            '/empty'
            : '/cart'
        } className="mx-2">
          <div className="relative ">
            {
              (loaded && totalItemsInCart > 0) && (
                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-red-700 text-white">
                  {totalItemsInCart}
                </span>
              )
            }

            <IoCartOutline className="w-6 h-6" />
          </div>
        </Link>

        <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 mx-2" onClick={() => isSideMenuOpen()}>
          Menu
        </button>

      </div>
    </nav>
  );
};
