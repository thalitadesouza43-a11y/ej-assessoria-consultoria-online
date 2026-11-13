import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Instagram, Mail, MessageCircle, X } from 'lucide-react';
import ejLogoDark from '../assets/images/ej_logo_dark.png';
import { CONTACT_CHANNELS, type ContactChannel } from '../data/contactChannels';

const CHANNEL_ICONS = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
} as const;

interface TopBarProps {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
}

export function TopBar({ menuOpen, onMenuOpenChange }: TopBarProps) {
  const [selectedPendingId, setSelectedPendingId] = useState<string | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      setSelectedPendingId(null);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onMenuOpenChange(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onMenuOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [menuOpen, onMenuOpenChange]);

  const handleChannelClick = (channel: ContactChannel) => {
    if (channel.href) {
      onMenuOpenChange(false);
      return;
    }
    setSelectedPendingId((prev) => (prev === channel.id ? null : channel.id));
  };

  return (
    <div ref={containerRef} className="relative z-30 w-full">
      <div className="mx-auto w-full max-w-[780px] px-5 sm:px-6">
        {/* Compact masthead row */}
        <div className="pt-3.5 pb-1.5 sm:pt-4 sm:pb-2 flex items-center justify-between">
          <a
            href="#topo"
            aria-label="EJ Assessoria — Voltar ao início"
            className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E] rounded-md"
          >
            {!logoFailed ? (
              <img
                src={ejLogoDark}
                alt="EJ Everton John — Assessoria em Treinamento Físico"
                width={1280}
                height={514}
                referrerPolicy="no-referrer"
                onError={() => setLogoFailed(true)}
                className="h-7 sm:h-8 w-auto object-contain select-none"
              />
            ) : (
              <span className="font-display text-xs sm:text-sm font-semibold tracking-wide text-[#0FA34E] whitespace-nowrap">
                EJ · Everton John
              </span>
            )}
          </a>

          <button
            type="button"
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="ej-contact-menu"
            aria-label={menuOpen ? 'Fechar opções de contato' : 'Abrir opções de contato'}
            className="inline-flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px] -my-2 -mr-3 text-white/90 hover:text-[#1AC966] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E] rounded-lg"
          >
            {menuOpen ? (
              <X className="w-[18px] h-[18px]" strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line x1="1" y1="2" x2="17" y2="2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="1" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Thin white line positioned closely beneath logo and menu with lateral margins */}
        <div className="w-full h-px bg-white/35" aria-hidden="true" />
      </div>

      {/* Minimal contact disclosure panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="ej-contact-menu"
            role="region"
            aria-label="Formas de contato"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full"
          >
            <div className="mx-auto w-full max-w-[780px] px-5 sm:px-6 pt-2 flex justify-end">
              <div className="w-full sm:w-[340px] rounded-2xl border border-white/15 bg-[#0D110F]/95 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.07]">
                  <p className="font-display text-sm font-medium text-[#F5F7F6]">
                    Fale com a EJ Assessoria
                  </p>
                  <p className="text-xs text-[#9AA69F] mt-0.5">
                    Escolha como prefere entrar em contato
                  </p>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {CONTACT_CHANNELS.map((channel) => {
                    const Icon =
                      CHANNEL_ICONS[channel.id as keyof typeof CHANNEL_ICONS] ?? MessageCircle;
                    const isPendingOpen = selectedPendingId === channel.id;

                    if (channel.href) {
                      return (
                        <a
                          key={channel.id}
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleChannelClick(channel)}
                          className="flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0FA34E]"
                        >
                          <Icon
                            className="w-4 h-4 text-[#1AC966] mt-0.5 shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <span className="block font-display text-sm font-medium text-[#F5F7F6]">
                              {channel.label}
                            </span>
                            <span className="block text-xs leading-relaxed text-[#9AA69F] mt-0.5">
                              {channel.detail}
                            </span>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <div key={channel.id}>
                        <button
                          type="button"
                          onClick={() => handleChannelClick(channel)}
                          className="w-full text-left flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0FA34E]"
                        >
                          <Icon
                            className="w-4 h-4 text-[#1AC966] mt-0.5 shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <span className="block font-display text-sm font-medium text-[#F5F7F6]">
                              {channel.label}
                            </span>
                            <span className="block text-xs leading-relaxed text-[#9AA69F] mt-0.5">
                              {channel.detail}
                            </span>
                          </div>
                        </button>
                        {isPendingOpen && (
                          <div className="px-4 pb-3.5 pl-11">
                            <p className="text-xs leading-relaxed text-[#1AC966]">
                              Espaço reservado para conectar o link oficial de {channel.label} da EJ Assessoria.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
