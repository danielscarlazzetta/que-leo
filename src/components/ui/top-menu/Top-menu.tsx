'use client'

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useCartStore, useUiStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import categories, { Category, Subcategory } from '@/app/(shop)/product/category'
import { GoTriangleRight } from "react-icons/go";
import { title_font } from "@/config/fonts";
// import categories from '@/app/(shop)/product/category';


export const TopMenu = () => {

  const isSideMenuOpen = useUiStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Tipo explícito para el ref

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setLoaded(true)
  }, [])


  return (
    
    <nav className={`${title_font.className} flex px-5 justify-between items-center w-full`}>
      {/*Logo*/}

      <div>
        <Link href="/">
          <Image
            src="/imgs/queleo2.jpg"
            alt="Que leo Shop"
            width={100}
            height={50}
            className="cursor-pointer mt-4 mb-4 sm:mx-2"
            priority
          />
        </Link>
      </div>


      {/* Center menu */}
      <div className="hidden sm:block">


        <button
          id="dropdownDefaultButton"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={toggleDropdown}
        >
          Libros
        </button>
        <div
          ref={dropdownRef}
          id="dropdown"
          className={`${isDropdownOpen ? "block" : "hidden"
            } z-10 absolute bg-white divide-y divide-pink-100 rounded-lg shadow w-44 dark:bg-pink-700`}
        >
          <ul
            className="py-2 text-sm text-pink-700 dark:text-pink-200"
            aria-labelledby="dropdownDefaultButton"
          >
            
            {categories.map((cat: Category) => (
              <li key={cat.name} className="relative group">
                <a
                  href="/"
                  className="fade-in block px-4 py-2 hover:bg-pink-100 dark:hover:bg-pink-600 dark:hover:text-white"
                >
                  {cat.name}
                  {cat.subcategories && (
                    <GoTriangleRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white size-5" />
                  )}
                </a>
                {cat.subcategories && (
                  <ul className="fade-in absolute left-full top-0 mt-0 hidden group-hover:block bg-white rounded-e-lg shadow-md ">
                    {cat.subcategories.map((sub: Subcategory) => (
                      <li key={sub.name} className="text-gray-700">
                        <a
                          href="/"
                          className="block px-4 py-2 rounded-e-lg hover:bg-purple-100 dark:hover:bg-purple-600 dark:hover:text-white"
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/"
        >
          Preventas
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/"
        >
          Infantil / Juvenil
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/"
        >
          Promociones
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/"
        >
          Tarjeta de fidelidad
        </Link>

        {/* Links de ejemplos, con las rtas correspondientes */}

        {/* <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombre
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujer
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Juvenil
        </Link> */}
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
