// src/components/ExpertDetails.tsx
import React from 'react';
import CertificationsList from './CertificationsList';

interface ExpertDetailsProps {
  certifications?: { title: string; institution: string; year: number; pdf?: string }[];
  experience?: { position: string; company: string; years: string; description?: string }[];
  skills?: string[];
  publications?: { title: string; year: number; link?: string }[];
}

const ExpertDetails: React.FC<ExpertDetailsProps> = ({
  certifications,
  experience,
  skills,
  publications,
}) => {
  return (
    <div className="max-w-[1120px] mx-auto px-4 py-8">
      {/* Ενότητα Πιστοποιητικών */}
      {certifications && certifications.length > 0 && (
        <div className="mb-12">
          <CertificationsList certifications={certifications} />
        </div>
      )}

      {/* Ενότητα Επαγγελματικής Εμπειρίας */}
      {experience && experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#143B64] mb-6 font-playfair">
            Επαγγελματική Εμπειρία
          </h2>
          <ul className="space-y-4">
            {experience.map((exp, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#8EB5BA]"
              >
                <h3 className="text-lg font-semibold text-[#143B64]">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.years}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ενότητα Δεξιοτήτων */}
      {skills && skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#143B64] mb-6 font-playfair">
            Δεξιότητες
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#8EB5BA] text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ενότητα Δημοσιεύσεων */}
      {publications && publications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#143B64] mb-6 font-playfair">
            Δημοσιεύσεις
          </h2>
          <ul className="space-y-4">
            {publications.map((pub, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#8EB5BA]"
              >
                <h3 className="text-lg font-semibold text-[#143B64]">{pub.title}</h3>
                <p className="text-sm text-gray-500">{pub.year}</p>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#143B64] underline hover:text-[#8EB5BA] text-sm"
                  >
                    Δείτε τη Δημοσίευση
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpertDetails;