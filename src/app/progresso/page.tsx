'use client';

import Link from 'next/link';
import { AppShell, useRouteTitle } from '@/components/app-shell';
import { useProgress } from '@/lib/progress-store';
import { formatDateTime } from '@/lib/utils';
import { roadmapEpics } from '@/data/roadmap';

const cardLookup = new Map(
  roadmapEpics.flatMap((epic) => epic.cards.map((card) => [card.id, { epicId: epic.id, epicName: epic.name, title: card.title }]))
);

export default function ProgressListPage() {
  const pageTitle = useRouteTitle('progresso');
  const { entries } = useProgress();

  return (
    <AppShell pageTitle={pageTitle} breadcrumb={pageTitle}>
      <div className="space-y-6">
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-6">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Histórico de Progresso</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Consulte os registros salvos no formulário principal e acompanhe cada microtarefa.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center bg-brand-500 text-white font-semibold px-4 py-2 hover:bg-brand-600 transition-colors"
            >
              Registrar novo progresso
            </Link>
          </header>

          {entries.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nenhum progresso registrado até o momento. Utilize o formulário na página inicial para cadastrar a primeira atualização.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10 text-sm">
                <thead className="bg-gray-50 dark:bg-white/5">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold">Data</th>
                    <th className="px-4 py-3 font-semibold">Épico</th>
                    <th className="px-4 py-3 font-semibold">Microtarefa</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Descrição</th>
                    <th className="px-4 py-3 font-semibold">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {entries.map((entry) => {
                    const info = cardLookup.get(entry.cardId);
                    const statusLabel = {
                      nao_iniciado: 'Não iniciado',
                      em_andamento: 'Em andamento',
                      bloqueado: 'Bloqueado',
                      concluido: 'Concluído',
                    }[entry.status];

                    return (
                      <tr key={entry.id} className="align-top">
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                          {formatDateTime(entry.reportDate)}
                        </td>
                        <td className="px-4 py-3 max-w-[180px]">
                          <span className="text-gray-700 dark:text-gray-200 font-medium">{info?.epicName ?? '—'}</span>
                        </td>
                        <td className="px-4 py-3 max-w-[240px]">
                          <span className="text-gray-700 dark:text-gray-200">{info?.title ?? '—'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                          {entry.description ? entry.description : <span className="text-gray-400">Sem detalhes</span>}
                        </td>
                        <td className="px-4 py-3">
                          {entry.link ? (
                            <a
                              href={entry.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-600 dark:text-brand-300 underline"
                            >
                              Abrir
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
