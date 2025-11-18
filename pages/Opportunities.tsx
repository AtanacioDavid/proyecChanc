

import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import { Opportunity } from '../types';

type Category = 'Todos' | 'Empleo' | 'Pasantías' | 'Concursos' | 'Hackatones' | 'Becas';

const allOpportunities: Opportunity[] = [
  { id: 1, title: 'Desarrollador Junior', category: 'Empleo', date: '2025-09-20' },
  { id: 2, title: 'Pasantía en Marketing', category: 'Pasantías', date: '2025-10-05' },
  { id: 3, title: 'Concurso de Startups', category: 'Concursos', date: '2025-11-15' },
  { id: 4, title: 'Hackatón IA', category: 'Hackatones', date: '2025-12-01' },
  { id: 5, title: 'Diseñador UX/UI Senior', category: 'Empleo', date: '2025-09-25' },
  { id: 6, title: 'Competencia de Robótica', category: 'Concursos', date: '2025-10-20' },
  { id: 7, title: 'Beca Certified Tech Developer', category: 'Becas', date: '2025-08-10' },
  { id: 8, title: 'Becas Google Cloud', category: 'Becas', date: '2025-09-01' },
];

const Opportunities: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const categories: Category[] = ['Todos', 'Empleo', 'Pasantías', 'Concursos', 'Hackatones', 'Becas'];

  const filteredOpportunities = allOpportunities.filter(op => 
    activeCategory === 'Todos' || op.category === activeCategory
  );
  
  const categoryIcon = (category: Opportunity['category']) => {
    switch(category) {
        case 'Empleo': return '💼';
        case 'Pasantías': return '🎓';
        case 'Concursos': return '🏆';
        case 'Hackatones': return '💻';
        case 'Becas': return '📜';
        default: return '📢';
    }
  }

  return (
    <div className="space-y-8">
      <HeaderBanner 
        title="Convocatorias"
        subtitle="Encuentra oportunidades para crecer: empleo, becas, concursos y hackatones."
      />
      
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === category 
              ? 'bg-teal-700 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredOpportunities.map(op => (
          <Card key={op.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">{op.title}</h3>
                    <p className="text-slate-500 mt-1">
                        <span className="mr-2">{categoryIcon(op.category)}</span>
                        Categoría: {op.category}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                    <p className="text-sm font-medium text-slate-600">Fecha: {op.date}</p>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;