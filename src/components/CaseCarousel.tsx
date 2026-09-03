import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import caseFitnessAsset from "@/assets/case-fitness.png.asset.json";
import caseJuridicoAsset from "@/assets/case-juridico.png.asset.json";
import caseBeautyAsset from "@/assets/case-beauty.png.asset.json";
import casePsicologiaAsset from "@/assets/case-psicologia.png.asset.json";
import caseSaasAsset from "@/assets/case-saas.png.asset.json";
import caseGastronomiaAsset from "@/assets/case-gastronomia.png.asset.json";

type Item = {
  img: string;
  niche: string;
  title: string;
  type: string;
  desc: string;
};

const items: Item[] = [
  {
    img: caseFitnessAsset.url,
    niche: "Fitness",
    title: "FORJA STUDIO",
    type: "Landing page",
    desc: "Captação de matrículas com modalidades, planos e aula grátis.",
  },
  {
    img: caseJuridicoAsset.url,
    niche: "Jurídico",
    title: "LEXFIN ADVOCACIA",
    type: "Site institucional",
    desc: "Autoridade e áreas de atuação com formulário de consulta qualificada.",
  },
  {
    img: caseBeautyAsset.url,
    niche: "Estética",
    title: "CASA FLORA",
    type: "Site institucional",
    desc: "Clínica de estética avançada com tratamentos e agendamento online.",
  },
  {
    img: casePsicologiaAsset.url,
    niche: "Psicologia",
    title: "MARIANA LOPES",
    type: "Site institucional",
    desc: "Terapia online e presencial com agendamento de sessões.",
  },
  {
    img: caseSaasAsset.url,
    niche: "SaaS",
    title: "ÓRBITA",
    type: "Landing page",
    desc: "Painel de métricas em tempo real com trial e ativação de leads.",
  },
  {
    img: caseGastronomiaAsset.url,
    niche: "Gastronomia",
    title: "CASA DO RIVAL",
    type: "Site institucional",
    desc: "Cozinha contemporânea com menu degustação e reservas online.",
  },
];

export function CaseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const goTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 8, behavior: "smooth" });
  };

  const scrollBy = (dir: 1 | -1) => goTo(Math.min(items.length - 1, Math.max(0, active + dir)));

  // pointer drag-to-scroll (desktop)
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false, id: -1 });
  const [dragging, setDragging] = useState(false);

  const endDrag = useCallback((el: HTMLDivElement | null) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
    if (el && drag.current.id !== -1 && el.hasPointerCapture(drag.current.id)) {
      el.releasePointerCapture(drag.current.id);
    }
    drag.current.id = -1;
  }, []);

  return (
    <div className="relative">
      <div className="mb-6 hidden items-center justify-end gap-3 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Anterior"
          className="inline-flex h-11 w-11 items-center justify-center border border-border text-secondary transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Próximo"
          className="inline-flex h-11 w-11 items-center justify-center border border-border text-secondary transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-secondary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0) return;
          const el = e.currentTarget;
          drag.current = {
            down: true,
            startX: e.clientX,
            startLeft: el.scrollLeft,
            moved: false,
            id: e.pointerId,
          };
          el.setPointerCapture(e.pointerId);
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!drag.current.down) return;
          e.preventDefault();
          const el = e.currentTarget;
          const dx = e.clientX - drag.current.startX;
          if (Math.abs(dx) > 3) drag.current.moved = true;
          el.scrollLeft = drag.current.startLeft - dx;
        }}
        onPointerUp={(e) => endDrag(e.currentTarget)}
        onPointerCancel={(e) => endDrag(e.currentTarget)}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className="flex gap-4 overflow-x-auto overscroll-x-contain px-1 pb-4 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: dragging ? "none" : "x mandatory",
          scrollPaddingLeft: "0.25rem",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "pan-x pan-y pinch-zoom",
        }}
      >

        {items.map((item) => (
          <article
            key={item.title}
            className="spotlight-card corner-frame group w-[88%] shrink-0 snap-center select-none border border-border bg-card/40 backdrop-blur-xl transition-colors hover:bg-muted/40 sm:w-[60%] sm:snap-start lg:w-[38%]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
            }}
          >
            <div className="relative overflow-hidden border-b border-border">
              <img
                src={item.img}
                alt={`Mockup de ${item.type.toLowerCase()} para o nicho ${item.niche}`}
                loading="lazy"
                draggable={false}
                width={1024}
                height={768}
                className="h-44 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 sm:h-52"
              />
              <span className="absolute top-3 left-3 border border-secondary/40 bg-background/80 px-3 py-1 text-[0.6rem] tracking-[0.25em] text-secondary uppercase backdrop-blur">
                {item.niche}
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                {item.type}
              </p>
              <h3 className="mt-3 font-display text-base font-bold tracking-wide transition-all group-hover:text-primary group-hover:[text-shadow:var(--text-glow-pink)] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Anterior"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-secondary transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para ${item.title}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Próximo"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-secondary transition-colors disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 hidden items-center justify-center gap-2 md:flex">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para ${item.title}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-primary" : "w-2 bg-border hover:bg-secondary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
