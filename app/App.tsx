import React, { useState } from 'react';
import Header from './components/Header';

interface FilterCategory {
  id: string;
  name: string;
  description: string;
}

const filterCategories: FilterCategory[] = [
  {
    id: 'lgbtq',
    name: 'ЛГБТК+',
    description: 'Ограничивает контент, связанный с вопросами сексуальной ориентации и гендерной идентичности'
  },
  {
    id: 'cringe',
    name: 'Кринж',
    description: 'Блокирует потенциально нелепый или неудобный контент'
  },
  {
    id: 'violence',
    name: 'Насилие',
    description: 'Фильтрует контент, включающий сцены насилия или агрессии'
  },
  {
    id: 'psychological',
    name: 'Психологическое давление',
    description: 'Исключает видео с элементами буллинга или унижения'
  },
  {
    id: 'adult',
    name: '18+ контент',
    description: 'Блокирует материалы, помеченные как только для взрослых'
  },
  {
    id: 'sexual',
    name: 'Сексуальный контент',
    description: 'Ограничивает доступ к роликам с откровенными материалами'
  },
  {
    id: 'political',
    name: 'Политические темы',
    description: 'Убирает видео на политические и социально острые темы'
  },
  {
    id: 'controversial',
    name: 'Горячие темы',
    description: 'Фильтрует видеоролики с противоречивыми темами'
  },
  {
    id: 'dark_humor',
    name: 'Черный юмор/Сарказм',
    description: 'Ограничивает доступ к роликам с неуместными шутками'
  },
  {
    id: 'junk_food',
    name: 'Фастфуд и сладости',
    description: 'Исключает видео, популяризирующие нездоровое питание'
  },
  {
    id: 'dangerous',
    name: 'Эксперименты с риском',
    description: 'Убирает видеоконтент с опасными челленджами'
  },
  {
    id: 'violent_games',
    name: 'Видеоигры с жестокостью',
    description: 'Фильтрует игры с насилием или агрессией'
  },
  {
    id: 'ads',
    name: 'Реклама и промо',
    description: 'Ограничивает видео с явной рекламой'
  },
];

function App() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="App">
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>Настройка родительского контроля</h1>
        <p style={{ marginBottom: '2rem' }}>
          Выберите категории контента, которые вы хотите ограничить:
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filterCategories.map(category => (
            <div
              key={category.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: selectedFilters.includes(category.id) ? '#e3f2fd' : 'white',
                cursor: 'pointer',
              }}
              onClick={() => toggleFilter(category.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{category.name}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                {category.description}
              </p>
            </div>
          ))}
        </div>
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
            }}
            onClick={() => console.log('Сохраненные фильтры:', selectedFilters)}
          >
            Сохранить настройки
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
