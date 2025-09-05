// src/components/ViktoriiaContent4.tsx
"use client";

import React, { useState } from 'react';
import CertificationsList from './CertificationsList';
import { expertsData } from '@/data/expertsData';

const ViktoriiaContent4: React.FC = () => {
  const viktoriia = expertsData.find((expert) => expert.name === "Виктория Котенко") || {
    id: 1,
    name: "Виктория Котенко",
    availability: {
      "2025-05-28": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "2025-05-29": ["10:00", "12:00", "14:00", "16:00"],
      "2025-05-30": ["09:30", "11:30", "13:30"],
    },
    certifications: [],
    experience: [],
    skills: [],
    publications: [],
  };

  // Ταξινόμηση πιστοποιητικών με φθίνουσα χρονολογική σειρά
  const sortedCertifications = [...(viktoriia.certifications || [])].sort(
    (a, b) => b.year - a.year
  );

  // Κατάσταση για την παγίναση
  const [currentPage, setCurrentPage] = useState(1);
  const certificationsPerPage = 3;
  const totalCertifications = sortedCertifications.length;
  const totalPages = Math.ceil(totalCertifications / certificationsPerPage);

  // Υπολογισμός των πιστοποιητικών που θα εμφανιστούν στην τρέχουσα σελίδα
  const startIndex = (currentPage - 1) * certificationsPerPage;
  const currentCertifications = sortedCertifications.slice(
    startIndex,
    startIndex + certificationsPerPage
  );

  // Κατάσταση για την επιλεγμένη εικόνα και τον τίτλο
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  // Κατάσταση για το modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Καθαρισμός της επιλεγμένης εικόνας και του modal όταν αλλάζει η σελίδα
      setSelectedImage(null);
      setSelectedTitle(null);
      setIsModalOpen(false);
      setModalImage(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Καθαρισμός της επιλεγμένης εικόνας και του modal όταν αλλάζει η σελίδα
      setSelectedImage(null);
      setSelectedTitle(null);
      setIsModalOpen(false);
      setModalImage(null);
    }
  };

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="max-w-full mx-auto pt-0 pb-6 mt-0">
      <div className="grid grid-cols-[35%_20%_15%_15%_15%] gap-2">
        {/* Πλαίσιο 1 (35%) - Сертификаты */}
        <div className="bg-[#e8e5e1] p-4 pl-[110px] rounded-lg">
          {currentCertifications && currentCertifications.length > 0 ? (
            <>
              <CertificationsList
                certifications={currentCertifications}
                onSelect={(image, title) => {
                  setSelectedImage(image);
                  setSelectedTitle(title);
                }}
                selectedTitle={selectedTitle}
              />
              {totalCertifications > certificationsPerPage && (
                <div className="flex justify-between mt-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`text-[#143B64] text-[10px] ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#8EB5BA]'
                    }`}
                  >
                    Предыдущая
                  </button>
                  <span className="text-[#143B64] text-[10px]">
                    Страница {currentPage} из {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`text-[#143B64] text-[10px] ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#8EB5BA]'
                    }`}
                  >
                    Следующая
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600 text-[10px]">Нет доступных сертификатов.</p>
          )}
        </div>
        {/* Πλαίσιο 2 (20%) - Εμφάνιση εικόνας πιστοποιητικού */}
        <div className="bg-[#e8e5e1] p-4 rounded-lg flex items-center justify-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Certificate Preview"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={() => openModal(selectedImage)}
            />
          ) : (
            <p className="text-gray-600 text-[10px]"></p>
          )}
        </div>
        {/* Πλαίσιο 3 (15%) - Профессиональный опыт */}
        <div className="bg-[#e8e5e1] p-4 rounded-lg">
          {viktoriia.experience && viktoriia.experience.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-[#143B64] mb-3 font-playfair text-center">
                Профессиональный опыт
              </h2>
              <ul className="space-y-2">
                {viktoriia.experience.map((exp, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 bg-white rounded-lg"
                  >
                    <h3 className="text-sm font-semibold text-[#143B64]">{exp.position}</h3>
                    <p className="text-[10px] text-gray-600">{exp.company}</p>
                    <p className="text-[10px] text-gray-500">{exp.years}</p>
                    {exp.description && (
                      <p className="text-[10px] text-gray-700 mt-0.5">{exp.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 text-[10px]">Нет доступного профессионального опыта.</p>
          )}
        </div>
        {/* Πλαίσιο 4 (15%) - Навыки */}
        <div className="bg-[#e8e5e1] p-4 rounded-lg">
          {viktoriia.skills && viktoriia.skills.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-[#143B64] mb-3 font-playfair text-center">
                Навыки
              </h2>
              <div className="flex flex-wrap gap-0.5">
                {viktoriia.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-[#8EB5BA] text-white rounded-full text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-[10px]">Нет доступных навыков.</p>
          )}
        </div>
        {/* Πλαίσιο 5 (15%) - Публикации */}
        <div className="bg-[#e8e5e1] p-4 pr-[70px] rounded-lg">
          {viktoriia.publications && viktoriia.publications.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-[#143B64] mb-3 font-playfair text-center">
                Публикации
              </h2>
              <ul className="space-y-2">
                {viktoriia.publications.map((pub, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 bg-white rounded-lg"
                  >
                    <h3 className="text-sm font-semibold text-[#143B64]">{pub.title}</h3>
                    <p className="text-[10px] text-gray-500">{pub.year}</p>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#143B64] underline hover:text-[#8EB5BA] text-[10px]"
                      >
                        Посмотреть публикацию
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 text-[10px]">Нет доступных публикаций.</p>
          )}
        </div>
      </div>

      {/* Modal για την εικόνα σε φυσικό μέγεθος */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <img
              src={modalImage}
              alt="Certificate Full Size"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViktoriiaContent4;