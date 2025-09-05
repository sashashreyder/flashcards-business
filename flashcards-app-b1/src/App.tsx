import { useState } from "react";
import Flashcards from "./components/Flashcards";
import Header from "./components/Header";

import negotiating from "./data/negotiating.json";
import conference from "./data/conference.json";
import expanding from "./data/expanding.json";
import investments from "./data/investments.json";
import correspondence from "./data/correspondence.json";

interface FlashcardItem {
  word: string;
  ipa?: string;
  meaning: string;
  example: string;
}

interface Category {
  name: string;
  items: FlashcardItem[];
}

interface Lesson {
  title: string;
  categories: Category[];
}

const lessons: Lesson[] = [
  negotiating,
  conference,
  expanding,
  investments,
  correspondence,
];

function App() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const currentLesson = lessons[lessonIndex];
  const categories = currentLesson.categories;
  const currentCategory = categories[categoryIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* хедер всегда сверху */}
      <Header />

      {/* центрируем весь остальной контент */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          {currentLesson.title} – {currentCategory.name}
        </h1>

        {/* селектор урока */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {lessons.map((lesson, i) => (
            <button
              key={lesson.title}
              onClick={() => {
                setLessonIndex(i);
                setCategoryIndex(0);
              }}
              className={`px-3 py-1 rounded-lg border ${
                i === lessonIndex
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white text-sky-700 border-sky-300 hover:bg-sky-100"
              }`}
            >
              {lesson.title}
            </button>
          ))}
        </div>

        {/* селектор категории */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setCategoryIndex(i)}
              className={`px-3 py-1 rounded-lg border ${
                i === categoryIndex
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white text-sky-700 border-sky-300 hover:bg-sky-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* карточки */}
        <Flashcards items={currentCategory.items} />
      </main>
    </div>
  );
}

export default App;

