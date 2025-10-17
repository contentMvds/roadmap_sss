'use client';

import Link from 'next/link';
import { AppShell, useRouteTitle } from '@/components/app-shell';
import { useProgress, type ProgressEntry } from '@/lib/progress-store';
import { classNames, formatDateTime } from '@/lib/utils';
import { roadmapEpics } from '@/data/roadmap';

const statusLabels = {
  nao_iniciado: 'Não iniciado',
  em_andamento: 'Em andamento',
  bloqueado: 'Bloqueado',
  concluido: 'Concluído',
} as const;

const statusColors: Record<keyof typeof statusLabels, string> = {
  nao_iniciado: 'bg-gray-300 text-gray-700 dark:bg-white/10 dark:text-gray-200',
  em_andamento: 'bg-brand-500/10 text-brand-600 dark:text-brand-300',
  bloqueado: 'bg-red-500/10 text-red-600 dark:text-red-300',
  concluido: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
};

const cardMetadata = new Map(
  roadmapEpics.flatMap((epic) =>
    epic.cards.map((card) => [card.id, { epicId: epic.id, epicName: epic.name, cardTitle: card.title }])
  )
);

export default function DashboardPage() {
  const pageTitle = useRouteTitle('dashboard');
  const { entries } = useProgress();

  const latestEntryByCard = new Map<string, ProgressEntry>();

  entries.forEach((entry) => {
    const existing = latestEntryByCard.get(entry.cardId);
    if (!existing || existing.createdAt < entry.createdAt) {
      latestEntryByCard.set(entry.cardId, entry);
    }
  });

  const totalCards = roadmapEpics.reduce((acc, epic) => acc + epic.cards.length, 0);
  const completedCards = Array.from(latestEntryByCard.values()).filter(
    (entry) => entry.status === 'concluido'
  ).length;
  const blockedCards = Array.from(latestEntryByCard.values()).filter(
    (entry) => entry.status === 'bloqueado'
  ).length;

  const epicProgress = roadmapEpics.map((epic) => {
    const total = epic.cards.length;
    const completed = epic.cards.filter((card) => latestEntryByCard.get(card.id)?.status === 'concluido').length;
    const blocked = epic.cards.filter((card) => latestEntryByCard.get(card.id)?.status === 'bloqueado').length;
    const inProgress = epic.cards.filter((card) => latestEntryByCard.get(card.id)?.status === 'em_andamento').length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { epic, total, completed, blocked, inProgress, progress };
  });

  const recentEntries = entries.slice(0, 6);

  return (
    <AppShell pageTitle={pageTitle} breadcrumb={pageTitle}>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Microtarefas" value={totalCards} subtitle="Total planejado" />
          <SummaryCard title="Concluídas" value={completedCards} subtitle="Último status das cards" accent="success" />
          <SummaryCard title="Entradas registradas" value={entries.length} subtitle="Atualizações no histórico" accent="brand" />
          <SummaryCard title="Bloqueios ativos" value={blockedCards} subtitle="Último status sinalizado" accent="danger" />
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-6">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Progresso por Épico</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Percentual baseado na última atualização registrada para cada microtarefa.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center bg-brand-500 text-white font-semibold px-4 py-2 hover:bg-brand-600 transition-colors"
            >
              Atualizar roadmap
            </Link>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {epicProgress.map(({ epic, progress, completed, blocked, inProgress, total }) => (
              <div key={epic.id} className="border border-gray-200 dark:border-white/10 p-5 bg-gray-50/80 dark:bg-white/5">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">{epic.name}</h4>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{progress}% concluído</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{completed} de {total} microtarefas</span>
                </div>
                <div className="h-2 w-full bg-gray-200/70 dark:bg-white/10 mb-4">
                  <div className="h-2 bg-brand-500" style={{ width: `${progress}%` }} />
                </div>
                <dl className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <div>
                    <dt className="uppercase tracking-wide font-semibold">Concluídas</dt>
                    <dd className="text-lg font-bold text-emerald-500 dark:text-emerald-300">{completed}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide font-semibold">Em andamento</dt>
                    <dd className="text-lg font-bold text-brand-500 dark:text-brand-300">{inProgress}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide font-semibold">Bloqueadas</dt>
                    <dd className="text-lg font-bold text-red-500 dark:text-red-300">{blocked}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-6">
          <h3 className="text-xl font-bold tracking-tight mb-4">Últimas atualizações</h3>
          {recentEntries.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cadastre uma atualização no formulário principal para visualizar aqui.
            </p>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => {
                const info = cardMetadata.get(entry.cardId);
                return (
                  <article key={entry.id} className="border border-gray-200 dark:border-white/10 p-4 bg-gray-50/50 dark:bg-white/5">
                    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">{info?.cardTitle ?? 'Microtarefa'}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{info?.epicName ?? '—'}</p>
                      </div>
                      <span
                        className={classNames(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
                          statusColors[entry.status]
                        )}
                      >
                        {statusLabels[entry.status]}
                      </span>
                    </header>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {entry.description || 'Sem descrição adicionada.'}
                    </p>
                    <footer className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatDateTime(entry.reportDate)}</span>
                      {entry.link ? (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 dark:text-brand-300 underline"
                        >
                          Ver link
                        </a>
                      ) : (
                        <span>Sem link</span>
                      )}
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

interface SummaryCardProps {
  title: string;
  value: number;
  subtitle?: string;
  accent?: 'brand' | 'success' | 'danger';
}

function SummaryCard({ title, value, subtitle, accent }: SummaryCardProps) {
  const accentColors = {
    default: 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10',
    brand: 'bg-brand-500/10 border-brand-200/60 dark:bg-brand-500/10 dark:border-brand-500/40',
    success: 'bg-emerald-500/10 border-emerald-200/60 dark:bg-emerald-500/10 dark:border-emerald-500/30',
    danger: 'bg-red-500/10 border-red-200/60 dark:bg-red-500/10 dark:border-red-500/30',
  } as const;

  const colorClass = accent ? accentColors[accent] : accentColors.default;

  return (
    <div className={classNames('border p-5 rounded', colorClass)}>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
