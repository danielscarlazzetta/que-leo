"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useUiStore } from "@/store";
import { logout } from "@/actions";

import {
  IoBookOutline,
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import { useRouter } from "next/router";

export const Sidebar = () => {

  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session, status } = useSession();

  if (status === "loading") {
    // Mostrar un spinner o indicador de carga mientras la sesión se está cargando
    // return null;
    return <div>Cargando...</div>;
  }
  // const router = useRouter();
  const handleLogout = async () => {
    await logout();
    closeMenu();
    window.location.replace('/');
    // router.push('/'); 
  };

  const isAuthenticated = !!session?.user;

  const isAdmin = session?.user.role === 'admin';
  // const isUser = session?.user.role === 'user';



  console.log({ session })

  return (
    <div>
      {/*BackGround color*/}

      {
        isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 " />
        )
      }

      {/*BackGround blur*/}
      {
        isSideMenuOpen && (
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" onClick={closeMenu} />
        )
      }

      {/*Side menu*/}
      <nav className={
        clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline
          size={50}
          className="absolute top-0 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/*input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-2 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500" />
        </div>

        {/* Menu */}

        {
          isAuthenticated && (
            <>
              <Link href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPersonOutline size={30} />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link href="/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

            </>
          )
        }



        {
          isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          )
        }

        {
          !isAuthenticated && (
            <Link href="/auth/login"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Login</span>
            </Link>
          )
        }


        {
          isAdmin && (
            <>
              <div className="w-full mt-10 h-2 bg-gray-200 rounded-lg" />
              <Link href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <MdOutlineSell size={30} />
                <span className="ml-3 text-xl">Vender</span>
              </Link>

              {/* LineSeparator */}
              <div className="w-full mt-10 h-2 bg-gray-200 rounded-lg" />

              <Link href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Productos</span>
              </Link>

              <Link href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoBookOutline size={30} />
                <span className="ml-3 text-xl">Libros</span>
              </Link>

              <Link href="/admin/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <Link href="/admin/users"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>

            </>
          )
        }

      </nav>
    </div>
  );
};
