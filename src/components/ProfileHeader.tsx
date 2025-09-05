"use client";

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { expertsData } from '@/data/expertsData';
import { createClient } from '../../lib/supabase/client';

// Use forwardRef to allow ref forwarding
const ProfileHeader = forwardRef<HTMLElement, { setMenuOpen?: (open: boolean) => void }>(
  ({ setMenuOpen }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isExpertsOpen, setIsExpertsOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navRef = useRef<HTMLElement>(null);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsServicesOpen(false);
      setIsExpertsOpen(false);
      setIsLanguageOpen(false);
      if (setMenuOpen) setMenuOpen(!isMenuOpen);
    };

    const toggleServices = () => {
      setIsServicesOpen(!isServicesOpen);
      setIsExpertsOpen(false);
      setIsLanguageOpen(false);
    };

    const selectLanguage = (language: string) => {
      setSelectedLanguage(language);
      setIsLanguageOpen(false);
    };

    // Check user authentication status
    useEffect(() => {
      const checkUser = async () => {
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          setUser(user);
        } catch (error) {
          console.error('Error checking user:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      checkUser();

      // Listen for auth changes
      const supabase = createClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }, []);

    // Handle logout
    const handleLogout = async () => {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = '/auth/login';
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    // Ενημέρωση ύψους όταν αλλάζει το state του menu
    useEffect(() => {
      if (navRef.current) {
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
      }
    }, [isMenuOpen, isServicesOpen, isExpertsOpen, isLanguageOpen]);

    return (
      <header
        ref={ref}
        className="fixed top-0 left-0 w-full bg-[#f2f1f0] z-[1000] py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Ευθυγράμμιση αριστερά με το ίδιο padding όπως στο footer */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/Logorgb.png"
              alt="Althéna"
              width={240} // Προσαρμοσμένες διαστάσεις για να ταιριάζουν με το max-w-[240px]
              height={51} // Υπολογισμένο ύψος για να διατηρηθεί η αναλογία
              className="h-[25.6px] xs:h-8 sm:h-[38.4px] md:h-[44.8px] lg:h-[51.2px] max-w-[120px] xs:max-w-[160px] sm:max-w-[200px] lg:max-w-[240px] object-contain"
            />
          </Link>

          {/* Burger Menu για μικρές οθόνες */}
          <div
            className="sm:hidden text-2xl sm:text-3xl text-[#143B64] cursor-pointer"
            onClick={toggleMenu}
          >
            ☰
          </div>

          {/* Μενού - Ευθυγράμμιση δεξιά */}
          <nav
            ref={navRef}
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } sm:flex flex-col sm:flex-row sm:flex-1 sm:justify-end absolute sm:static top-full left-0 w-full sm:w-auto bg-[#f2f1f0] sm:bg-transparent sm:p-0 sm:gap-6 sm:items-center z-[1001]`}
          >
           {/* Meeting */}
            <Link
              href="/meeting"
              className="text-sm text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white px-2 py-3 rounded-[15px] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Meeting
            </Link>
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleServices}
                className="text-sm text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white px-2 py-3 rounded-[15px] transition-colors flex items-center"
              >
                Services
                <svg
                  className={`ml-2 h-4 w-4 transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul
                className={`${
                  isServicesOpen ? 'flex' : 'hidden'
                } sm:group-hover:flex flex-col sm:absolute sm:top-full sm:left-0 sm:bg-white sm:rounded-[15px] sm:shadow-md list-none p-4 sm:p-2 mt-1 sm:mt-0 z-[1001]`}
              >
                <li className="text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3">
                  <Link href="/services/relationships" onClick={() => setIsMenuOpen(false)}>
                    Relationships
                  </Link>
                </li>
                <li className="text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3">
                  <Link href="/services/self-confidence" onClick={() => setIsMenuOpen(false)}>
                    Self-Confidence
                  </Link>
                </li>
                <li className="text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3">
                  <Link href="/services/adaptation" onClick={() => setIsMenuOpen(false)}>
                    Adaptation
                  </Link>
                </li>
                <li className="text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3">
                  <Link href="/services/stress-anxiety" onClick={() => setIsMenuOpen(false)}>
                    Stress & Anxiety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Experts Dropdown */}
            <div className="relative group">
              <Link
                href="/experts"
                className="text-sm text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white px-2 py-3 rounded-[15px] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experts
              </Link>
              <ul
                className={`${
                  isExpertsOpen ? 'flex' : 'hidden'
                } sm:group-hover:flex flex-col sm:absolute sm:top-full sm:left-0 sm:bg-white sm:rounded-[15px] sm:shadow-md list-none p-4 sm:p-2 mt-1 sm:mt-0 z-[1001]`}
              >
                {expertsData && expertsData.length > 0 ? (
                  expertsData.map((expert) => (
                    <li
                      key={expert.id}
                      className="text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3"
                    >
                      <Link
                        href={expert.profileLink}
                        onClick={() => {
                          console.log(`Navigating to ${expert.name}`);
                          setIsMenuOpen(false);
                        }}
                      >
                        {expert.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No experts available</li>
                )}
              </ul>
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className="text-sm text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white px-2 py-3 rounded-[15px] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Language Selector */}
            <div className="relative group">
              <span className="text-sm text-[#143B64] font-playfair border border-[#143B64] rounded-[20px] px-4 py-3 hover:bg-[#edbfab] hover:text-white hover:border-transparent transition-colors cursor-pointer">
                {selectedLanguage}
              </span>
              <ul
                className={`${
                  isLanguageOpen ? 'flex' : 'hidden'
                } sm:group-hover:flex flex-col sm:absolute sm:top-full sm:left-0 sm:bg-white sm:rounded-[15px] sm:shadow-md list-none p-4 sm:p-2 mt-1 sm:mt-0 z-[1001]`}
              >
                <li
                  className={`text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3 ${
                    selectedLanguage === 'EN' ? 'bg-[#edbfab] text-white' : ''
                  }`}
                  onClick={() => selectLanguage('EN')}
                >
                  EN
                </li>
                <li
                  className={`text-sm sm:text-xs text-[#143B64] font-playfair hover:bg-[#edbfab] hover:text-white rounded-[10px] px-4 py-3 ${
                    selectedLanguage === 'RU' ? 'bg-[#edbfab] text-white' : ''
                  }`}
                  onClick={() => selectLanguage('RU')}
                >
                  RU
                </li>
              </ul>
            </div>

            {/* Authentication Button */}
            {loading ? (
              <div className="text-sm text-[#143B64] font-playfair border border-[#143B64] rounded-[20px] px-4 py-3">
                Loading...
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-sm text-[#143B64] font-playfair border border-[#143B64] rounded-[20px] px-4 py-3 hover:bg-[#edbfab] hover:text-white hover:border-transparent transition-colors flex items-center gap-2"
                  >
                    <span>{user.email?.split('@')[0] || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-[15px] shadow-lg border border-gray-200 py-2 z-[1001]">
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-[#143B64] hover:bg-[#edbfab] hover:text-white transition-colors"
                      >
                        Профиль
                      </Link>
                      {user?.user_metadata?.role === 'therapist' && (
                        <Link
                          href="/therapist-status"
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-[#143B64] hover:bg-[#edbfab] hover:text-white transition-colors"
                        >
                          Статус терапевта
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#143B64] hover:bg-[#edbfab] hover:text-white transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm text-[#143B64] font-playfair border border-[#143B64] rounded-[20px] px-4 py-3 hover:bg-[#edbfab] hover:text-white hover:border-transparent transition-colors text-left"
              >
                Sign In/Register
              </Link>
            )}
          </nav>
        </div>
      </header>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
