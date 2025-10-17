'use client';

import { FormEvent, useMemo, useState } from 'react';
import { roadmapEpics } from '@/data/roadmap';
import { useProgress, type ProgressStatus } from '@/lib/progress-store';
import { formatDate } from '@/lib/utils';

const statusOptions: { value: ProgressStatus; label: string }[] = [
  { value: 'nao_iniciado', label: 'Não iniciado' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'bloqueado', label: 'Bloqueado' },
  { value: 'concluido', label: 'Concluído' }
];

export function ProgressForm() {
  const { addEntry } = useProgress();
  const options = useMemo(
    () =>
      roadmapEpics.flatMap((epic) =>
        epic.cards.map((card) => ({
          epicId: epic.id,
          epicName: epic.name,
          cardId: card.id,
          cardTitle: card.title,
        }))
      ),
    []
  );

  const [selectedCardId, setSelectedCardId] = useState(options[0]?.cardId ?? '');
  const [status, setStatus] = useState<ProgressStatus>('em_andamento');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState(formatDate(new Date()));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCardId) {
      setFeedback('Selecione uma microtarefa.');
      return;
    }
    const card = options.find((item) => item.cardId === selectedCardId);
    if (!card) {
      setFeedback('Microtarefa inválida.');
      return;
    }

    addEntry({
      cardId: card.cardId,
      epicId: card.epicId,
      status,
      description: description.trim(),
      link: link.trim() ? link.trim() : undefined,
      reportDate: new Date().toISOString(),
    });

    setDescription('');
    setLink('');
    setStatus('em_andamento');
    setReportDate(formatDate(new Date()));
    setFeedback('Progresso salvo com sucesso!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-6 space-y-4"
    >
      <div>
        <h3 className="text-lg font-bold tracking-tight">Atualizar Progresso</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Registre o andamento da microtarefa e acompanhe nas páginas de Progresso e Dashboard.
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="microtask" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Microtarefa
        </label>
        <select
          id="microtask"
          className="w-full border border-gray-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
          value={selectedCardId}
          onChange={(event) => setSelectedCardId(event.target.value)}
          required
        >
          {options.map((option) => (
            <option key={option.cardId} value={option.cardId}>
              {option.epicName} — {option.cardTitle}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Como está o desenvolvimento?
        </label>
        <select
          id="status"
          className="w-full border border-gray-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
          value={status}
          onChange={(event) => setStatus(event.target.value as ProgressStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição do progresso
        </label>
        <textarea
          id="description"
          className="w-full border border-gray-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm min-h-[100px]"
          placeholder="Registre aprendizados, bloqueios ou próximos passos"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="link" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Link de referência (opcional)
        </label>
        <input
          id="link"
          type="url"
          className="w-full border border-gray-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
          placeholder="https://"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="report-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Data do registro
        </label>
        <input
          id="report-date"
          type="text"
          readOnly
          value={reportDate}
          className="w-full border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3 py-2 text-sm"
        />
      </div>

      {feedback && <p className="text-sm text-brand-600 dark:text-brand-300">{feedback}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center bg-brand-500 text-white font-semibold px-4 py-2 hover:bg-brand-600 transition-colors"
        >
          Salvar atualização
        </button>
      </div>
    </form>
  );
}
