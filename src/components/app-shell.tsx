'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { routeTitles, sidebarNavigation, SidebarItem } from '@/data/roadmap';
import { classNames } from '@/lib/utils';

interface AppShellProps {
  pageTitle: string;
  breadcrumb: string;
  children: React.ReactNode;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className="relative inline-flex items-center justify-center h-10 w-10 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400"
      aria-label="Alternar tema"
    >
      <svg
        className={classNames('w-5 h-5', theme === 'dark' ? 'hidden' : 'block')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        className={classNames('w-5 h-5', theme === 'dark' ? 'block' : 'hidden')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}

function CurrentDateTime() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short'
      });
      setNow(formatter.format(new Date()).replace(' às', ','));
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;
  return <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">{now}</span>;
}

function SidebarLink({
  item,
  active,
  onNavigate,
}: {
  item: SidebarItem;
  active: boolean;
  onNavigate?: (item: SidebarItem) => void;
}) {
  const pathname = usePathname();

  if (item.type === 'section') {
    return (
      <li className="pt-3">
        <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {item.label}
        </p>
      </li>
    );
  }

  const baseClasses = 'navlink block px-3 py-2 transition-colors duration-200 hover:bg-gray-200/60 dark:hover:bg-white/10 rounded';
  const activeClasses = 'bg-brand-500 text-white dark:bg-brand-500 font-bold';

  if (item.type === 'route') {
    const isActive = pathname === item.href;
    return (
      <li>
        <Link
          href={item.href}
          className={classNames(baseClasses, isActive && activeClasses)}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={classNames(baseClasses, active && activeClasses, 'w-full text-left')}
        onClick={() => {
          onNavigate?.(item);
        }}
      >
        {item.label}
      </button>
    </li>
  );
}

export function AppShell({
  pageTitle,
  breadcrumb,
  children,
  activeSection,
  onNavigateSection,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo(() => sidebarNavigation, []);

  const handleNavigate = (item: SidebarItem) => {
    if (item.type === 'link') {
      if (onNavigateSection) {
        onNavigateSection(item.id);
        if (typeof window !== 'undefined') {
          const section = document.getElementById(item.id);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else if (typeof window !== 'undefined') {
        window.location.href = `/#${item.id}`;
      }
      setMobileMenuOpen(false);
    } else if (item.type === 'route') {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex">
      <aside
        className={classNames(
          'md:flex flex-col w-72 shrink-0 border-r border-gray-200/80 dark:border-white/10 bg-white/50 dark:bg-gray-900/40 backdrop-blur-md',
          mobileMenuOpen ? 'flex fixed inset-y-0 left-0 z-40' : 'hidden md:flex'
        )}
      >
        <div className="p-5 border-b border-gray-200/80 dark:border-white/10">
          <h1 className="text-xl font-extrabold tracking-tight">ROADMAP LLM SÊNIOR</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Transição para Arquiteto de IA</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Navegação
          </p>
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <SidebarLink
                key={`${item.type}-${index}`}
                item={item}
                active={item.type === 'link' && activeSection === item.id}
                onNavigate={handleNavigate}
              />
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200/80 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
          <p>Atualize semanalmente • Foco na próxima microtarefa</p>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-gray-100/80 dark:bg-brand-950/70 backdrop-blur-md border-b border-gray-200/80 dark:border-white/10">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5"
                aria-label="Abrir menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight">{pageTitle}</h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Você está em: <span className="font-medium text-gray-700 dark:text-gray-300">{breadcrumb}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CurrentDateTime />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="flex-1 px-4 md:px-6 py-6">{children}</div>
      </main>
    </div>
  );
}

export function useRouteTitle(routeId: string) {
  return routeTitles[routeId] ?? 'Visão Geral';
}
