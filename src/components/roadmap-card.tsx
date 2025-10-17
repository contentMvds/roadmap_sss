import Image from 'next/image';
import type { RoadmapCard } from '@/data/roadmap';

interface RoadmapCardProps {
  card: RoadmapCard;
}

export function RoadmapCard({ card }: RoadmapCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
          className="card-image object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-5">
        <h4 className="card-title font-bold text-lg tracking-tight mb-2 text-gray-900 dark:text-white">{card.title}</h4>
        <span className="card-deadline inline-block text-[11px] font-semibold px-2 py-0.5 bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-300">
          Prazo: {card.deadlineText}
        </span>
        <ul className="mt-4 text-sm space-y-2 text-gray-600 dark:text-gray-300">
          {card.steps.map((step, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-brand-400">▸</span>
              <span>
                <b>{`Semana ${index + 1}:`}</b> {step.replace(/Semana \d+:\s?/, '')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
