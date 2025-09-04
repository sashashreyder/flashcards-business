import { useState } from "react";
import Flashcards from "./components/Flashcards";


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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">
        {currentLesson.title} – {currentCategory.name}
      </h1>


      <div className="flex flex-wrap gap-2 mb-4">
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


      <div className="flex flex-wrap gap-2 mb-6">
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


      <Flashcards items={currentCategory.items} />
    </div>
  );
}

export default App;
