export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: number
  author: Author
  categories: string[]
}

export const authors: { [key: string]: Author } = {
  rafael: {
    name: "Rafael Silva",
    avatar: "/images/team/rafael.jpg",
    bio: "Especialista em Business Intelligence com mais de 4 anos de experiência em implementação de soluções de análise de dados."
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Como implementar dashboards eficientes com Power BI",
    excerpt: "Aprenda as melhores práticas para criar dashboards que realmente agregam valor ao seu negócio.",
    content: `
      <h2>Introdução</h2>
      <p>Criar dashboards eficientes no Power BI é uma habilidade essencial para qualquer profissional de Business Intelligence. Neste artigo, vamos explorar as melhores práticas e técnicas avançadas para desenvolver visualizações que realmente impactam a tomada de decisão.</p>

      <h2>1. Planejamento e Estruturação</h2>
      <p>Antes de começar a criar suas visualizações, é fundamental:</p>
      <ul>
        <li>Identificar o público-alvo e suas necessidades</li>
        <li>Definir os KPIs principais</li>
        <li>Estabelecer a hierarquia de informações</li>
        <li>Planejar a navegação e interatividade</li>
      </ul>

      <h2>2. Design e Usabilidade</h2>
      <p>Um dashboard eficiente deve ser não apenas informativo, mas também agradável e intuitivo de usar. Considere:</p>
      <ul>
        <li>Consistência visual em cores e fontes</li>
        <li>Hierarquia clara de informações</li>
        <li>Uso apropriado de espaço em branco</li>
        <li>Responsividade para diferentes dispositivos</li>
      </ul>

      <h2>3. Performance e Otimização</h2>
      <p>Para garantir uma experiência fluida, é essencial otimizar:</p>
      <ul>
        <li>Modelo de dados</li>
        <li>Fórmulas DAX</li>
        <li>Uso de recursos visuais</li>
        <li>Atualização de dados</li>
      </ul>

      <h2>Conclusão</h2>
      <p>Implementar dashboards eficientes é um processo que requer planejamento, conhecimento técnico e foco no usuário final. Seguindo as práticas apresentadas neste artigo, você estará mais preparado para criar soluções que realmente agregam valor ao seu negócio.</p>
    `,
    image: "/images/blog/power-bi-dashboard.jpg",
    date: "2024-03-15",
    readTime: 8,
    author: authors.rafael,
    categories: ["Power BI", "Business Intelligence", "Dashboards"]
  },
  {
    id: 2,
    title: "Automatização de processos com n8n: Um guia completo",
    excerpt: "Descubra como automatizar tarefas repetitivas e aumentar a produtividade da sua equipe.",
    content: `
      <h2>Introdução</h2>
      <p>A automação de processos é uma das maneiras mais eficientes de aumentar a produtividade e reduzir erros em tarefas repetitivas. O n8n é uma ferramenta poderosa que permite criar fluxos de trabalho automatizados de forma visual e intuitiva.</p>

      <h2>1. Por que usar o n8n?</h2>
      <ul>
        <li>Código aberto e auto-hospedado</li>
        <li>Interface visual intuitiva</li>
        <li>Mais de 200 integrações prontas</li>
        <li>Possibilidade de criar nós personalizados</li>
      </ul>

      <h2>2. Casos de Uso Comuns</h2>
      <p>O n8n pode ser utilizado em diversos cenários:</p>
      <ul>
        <li>Sincronização de dados entre sistemas</li>
        <li>Automação de backups</li>
        <li>Processamento de arquivos</li>
        <li>Notificações automáticas</li>
      </ul>

      <h2>3. Implementação Passo a Passo</h2>
      <p>Para começar com o n8n:</p>
      <ol>
        <li>Instalação e configuração inicial</li>
        <li>Criação do primeiro workflow</li>
        <li>Configuração de triggers</li>
        <li>Testes e monitoramento</li>
      </ol>

      <h2>Conclusão</h2>
      <p>A automação com n8n pode transformar a maneira como sua equipe trabalha, permitindo que foquem em tarefas mais estratégicas enquanto os processos repetitivos são executados automaticamente.</p>
    `,
    image: "/images/blog/n8n-automation.jpg",
    date: "2024-03-10",
    readTime: 12,
    author: authors.rafael,
    categories: ["Automação", "n8n", "Produtividade"]
  },
  {
    id: 3,
    title: "Inteligência Artificial na análise de dados: Casos práticos",
    excerpt: "Veja como a IA está revolucionando a forma como analisamos dados empresariais.",
    content: `
      <h2>Introdução</h2>
      <p>A Inteligência Artificial está transformando a maneira como analisamos dados, permitindo insights mais profundos e previsões mais precisas. Neste artigo, exploraremos casos práticos de aplicação de IA na análise de dados empresariais.</p>

      <h2>1. Análise Preditiva</h2>
      <p>A IA permite prever tendências e comportamentos:</p>
      <ul>
        <li>Previsão de vendas</li>
        <li>Análise de churn</li>
        <li>Manutenção preditiva</li>
        <li>Detecção de fraudes</li>
      </ul>

      <h2>2. Processamento de Linguagem Natural</h2>
      <p>Aplicações práticas de NLP:</p>
      <ul>
        <li>Análise de sentimento</li>
        <li>Classificação de documentos</li>
        <li>Extração de informações</li>
        <li>Chatbots analíticos</li>
      </ul>

      <h2>3. Computer Vision</h2>
      <p>Casos de uso em visão computacional:</p>
      <ul>
        <li>Controle de qualidade</li>
        <li>Reconhecimento de padrões</li>
        <li>Análise de imagens médicas</li>
        <li>Monitoramento de segurança</li>
      </ul>

      <h2>Conclusão</h2>
      <p>A integração de IA na análise de dados não é mais um diferencial, mas uma necessidade para empresas que desejam se manter competitivas no mercado atual.</p>
    `,
    image: "/images/blog/ai-data-analysis.jpg",
    date: "2024-03-05",
    readTime: 10,
    author: authors.rafael,
    categories: ["Inteligência Artificial", "Análise de Dados", "Machine Learning"]
  }
] 