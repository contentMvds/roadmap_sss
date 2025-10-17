'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ProgressStatus = 'nao_iniciado' | 'em_andamento' | 'bloqueado' | 'concluido';

export interface ProgressEntry {
  id: string;
  cardId: string;
  epicId: string;
  status: ProgressStatus;
  description: string;
  link?: string;
  reportDate: string;
  createdAt: number;
}

interface ProgressContextValue {
  entries: ProgressEntry[];
  addEntry: (entry: Omit<ProgressEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, updates: Partial<ProgressEntry>) => void;
  removeEntry: (id: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

const STORAGE_KEY = 'roadmap-progress-entries';

function generateId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `entry-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ProgressEntry[] = JSON.parse(stored);
        setEntries(parsed.sort((a, b) => b.createdAt - a.createdAt));
      }
    } catch (error) {
      console.error('Erro ao carregar progresso salvo', error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Erro ao persistir progresso', error);
    }
  }, [entries, loaded]);

  const contextValue = useMemo<ProgressContextValue>(() => ({
    entries,
    addEntry: (entry) => {
      setEntries((prev) => [{
        ...entry,
        id: generateId(),
        createdAt: Date.now()
      }, ...prev]);
    },
    updateEntry: (id, updates) => {
      setEntries((prev) => prev.map((item) => item.id === id ? { ...item, ...updates } : item));
    },
    removeEntry: (id) => {
      setEntries((prev) => prev.filter((item) => item.id !== id));
    }
  }), [entries]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress deve ser usado dentro de ProgressProvider');
  }
  return context;
}
