import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import heroAcompanhamentoImg from './assets/images/hero_acompanhamento.png';
import { GoalCard } from './components/GoalCard';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { CONSULTANCY_GOALS } from './data/consultancyGoals';

export default function App() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleDiscoverClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setContactMenuOpen(true);
  }, []);

  useEffect(() => {
    if (expandedId === null) return;

    const timer = window.setTimeout(() => {
      const targetEl = cardRefs.current[expandedId];
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      if (rect.top < 16 || rect.top > window.innerHeight * 0.65) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 390);

    return () => window.clearTimeout(timer);
  }, [expandedId]);

  return (
    <MotionConfig reducedMotion="user">
      <div id="topo" className="relative min-h-screen bg-[#060807] text-[#F5F7F6] overflow-x-clip">
        <TopBar menuOpen={contactMenuOpen} onMenuOpenChange={setContactMenuOpen} />

        {/* Hero Image placed immediately below the menu line with full composition */}
        <header className="relative mx-auto w-full max-w-[480px] sm:max-w-[460px] overflow-hidden">
          <h1 className="sr-only">Conheça nossa consultoria online!</h1>
          <div className="relative w-full">
            <img
              src={heroAcompanhamentoImg}
              alt="Conheça nossa consultoria online — EJ Assessoria"
              width={554}
              height={800}
              loading="eager"
              decoding="async"
              className="block w-full h-auto object-contain select-none"
            />
            {/* Seamless blends into #060807 page background without cropping any content */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#060807] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#060807] via-[#060807]/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#060807] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#060807] to-transparent"
            />
          </div>
        </header>

        <main className="relative mx-auto w-full max-w-[780px] px-5 pt-2 pb-8 sm:px-6 sm:pt-4 sm:pb-12">
          {/* Four Vertical Rectangular Objective Cards */}
          <section aria-label="Objetivos da consultoria online" className="flex flex-col gap-6 sm:gap-7">
            {CONSULTANCY_GOALS.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                isExpanded={expandedId === goal.id}
                onToggle={() => handleToggle(goal.id)}
                onDiscover={handleDiscoverClick}
                cardRef={(node) => {
                  cardRefs.current[goal.id] = node;
                }}
              />
            ))}
          </section>

          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}
