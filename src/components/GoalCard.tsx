import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Dumbbell, Image, Quote, Video } from 'lucide-react';
import type { ConsultancyGoal, ResultSlotKey } from '../data/consultancyGoals';
import { CONTACT_CHANNELS } from '../data/contactChannels';

interface GoalCardProps {
  goal: ConsultancyGoal;
  isExpanded: boolean;
  onToggle: () => void;
  onDiscover: () => void;
  cardRef: (node: HTMLElement | null) => void;
}

const RESULT_SLOT_META: Record<
  ResultSlotKey,
  {
    label: string;
    description: string;
    Icon: typeof Image;
  }
> = {
  fotos: {
    label: 'Fotos',
    description: 'Evolução real em imagens',
    Icon: Image,
  },
  videos: {
    label: 'Vídeos',
    description: 'Registros e treinos reais',
    Icon: Video,
  },
  depoimentos: {
    label: 'Depoimentos',
    description: 'Relatos reais de alunos',
    Icon: Quote,
  },
};

export function GoalCard({ goal, isExpanded, onToggle, onDiscover, cardRef }: GoalCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const triggerId = `goal-trigger-${goal.id}`;
  const panelId = `goal-panel-${goal.id}`;
  const whatsappHref = CONTACT_CHANNELS.find((c) => c.id === 'whatsapp')?.href;

  return (
    <article
      ref={cardRef}
      className={`relative scroll-mt-4 rounded-2xl border transition-colors duration-200 ${
        isExpanded
          ? 'bg-[#0D110F] border-[#0FA34E]/65 shadow-[0_18px_48px_-24px_rgba(15,163,78,0.34)]'
          : 'bg-[#0D110F] border-white/10 hover:border-[#0FA34E]/45'
      }`}
    >
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="group relative w-full text-left min-h-[90px] sm:min-h-[104px] flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E] focus-visible:ring-inset active:scale-[0.996] transition-transform duration-150"
      >
        {/* Subtle interior green atmospheric sheen matching image side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        >
          <div
            className={`absolute top-0 w-44 h-full transition-opacity duration-300 ${
              goal.imageSide === 'left'
                ? 'left-0 bg-[radial-gradient(ellipse_at_top_left,rgba(15,163,78,0.12),transparent_70%)]'
                : 'right-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,163,78,0.12),transparent_70%)]'
            } ${isExpanded ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`}
          />
        </div>

        {/* Card Title (aligned opposite to image side, above shadow layer) */}
        <div
          className={`relative z-30 flex-1 min-w-0 max-w-[62%] sm:max-w-[65%] ${
            goal.imageSide === 'left' ? 'ml-auto text-right pl-3' : 'pr-3'
          }`}
        >
          <h2 className="font-display text-[21px] min-[390px]:text-[22px] sm:text-[27px] font-bold leading-tight tracking-tight text-[#F8FAF9]">
            {goal.titleLines
              ? goal.titleLines.map((line, index) => (
                  <span key={index} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))
              : goal.title}
          </h2>
        </div>

        {/* Image Layer */}
        {goal.imageMode === 'inside-bottom-crop' ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden z-10 ${
              isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'
            }`}
          >
            <div
              className={`absolute top-2.5 sm:top-3 h-[88px] sm:h-[102px] flex items-start transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
                goal.imageSide === 'left'
                  ? 'left-4 sm:left-6 justify-start'
                  : 'right-4 sm:right-6 justify-end'
              }`}
            >
              {!imageFailed ? (
                <img
                  src={goal.image}
                  alt={goal.imageAlt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={() => setImageFailed(true)}
                  className="h-full w-auto object-contain object-top drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)]"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#141A17] border border-[#0FA34E]/30 flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-[#1AC966]" strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
        ) : goal.imageMode === 'inside-corner' ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden z-10 ${
              isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'
            }`}
          >
            <div
              className={`absolute -bottom-2.5 sm:-bottom-3 h-[96px] sm:h-[112px] flex items-end transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
                goal.imageSide === 'left'
                  ? 'left-0 justify-start origin-bottom-left'
                  : 'right-0 justify-end origin-bottom-right'
              }`}
            >
              {!imageFailed ? (
                <img
                  src={goal.image}
                  alt={goal.imageAlt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={() => setImageFailed(true)}
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)]"
                />
              ) : (
                <div className="mb-4 ml-4 w-12 h-12 rounded-xl bg-[#141A17] border border-[#0FA34E]/30 flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-[#1AC966]" strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 h-[112px] sm:h-[130px] z-20 flex items-end transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom group-hover:scale-[1.04] ${
              goal.imageSide === 'left'
                ? 'left-3.5 sm:left-6 justify-start'
                : 'right-3.5 sm:right-6 justify-end'
            }`}
          >
            {/* Subtle green ambient rim glow behind the athlete */}
            <div
              className="absolute inset-x-1 bottom-1 top-6 rounded-full bg-[radial-gradient(circle,rgba(15,163,78,0.2)_0%,transparent_70%)] blur-md pointer-events-none"
              aria-hidden="true"
            />
            {!imageFailed ? (
              <img
                src={goal.image}
                alt={goal.imageAlt}
                referrerPolicy="no-referrer"
                loading="eager"
                onError={() => setImageFailed(true)}
                className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_10px_18px_rgba(0,0,0,0.9)]"
              />
            ) : (
              <div className="relative z-10 mb-4 w-12 h-12 rounded-xl bg-[#141A17] border border-[#0FA34E]/30 flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-[#1AC966]" strokeWidth={1.5} />
              </div>
            )}
          </div>
        )}

        {/* Soft black bottom shadow fade for smooth edge transition without covering the title */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-11 sm:h-12 z-[25] bg-gradient-to-t from-[#090C0A] via-[#090C0A]/75 to-transparent ${
            isExpanded ? '' : 'rounded-b-2xl'
          }`}
        />
      </button>

      {/* Curtain Expansion Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.22, ease: 'easeOut' },
            }}
            className="overflow-hidden rounded-b-2xl bg-[#090C0A]"
          >
            <div className="px-5 pt-4 pb-5 sm:px-7 sm:pt-4 sm:pb-6 space-y-5">
              {/* Entenda seu objetivo */}
              <section className="space-y-2">
                <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-tight text-[#1AC966]">
                  Entenda seu objetivo
                </h3>
                <div className="space-y-2 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-[65ch]">
                  <p className="font-medium text-[#F2F6F4]">{goal.understand.lead}</p>
                  {goal.understand.paragraphs.map((text, idx) => (
                    <p key={idx} className="text-[#C2CCC6]">
                      {text}
                    </p>
                  ))}
                </div>
              </section>

              <div className="border-t border-white/[0.07]" />

              {/* Onde entra a musculação? */}
              <section className="space-y-2">
                <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-tight text-[#1AC966]">
                  Onde entra a musculação?
                </h3>
                <div className="space-y-2 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-[65ch]">
                  <p className="font-medium text-[#F2F6F4]">{goal.strengthTraining.lead}</p>
                  {goal.strengthTraining.paragraphs.map((text, idx) => (
                    <p key={idx} className="text-[#C2CCC6]">
                      {text}
                    </p>
                  ))}
                </div>
              </section>

              <div className="border-t border-white/[0.07]" />

              {/* Onde entra o treinamento aeróbico? */}
              <section className="space-y-2">
                <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-tight text-[#1AC966]">
                  Onde entra o treinamento aeróbico?
                </h3>
                <div className="space-y-2 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-[65ch]">
                  <p className="font-medium text-[#F2F6F4]">{goal.aerobicTraining.lead}</p>
                  {goal.aerobicTraining.paragraphs.map((text, idx) => (
                    <p key={idx} className="text-[#C2CCC6]">
                      {text}
                    </p>
                  ))}
                </div>
              </section>

              <div className="border-t border-white/[0.07]" />

              {/* Como trabalhamos? */}
              <section className="space-y-2.5">
                <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-tight text-[#1AC966]">
                  Como trabalhamos?
                </h3>
                <div className="space-y-2 text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-[65ch]">
                  <p className="font-medium text-[#F2F6F4]">{goal.howWeWork.lead}</p>
                  {goal.howWeWork.paragraphs.map((text, idx) => (
                    <p key={idx} className="text-[#C2CCC6]">
                      {text}
                    </p>
                  ))}
                  <p className="pt-1 pl-3 border-l-2 border-[#0FA34E] font-medium text-[#F5F7F6]">
                    {goal.howWeWork.closingQuestion}
                  </p>
                </div>
              </section>

              <div className="border-t border-white/[0.07]" />

              {/* Resultados dos nossos alunos */}
              <section className="space-y-3">
                <div className="space-y-1">
                  <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-tight text-[#F8FAF9]">
                    Resultados dos nossos alunos
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#A8B4AD] max-w-[64ch]">
                    {goal.resultsNote}
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 gap-2 sm:gap-3 ${
                    goal.resultSlots.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                  }`}
                >
                  {goal.resultSlots.map((slotKey) => {
                    const { label, description, Icon } = RESULT_SLOT_META[slotKey];
                    return (
                      <div
                        key={slotKey}
                        className="rounded-xl border border-dashed border-white/15 bg-[#0C100E]/70 px-3.5 py-2.5 sm:py-3.5 flex items-center justify-between sm:flex-col sm:items-start sm:justify-start gap-2 sm:gap-1.5"
                      >
                        <div className="flex items-center gap-2 shrink-0">
                          <Icon
                            className="w-4 h-4 text-[#1AC966]/90 shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span className="font-display text-[13px] sm:text-sm font-medium text-[#EDF2EF]">
                            {label}
                          </span>
                        </div>
                        <p className="text-[11.5px] sm:text-xs leading-snug text-[#8E9B94] text-right sm:text-left">
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* CTA & Collapse Row */}
              <div className="pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1AC966] hover:bg-[#22D972] active:scale-[0.99] text-[#05120A] font-display text-[14px] font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1AC966] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C0A]"
                  >
                    <span>{goal.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onDiscover}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1AC966] hover:bg-[#22D972] active:scale-[0.99] text-[#05120A] font-display text-[14px] font-semibold tracking-tight transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1AC966] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C0A]"
                  >
                    <span>{goal.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onToggle}
                  className="inline-flex items-center justify-center sm:justify-end min-h-[40px] px-3 text-xs font-medium text-[#A8B4AD] hover:text-[#1AC966] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA34E] rounded-lg"
                >
                  Recolher
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
