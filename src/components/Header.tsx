"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import Image from "next/image";

import Container      from "./Container";
import { siteDetails } from "@/data/siteDetails";
import { menuItems }   from "@/data/menuItems";

const Header: React.FC = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* header şeffaf → scroll sonrası arkaplanlı */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition
                  ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <Container className="!px-0">
        <nav className="mx-auto flex items-center justify-between py-2 px-5 md:py-5
                        bg-white shadow-md md:bg-transparent md:shadow-none">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="PaletDepo Logo"
              width={64}
              height={64}
              priority
              className="min-w-fit"
            />
            <span className="manrope text-xl font-semibold text-foreground">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* DESKTOP menü */}
          <ul className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}

            {/* CTA  (yalnızca ≥ md) */}
            <li>
              <Link
                href="/iletisim"
                className="bg-primary px-8 py-3 rounded-full text-black
                           hover:bg-primary-accent transition-colors"
              >
                Sizi arayalım!
              </Link>
            </li>
          </ul>

          {/* MOBILE CTA (her zaman görünür) */}
          <Link
            href="/iletisim"
            className="md:hidden bg-primary px-8 py-3 rounded-full text-sm font-hard
                       text-black hover:bg-primary-accent transition-colors mr-3"
          >
            Sizi arayalım!
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="md:hidden bg-primary text-black rounded-full w-10 h-10 flex items-center
                       justify-center focus:outline-none"
          >
            {isOpen ? (
              <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
            ) : (
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="sr-only">Toggle navigation</span>
          </button>
        </nav>
      </Container>

      {/* MOBILE menü (slide-down) */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="block text-foreground hover:text-primary"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/iletisim"
                onClick={() => setIsOpen(false)}
                className="block w-fit bg-primary px-5 py-2 rounded-full
                           text-black hover:bg-primary-accent"
              >
                Teklif Al
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
