import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Roadmap LLM Sênior',
  description: 'Ferramenta interativa para acompanhar o roadmap de Arquitetura LLM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} h-full bg-gray-100 dark:bg-brand-950 text-gray-800 dark:text-gray-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
