"use client";

import React, { useRef, useState } from 'react';

const ViktoriiaContent2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="max-w-full mx-auto pt-2 pb-8">
      <div className="grid grid-cols-[50%_20%_30%] gap-2">
        {/* Πλαίσιο 1 (60%) - Στρογγύλεμα μόνο δεξιά */}
        <div className="bg-[rgba(142,181,186,0.4)] p-4 rounded-r-lg rounded-l-0">
          <p className="text-gray-600 text-sm pt-[15px] pr-[15px] pb-[15px] pl-[85px]">
            <strong className="text-xl">Почему мне можно доверять?</strong>
            <br /><br />
            У меня высшее психологическое образование и глубокая теоретическая база — за последние годы я прошла более 10 профессиональных обучений, в том числе по гештальт-подходу, КПТ, работе с психотравмой, тревожными и депрессивными состояниями, психосоматике, консультированию пар.
            <br /><br />
            До психологии я работала финансовым аналитиком и бухгалтером. Это научило меня видеть структуру там, где кажется — только хаос. Сейчас этот навык помогает мне работать с ментальными процессами: видеть неочевидное, выстраивать причинно-следственные связи, находить точки опоры.
            <br /><br />
            В терапии я не «учитель» и не «судья». Я — проводник, партнёр, внимательный собеседник. Иногда — зеркало. Иногда — поддержка. Но всегда — искренне заинтересованный человек рядом.
            <br /><br />
            Каждая история для меня уникальна. И если вы сейчас в поиске — возможно, именно с этой точки начинается ваш путь к себе.
          </p>
        </div>
        {/* Πλαίσιο 2 (30%) - Στρογγύλεμα σε όλες τις γωνίες */}
        <div className="bg-[rgba(142,181,186,0.4)] rounded-lg relative overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/VK/vkIntro.mp4"
            className="w-full h-full object-cover"
            loop
            playsInline
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-black bg-opacity-50">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Πλαίσιο 3 (10%) - Στρογγύλεμα μόνο αριστερά */}
        <div className="bg-gray-100 p-4 rounded-l-lg rounded-r-0">
          <p className="text-gray-600 p-[15px]">Placeholder για το τρίτο πλαίσιο (10%)</p>
        </div>
      </div>
    </div>
  );
};

export default ViktoriiaContent2;