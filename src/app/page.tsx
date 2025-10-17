'use client';

import { useEffect, useState } from 'react';
import { AppShell, useRouteTitle } from '@/components/app-shell';
import { ProgressForm } from '@/components/progress-form';
import { RoadmapCard } from '@/components/roadmap-card';
import { overviewProgress, roadmapEpics } from '@/data/roadmap';
import { classNames } from '@/lib/utils';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const pageTitle = useRouteTitle(activeSection);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (hash === 'overview' || roadmapEpics.some((epic) => epic.id === hash))) {
        setActiveSection(hash);
      }
    };
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  return (
    <AppShell
      pageTitle={pageTitle}
      breadcrumb={pageTitle}
      activeSection={activeSection}
      onNavigateSection={handleNavigateSection}
    >
      <div className="space-y-10">
        <section
          id="overview"
          data-route
          className={classNames(activeSection === 'overview' && 'active')}
        >
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="lg:col-span-2 p-8 flex flex-col justify-center bg-gray-200 dark:bg-gray-900 bg-[radial-gradient(theme(colors.gray.300)_1px,transparent_1px)] dark:bg-[radial-gradient(theme(colors.white)_0.5px,transparent_0.5px)] [background-size:16px_16px]">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-2 text-gray-900 dark:text-white">
                Seu Roadmap de 6 Meses para Arquitetura LLM
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                Um plano de ação detalhado para transicionar sua experiência Sênior para o foco em Engenharia e Arquitetura de LLMs. Utilize o menu lateral para navegar pelos Épicos (Meses).
              </p>
              <a
                href="#mes1"
                onClick={() => handleNavigateSection('mes1')}
                className="inline-block mt-6 bg-brand-500 text-white font-semibold px-5 py-2 hover:bg-brand-600 transition-colors w-auto max-w-max"
              >
                Começar o Mês 1 🚀
              </a>
            </article>

            <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-6">
              <h3 className="text-lg font-bold tracking-tight mb-4">Progresso por Mês</h3>
              <div className="space-y-4">
                {overviewProgress.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>{item.label}</span>
                      <span className="text-brand-600 dark:text-brand-400">{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200/70 dark:bg-white/10">
                      <div className="h-2 bg-brand-500" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="lg:col-span-3">
              <ProgressForm />
            </div>
          </div>
        </section>

        {roadmapEpics.map((epic) => (
          <section
            key={epic.id}
            id={epic.id}
            data-route
            className={classNames(activeSection === epic.id && 'active')}
          >
            <h3 className="text-2xl font-bold tracking-tight mb-6 border-b border-gray-300 dark:border-white/10 pb-2">
              {epic.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{epic.description}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {epic.cards.map((card) => (
                <RoadmapCard key={card.id} card={card} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
