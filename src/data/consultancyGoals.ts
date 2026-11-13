import emagrecimentoImg from '../assets/images/balanca_emagrecimento_trim.png';
import hipertrofiaImg from '../assets/images/qualidade_frase_trim.png';
import definicaoImg from '../assets/images/hipertrofia_homem_trim.png';
import qualidadeVidaImg from '../assets/images/img_12_trim.png';

export interface GoalSectionContent {
  lead: string;
  paragraphs: string[];
}

export type ResultSlotKey = 'fotos' | 'videos' | 'depoimentos';

export interface ConsultancyGoal {
  id: string;
  title: string;
  titleLines?: string[];
  image: string;
  imageAlt: string;
  imageMode: 'inside-bottom-crop' | 'inside-corner' | 'pop-top';
  imageSide: 'left' | 'right';
  understand: GoalSectionContent;
  strengthTraining: GoalSectionContent;
  aerobicTraining: GoalSectionContent;
  howWeWork: {
    lead: string;
    paragraphs: string[];
    closingQuestion: string;
  };
  resultsNote: string;
  resultSlots: ResultSlotKey[];
  ctaLabel: string;
}

export const CONSULTANCY_GOALS: ConsultancyGoal[] = [
  {
    id: 'emagrecimento',
    title: 'Emagrecimento',
    image: emagrecimentoImg,
    imageAlt: 'Balança preta e prata com fita métrica verde institucional envolvida',
    imageMode: 'inside-bottom-crop',
    imageSide: 'right',
    understand: {
      lead: 'Você pode estar perdendo peso na balança, mas será que está perdendo o que realmente deseja?',
      paragraphs: [
        'Emagrecer não é apenas pesar menos. É reduzir gordura corporal, preservar seus músculos e conquistar um corpo mais saudável e condicionado.',
      ],
    },
    strengthTraining: {
      lead: 'Você sabia que emagrecer sem musculação pode comprometer seus resultados?',
      paragraphs: [
        'Durante a perda de peso, seu corpo também pode perder músculos. A musculação ajuda a preservar essa massa muscular, melhorando sua composição corporal.',
      ],
    },
    aerobicTraining: {
      lead: 'O aeróbico não serve apenas para queimar calorias.',
      paragraphs: [
        'Ele melhora seu condicionamento cardiorrespiratório, aumenta o gasto energético e prepara seu corpo para suportar esforços cada vez maiores.',
      ],
    },
    howWeWork: {
      lead: 'Seu corpo não precisa de treinos aleatórios. Precisa de uma estratégia.',
      paragraphs: [
        'Na EJ Assessoria, combinamos musculação e aeróbico em um planejamento individualizado, adaptado à sua rotina e aos seus objetivos.',
        'Acompanhamos sua evolução semanalmente e ajustamos seu treinamento conforme suas necessidades, tudo pelo nosso aplicativo próprio.',
      ],
      closingQuestion:
        'Quer descobrir como nossa metodologia pode ajudar você a emagrecer sem abrir mão dos seus músculos?',
    },
    resultsNote: 'Espaço para fotos e vídeos reais de evolução.',
    resultSlots: ['fotos', 'videos'],
    ctaLabel: 'Quero descobrir como funciona',
  },
  {
    id: 'hipertrofia',
    title: 'Hipertrofia',
    image: hipertrofiaImg,
    imageAlt: 'Braço e ombro segurando kettlebell preto posicionado no canto inferior esquerdo',
    imageMode: 'inside-corner',
    imageSide: 'left',
    understand: {
      lead: 'Você treina para ganhar massa muscular, mas será que seus músculos estão recebendo o estímulo necessário para crescer?',
      paragraphs: [
        'Ganhar músculos não é simplesmente levantar mais peso. É saber combinar intensidade, progressão e recuperação para conquistar resultados consistentes.',
      ],
    },
    strengthTraining: {
      lead: 'Você sabia que treinar pesado nem sempre significa treinar para crescer?',
      paragraphs: [
        'Para estimular a hipertrofia, seus músculos precisam receber uma tensão mecânica adequada, com cargas e níveis de esforço capazes de provocar adaptações.',
        'Mas existe um detalhe: o estímulo que funciona hoje pode não ser suficiente amanhã. Por isso, a progressão do treinamento precisa ser planejada.',
      ],
    },
    aerobicTraining: {
      lead: 'O aeróbico pode ser um aliado até mesmo para quem deseja ganhar músculos.',
      paragraphs: [
        'Um bom condicionamento cardiorrespiratório ajuda você a suportar melhor os esforços da musculação e favorece sua recuperação entre séries e treinos.',
        'O segredo está em equilibrar os estímulos para que um treinamento complemente o outro.',
      ],
    },
    howWeWork: {
      lead: 'Seus músculos não precisam de exercícios escolhidos aleatoriamente. Precisam de uma estratégia para evoluir.',
      paragraphs: [
        'Na EJ Assessoria, planejamos seus exercícios, cargas e progressões conforme seu nível e seus objetivos.',
        'Acompanhamos seu desempenho semanalmente, ajustando os estímulos para que você continue evoluindo, tudo pelo nosso aplicativo próprio.',
      ],
      closingQuestion:
        'Quer descobrir como nossa metodologia pode ajudar você a desenvolver mais massa muscular com um treinamento planejado para sua evolução?',
    },
    resultsNote: 'Espaço para fotos e vídeos reais de evolução muscular.',
    resultSlots: ['fotos', 'videos'],
    ctaLabel: 'Quero descobrir como funciona',
  },
  {
    id: 'definicao-muscular',
    title: 'Definição muscular',
    image: definicaoImg,
    imageAlt: 'Atleta masculino com halter apoiado no ombro destacando definição muscular',
    imageMode: 'pop-top',
    imageSide: 'left',
    understand: {
      lead: 'Você já conquistou massa muscular, mas sente que seus músculos ainda não estão tão aparentes quanto gostaria?',
      paragraphs: [
        'Definir o corpo não significa apenas perder peso. É reduzir gordura corporal enquanto preserva os músculos que você levou tanto tempo para construir.',
      ],
    },
    strengthTraining: {
      lead: 'Você sabia que tentar definir o corpo da maneira errada pode fazer você perder parte dos músculos que conquistou?',
      paragraphs: [
        'Durante a redução de gordura, seu organismo também pode perder massa muscular.',
        'A musculação ajuda a preservar seus músculos, mas para isso é necessário ajustar estrategicamente a intensidade, o volume e a recuperação.',
        'Afinal, de que adianta perder gordura se você também perde os músculos que deseja evidenciar?',
      ],
    },
    aerobicTraining: {
      lead: 'Fazer mais aeróbico nem sempre significa conquistar mais definição.',
      paragraphs: [
        'O treinamento aeróbico aumenta o gasto energético e melhora seu condicionamento cardiorrespiratório, contribuindo para a redução de gordura corporal.',
        'Mas o segredo está em encontrar a quantidade ideal de estímulos sem comprometer sua recuperação e sua massa muscular.',
      ],
    },
    howWeWork: {
      lead: 'Seu corpo não precisa simplesmente de mais treino. Precisa da estratégia certa para revelar os resultados que você já construiu.',
      paragraphs: [
        'Na EJ Assessoria, equilibramos musculação e treinamento aeróbico em um planejamento individualizado, considerando seu nível de treinamento e seus objetivos.',
        'Acompanhamos sua evolução semanalmente, ajustando os estímulos para favorecer a redução de gordura e a preservação muscular, tudo pelo nosso aplicativo próprio.',
      ],
      closingQuestion:
        'Quer descobrir como nossa metodologia pode ajudar você a conquistar mais definição sem sacrificar os músculos que já desenvolveu?',
    },
    resultsNote: 'Espaço para fotos e vídeos reais de evolução e definição muscular.',
    resultSlots: ['fotos', 'videos'],
    ctaLabel: 'Quero descobrir como funciona',
  },
  {
    id: 'qualidade-de-vida',
    title: 'Qualidade de vida',
    titleLines: ['Qualidade', 'de vida'],
    image: qualidadeVidaImg,
    imageAlt: 'Aplicativo da EJ Assessoria com funcionalidades de treino e acompanhamento e treinador Everton John',
    imageMode: 'pop-top',
    imageSide: 'right',
    understand: {
      lead: 'Você já parou para pensar se seu corpo estará preparado para fazer, daqui a 10 ou 20 anos, tudo o que você consegue fazer hoje?',
      paragraphs: [
        'Qualidade de vida não é apenas viver mais. É ter força, disposição e independência para aproveitar cada fase da vida sem que seu corpo se torne uma limitação.',
      ],
    },
    strengthTraining: {
      lead: 'Você sabia que perder força muscular pode comprometer sua independência com o passar dos anos?',
      paragraphs: [
        'Atividades simples, como levantar de uma cadeira, subir escadas ou carregar compras, dependem da sua força muscular.',
        'A musculação ajuda a preservar essa capacidade e a combater a perda de massa e força muscular associada ao envelhecimento.',
        'Afinal, o objetivo não é apenas viver mais, mas continuar fazendo aquilo de que você gosta.',
      ],
    },
    aerobicTraining: {
      lead: 'Você pode ser uma pessoa ativa e, ainda assim, ter um condicionamento cardiorrespiratório abaixo do ideal.',
      paragraphs: [
        'Caminhar e se movimentar são importantes, mas nem sempre oferecem estímulos suficientes para melhorar seu condicionamento.',
        'O treinamento aeróbico planejado desenvolve sua capacidade cardiorrespiratória, proporcionando mais resistência e disposição para enfrentar os desafios do dia a dia.',
      ],
    },
    howWeWork: {
      lead: 'Seu corpo precisa estar preparado não apenas para as exigências de hoje, mas também para as do futuro.',
      paragraphs: [
        'Na EJ Assessoria, combinamos musculação e treinamento aeróbico em um planejamento individualizado, respeitando suas condições físicas, limitações e objetivos.',
        'Acompanhamos sua evolução semanalmente, ajustando os estímulos para desenvolver força, condicionamento e autonomia, tudo pelo nosso aplicativo próprio.',
      ],
      closingQuestion:
        'Quer descobrir como nossa metodologia pode ajudar você a conquistar mais disposição hoje e preservar sua independência para o futuro?',
    },
    resultsNote: 'Espaço para fotos, vídeos e depoimentos reais de evolução.',
    resultSlots: ['fotos', 'videos', 'depoimentos'],
    ctaLabel: 'Quero descobrir como funciona',
  },
];
