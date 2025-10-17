export type EpicId = 'mes1' | 'mes2' | 'mes3' | 'mes4' | 'mes5' | 'mes6';

export interface RoadmapCard {
  id: string;
  title: string;
  image: string;
  deadlineText: string;
  steps: string[];
}

export interface RoadmapEpic {
  id: EpicId;
  name: string;
  description: string;
  cards: RoadmapCard[];
}

export const overviewProgress = [
  { id: 'mes1', label: 'Mês 1 (RAG Fundacional)', value: 80 },
  { id: 'mes2', label: 'Mês 2 (MLOps Básico)', value: 30 },
  { id: 'mes3', label: 'Mês 3 (Agentes de IA)', value: 0 },
  { id: 'mes4-6', label: 'Mês 4 a 6 (Avançado)', value: 0 }
];

const createCardId = (epicId: EpicId, title: string) =>
  `${epicId}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '')}`;

export const roadmapEpics: RoadmapEpic[] = [
  {
    id: 'mes1',
    name: '💻 Mês 1: Fundamentos RAG e Frameworks',
    description: 'Domine a base técnica de RAG, frameworks de orquestração e vector databases.',
    cards: [
      {
        id: createCardId('mes1', 'MASTERY 1: MVP de RAG Funcional em Dev'),
        title: 'MASTERY 1: MVP de RAG Funcional em Dev',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 1',
        steps: [
          'Estudar arquitetura Transformer e instalar libs base (Hugging Face, OpenAI SDK).',
          'Entender Embeddings. Escolher e configurar um Vector DB (ChromaDB/LanceDB).',
          'Dominar o LangChain/LlamaIndex - Loaders, Retrivers, Chains.',
          'Conectar tudo, criar o pipeline RAG e testar a qualidade das respostas (sem alucinações).'
        ]
      }
    ]
  },
  {
    id: 'mes2',
    name: '🚀 Mês 2: Otimização e MLOps Básico',
    description: 'Otimização, custos e os primeiros passos de MLOps para levar o RAG a produção.',
    cards: [
      {
        id: createCardId('mes2', 'MASTERY 2: RAG Otimizado, Servido e Auditado'),
        title: 'MASTERY 2: RAG Otimizado, Servido e Auditado',
        image: 'https://images.unsplash.com/photo-1549692520-2193b2a3a0e9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 2',
        steps: [
          'Pesquisar LLMs Open Source (Llama, Mistral) e instalar Ollama.',
          'Empacotar o RAG em Docker e subir para um ambiente Cloud (Cloud Run/ECS).',
          'Implementar log e cálculo de custo por token. Estudar OWASP Top 10 para LLMs.',
          'Reforçar a segurança da API contra Prompt Injection. Documentar o processo de deployment.'
        ]
      }
    ]
  },
  {
    id: 'mes3',
    name: '🤖 Mês 3: Arquitetura de Agentes',
    description: 'Expanda o RAG para agentes autônomos com ferramentas e integrações completas.',
    cards: [
      {
        id: createCardId('mes3', 'MASTERY 3: Agente Autônomo e Integração Full-stack'),
        title: 'MASTERY 3: Agente Autônomo e Integração Full-stack',
        image: 'https://images.unsplash.com/photo-1563770701833-289b4f23a073?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 3',
        steps: [
          'Aprofundar o uso de Agentes (LangChain/LangGraph) e criação de Tools.',
          'Criar um Agente que utilize 2-3 Tools (ex: API de vendas, DB e notificação Slack).',
          'Desenvolver o Front-end em TS/React/Vue. Foco em UX (streaming de texto).',
          'Apresentar a demo do Agente para a equipe de gestão (foco no valor de negócio).'
        ]
      }
    ]
  },
  {
    id: 'mes4',
    name: '⚙️ Mês 4: Personalização (Fine-Tuning)',
    description: 'Aprofunde-se em técnicas de fine-tuning eficiente e avaliação de modelos.',
    cards: [
      {
        id: createCardId('mes4', 'MASTERY 4: Modelo SLM de Domínio Específico (Fine-Tuning)'),
        title: 'MASTERY 4: Modelo SLM de Domínio Específico (Fine-Tuning)',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc462214647?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 4',
        steps: [
          'Estudar a fundo as técnicas de Fine-tuning eficiente (LoRA/QLoRA).',
          'Coletar e limpar um dataset pequeno (1k-5k amostras) para a tarefa.',
          'Executar o processo de Fine-tuning do SLM no Cloud (Colab ou Sagemaker).',
          'Comparar a performance do SLM Fine-tuned vs. RAG vs. LLM base no seu domínio.'
        ]
      }
    ]
  },
  {
    id: 'mes5',
    name: '⚖️ Mês 5: Governança e Liderança',
    description: 'Estruture governança, segurança e mentoring para multiplicar resultados.',
    cards: [
      {
        id: createCardId('mes5', 'MASTERY 5: Plano de Governança de IA e Mentoria'),
        title: 'MASTERY 5: Plano de Governança de IA e Mentoria',
        image: 'https://images.unsplash.com/photo-1555949963-aa79d2f8319e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 5',
        steps: [
          'Estudo de Ética e Vieses em LLMs. Revisão de regulamentações (LGPD).',
          "Definir o 'Padrão de Ouro de LLM' para a equipe (ferramentas, linguagens, regras de segurança).",
          'Iniciar a Mentoria formal com Plenos, revisando código com foco em custo e arquitetura.',
          'Criar e apresentar o Plano de Governança de Dados para LLMs para a liderança.'
        ]
      }
    ]
  },
  {
    id: 'mes6',
    name: '🎯 Mês 6: Impacto Estratégico',
    description: 'Consolide entregas de alto impacto e defina os próximos passos estratégicos.',
    cards: [
      {
        id: createCardId('mes6', 'MASTERY 6: Implementação de Alto Impacto e Posicionamento'),
        title: 'MASTERY 6: Implementação de Alto Impacto e Posicionamento',
        image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
        deadlineText: 'Mês 6',
        steps: [
          'Foco no deployment final do projeto LLM de maior valor, garantindo escalabilidade e monitoramento.',
          'Documentação final da arquitetura (diagramas) e playbook de manutenção.',
          'Preparar e apresentar o Relatório de ROI do projeto para a diretoria.',
          'Autoavaliação e definição de Objetivos de IA para os Próximos 12 meses.'
        ]
      }
    ]
  }
];

export const sidebarNavigation = [
  { type: 'link', id: 'overview', href: 'overview', label: 'Visão Geral' },
  { type: 'section', label: 'Épicos (6 Meses)' },
  ...roadmapEpics.map((epic) => ({
    type: 'link' as const,
    id: epic.id,
    href: epic.id,
    label: epic.name
  })),
  { type: 'section', label: 'Ferramentas' },
  { type: 'route', id: 'progresso', href: '/progresso', label: '📋 Progresso das Microtarefas' },
  { type: 'route', id: 'dashboard', href: '/dashboard', label: '📊 Dashboard do Épico' }
] as const;

export const routeTitles: Record<string, string> = {
  overview: 'Visão Geral',
  mes1: 'Mês 1: Fundamentos RAG e Frameworks',
  mes2: 'Mês 2: Otimização e MLOps Básico',
  mes3: 'Mês 3: Arquitetura de Agentes',
  mes4: 'Mês 4: Personalização (Fine-Tuning)',
  mes5: 'Mês 5: Governança e Liderança',
  mes6: 'Mês 6: Impacto Estratégico',
  progresso: 'Progresso das Microtarefas',
  dashboard: 'Dashboard do Épico'
};

export type SidebarItem = (typeof sidebarNavigation)[number];
