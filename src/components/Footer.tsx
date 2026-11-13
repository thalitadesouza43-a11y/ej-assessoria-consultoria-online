import { useState } from 'react';
import { Facebook, Instagram, Mail, MessageCircle, Youtube } from 'lucide-react';
import { CONTACT_CHANNELS } from '../data/contactChannels';

interface FooterNetwork {
  id: string;
  label: string;
  Icon: typeof Instagram;
  href?: string;
}

export function Footer() {
  const [selectedPendingLabel, setSelectedPendingLabel] = useState<string | null>(null);

  const channelHref = (id: string) => CONTACT_CHANNELS.find((c) => c.id === id)?.href;

  const networks: FooterNetwork[] = [
    { id: 'instagram', label: 'Instagram', Icon: Instagram, href: channelHref('instagram') },
    { id: 'facebook', label: 'Facebook', Icon: Facebook, href: channelHref('facebook') },
    { id: 'youtube', label: 'YouTube', Icon: Youtube, href: channelHref('youtube') },
    { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, href: channelHref('whatsapp') },
    { id: 'email', label: 'E-mail', Icon: Mail, href: channelHref('email') },
  ];

  return (
    <footer className="mt-8 sm:mt-10 pt-2 pb-6 text-center">
      {/* CREF */}
      <p className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#B8C4BD] uppercase">
        CREF 037846-G/SC
      </p>

      {/* Social & Contact Icon Buttons */}
      <nav
        aria-label="Redes sociais e contato"
        className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-3"
      >
        {networks.map(({ id, label, Icon, href }) =>
          href ? (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[11px] bg-[#0D110F] border border-white/10 hover:border-[#0FA34E]/65 hover:text-[#1AC966] text-[#F5F7F6] inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E]"
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-pressed={selectedPendingLabel === label}
              onClick={() =>
                setSelectedPendingLabel((prev) => (prev === label ? null : label))
              }
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[11px] bg-[#0D110F] border inline-flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E] ${
                selectedPendingLabel === label
                  ? 'border-[#0FA34E]/75 text-[#1AC966]'
                  : 'border-white/10 hover:border-[#0FA34E]/55 hover:text-[#1AC966] text-[#F5F7F6]'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          )
        )}
      </nav>

      {selectedPendingLabel && (
        <p className="mt-2.5 text-[11px] text-[#1AC966]">
          Espaço reservado para conectar o link oficial de {selectedPendingLabel} da EJ Assessoria.
        </p>
      )}

      {/* Compact single-line closing statements */}
      <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 space-y-1.5">
        <p className="text-[9.5px] min-[400px]:text-[10.5px] sm:text-xs font-medium tracking-[0.08em] sm:tracking-[0.15em] text-[#9AA69F] uppercase whitespace-nowrap">
          DESENVOLVIMENTO COM EXCELÊNCIA E MÉTODO.
        </p>
        <p className="text-[8.5px] min-[400px]:text-[9.5px] sm:text-[11px] tracking-[0.02em] sm:tracking-[0.1em] text-[#7D8A83] uppercase whitespace-nowrap">
          © 2026 EVERTON JOHN ASSESSORIA. TODOS OS DIREITOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
}
