import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import caseFitness from "@/assets/case-fitness.jpg";
import caseJuridicoAsset from "@/assets/case-juridico.png.asset.json";
import caseBeautyAsset from "@/assets/case-beauty.png.asset.json";
import caseIndustria from "@/assets/case-industria.jpg";
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
    img: caseFitness,
    niche: "Fitness",
    title: "PULSE STUDIO",
    type: "Landing page",
    desc: "Página de captação para planos de treino com agendamento direto.",
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
    img: caseIndustria,
    niche: "Indústria",
    title: "MECTRON ENGENHARIA",
    type: "Site institucional",
    desc: "Catálogo técnico, cases e canal direto com o time comercial.",
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

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
          className="inline-flex h-11 w-11 items-center justify-center border border-border text-secondary transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Próximo"
          className="inline-flex h-11 w-11 items-center justify-center border border-border text-secondary transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="spotlight-card corner-frame group w-[85%] shrink-0 snap-start border border-border bg-card/40 backdrop-blur-xl transition-colors hover:bg-muted/40 sm:w-[60%] lg:w-[38%]"
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
                width={1024}
                height={768}
                className="h-52 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 border border-secondary/40 bg-background/80 px-3 py-1 text-[0.6rem] tracking-[0.25em] text-secondary uppercase backdrop-blur">
                {item.niche}
              </span>
            </div>
            <div className="p-7">
              <p className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                {item.type}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold tracking-wide transition-all group-hover:text-primary group-hover:[text-shadow:var(--text-glow-pink)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
