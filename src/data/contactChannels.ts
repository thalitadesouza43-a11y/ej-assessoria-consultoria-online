export interface ContactChannel {
  id: string;
  label: string;
  detail: string;
  href?: string;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Atendimento direto para dúvidas e início da consultoria',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    detail: 'Conteúdos diários, rotina de treinos e mensagens diretas',
  },
  {
    id: 'email',
    label: 'E-mail',
    detail: 'Contato formal, orientações e atendimento geral',
  },
];
