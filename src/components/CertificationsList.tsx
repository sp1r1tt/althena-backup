// src/components/CertificationsList.tsx
import React from 'react';

interface Certification {
  title: string;
  institution: string;
  year: number;
  pdf?: string;
  image?: string;
}

interface CertificationsListProps {
  certifications: Certification[];
  onSelect: (image: string | null, title: string) => void;
  selectedTitle: string | null;
}

const CertificationsList: React.FC<CertificationsListProps> = ({
  certifications,
  onSelect,
  selectedTitle,
}) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold text-[#143B64] mb-3 font-playfair text-center">
        Дипломы и сертификаты
      </h2>
      <ul className="space-y-2">
        {certifications.map((cert, index) => (
          <li
            key={index}
            className="flex items-start gap-2 px-3 py-2 bg-white rounded-lg"
          >
            <div className="flex-1">
              <h3
                className={`text-sm font-semibold text-[#143B64] cursor-pointer hover:underline ${
                  selectedTitle === cert.title ? 'underline' : ''
                }`}
                onClick={() =>
                  onSelect(
                    selectedTitle === cert.title ? null : cert.image || null,
                    selectedTitle === cert.title ? '' : cert.title
                  )
                }
              >
                {cert.title}
              </h3>
              <p className="text-[10px] text-gray-600">{cert.institution}</p>
              <p className="text-[10px] text-gray-500">{cert.year}</p>
              {cert.pdf && (
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#143B64] underline hover:text-[#8EB5BA] text-[10px]"
                >
                  Посмотреть сертификат (PDF)
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationsList;