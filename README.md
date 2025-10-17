# Roadmap LLM Sênior

Aplicação Next.js para acompanhamento do roadmap de Arquitetura LLM.

## Funcionalidades

- Formulário para registrar o andamento de cada microtarefa com status, descrição, link e data somente leitura.
- Listagem com histórico das atualizações registradas.
- Dashboard com métricas agregadas por épico e últimas atualizações.

Os dados do progresso são persistidos no `localStorage` do navegador.

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Scripts

```bash
npm install
npm run dev
```

O comando `npm run dev` inicia a aplicação em modo de desenvolvimento na porta padrão `3000`.
