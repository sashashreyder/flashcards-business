import React, { useState } from "react";

interface FlashcardItem {
  word: string;
  ipa?: string;
  meaning: string;
  example: string;
}

interface FlashcardsProps {
  items: FlashcardItem[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = items[index];

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Карточка */}
      <div
        className="w-[90vw] max-w-md aspect-[3/2] [perspective:1000px] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Передняя сторона (синий) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0096d6] text-white flex flex-col justify-center items-center rounded-xl shadow-lg p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              {current.word}
            </h2>
            {current.ipa && (
              <p className="text-white/80 mt-2 text-base">{current.ipa}</p>
            )}
            <p className="text-sm mt-4 opacity-80">👆 Tap to flip</p>
          </div>

          {/* Задняя сторона (салатовый) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#8cc63f] text-white flex flex-col justify-center items-center rounded-xl shadow-lg p-6">
            <p className="text-lg sm:text-xl text-center">{current.meaning}</p>
            <p className="text-sm mt-2 italic opacity-80 text-center">
              {current.example}
            </p>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="flex gap-4">
        <button
          onClick={prevCard}
          className="px-4 py-2 rounded-lg bg-[#0096d6] text-white hover:bg-sky-600 transition"
        >
          ⬅ Prev
        </button>
        <button
          onClick={nextCard}
          className="px-4 py-2 rounded-lg bg-[#0096d6] text-white hover:bg-sky-600 transition"
        >
          Next ➡
        </button>
      </div>

      {/* Номер карточки */}
      <p className="text-gray-600 text-sm">
        Card {index + 1} of {items.length}
      </p>
    </div>
  );
};

export default Flashcards;




