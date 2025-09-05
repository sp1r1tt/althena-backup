"use client";

import Link from 'next/link';

export default function NewFooter() {
  return (
    <footer className="w-full bg-[#143B64] text-white py-8">
      <div className="max-w-[1120px] mx-auto px-4 xs:px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Στήλη 1: Λογότυπο και Περιγραφή */}
          <div>
            <Link href="/">
              <img src="/images/logo/Logo.png" alt="Althéna" className="h-12 mb-4" />
            </Link>
            <p className="text-sm leading-[1.3]">
              Althéna — цифровое пространство для поддержки и самосовершенствования. Мы здесь, чтобы помочь вам на пути к себе.
            </p>
          </div>
          {/* Στήλη 2: Χρήσιμοι Σύνδεσμοι */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4">Полезные ссылки</h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link href="/services" className="text-sm hover:underline">
                  Услуги
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/experts" className="text-sm hover:underline">
                  Эксперты
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-sm hover:underline">
                  Блог
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-sm hover:underline">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          {/* Στήλη 3: Επικοινωνία */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4">Связаться с нами</h3>
            <p className="text-sm mb-2">Email: support@althena.com</p>
            <p className="text-sm mb-2">Телефон: +123-456-7890</p>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11 10v-7h-2v-3h2v-2a3 3 0 013-3h3v3h-2a1 1 0 00-1 1v2h3l-1 3h-2v7a10 10 0 0010-11z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10 10 0 01-3 1 5 5 0 002-3 10 10 0 01-3 1A5 5 0 008 7a13 13 0 01-9-5 5 5 0 002 4A10 10 0 011 5v1a5 5 0 004 5 5 5 0 01-2 0 5 5 0 005 4 10 10 0 01-6 2 10 10 0 005 2 14 14 0 0014-14 5 5 0 001-1z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 00-3 20 10 10 0 003-20zm0 18a8 8 0 01-8-8 8 8 0 018 8zm4-14a1 1 0 100 2 1 1 0 000-2zm-4 2a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 Althéna. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}