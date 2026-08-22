import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/yw.png.asset.json";
import mark from "@/assets/mark.png.asset.json";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { ContactForm } from "@/components/ContactForm";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "yedweb — Agência de Marketing, Sites e Treinamentos" },
      {
        name: "description",
        content:
          "yedweb: criação de sites e landing pages, social media, marketing, treinamentos, consultorias e mentorias. Estratégia e design de alta performance.",
      },
      { property: "og:title", content: "yedweb — Agência Digital" },
      {
        property: "og:description",
        content:
          "Sites, landing pages, social media, treinamentos, consultorias e mentorias com estética futurista e execução técnica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Marketing & Tráfego",
    desc: "Estratégia, mídia paga e funis construídos sobre dados, não sobre achismo.",
    benefit: "Mais leads qualificados chegando toda semana — com custo por venda sob controle.",
  },
  {
    n: "02",
    title: "Criação de Sites",
    desc: "Sites e e-commerces rápidos, responsivos e feitos sob medida.",
    benefit: "Um site que vende enquanto você dorme e sustenta o preço que você cobra.",
  },
  {
    n: "03",
    title: "Landing Pages",
    desc: "Páginas cirúrgicas para lançamentos, captação e vendas diretas.",
    benefit: "Cada real investido em tráfego cai numa página feita para converter.",
  },
  {
    n: "04",
    title: "Social Media",
    desc: "Conteúdo, direção de arte e gestão de redes com consistência de marca.",
    benefit: "Sua marca vira referência no feed — e lembrada na hora da decisão.",
  },
  {
    n: "05",
    title: "Treinamentos",
    desc: "Capacitação prática para times de marketing, vendas e criação.",
    benefit: "Seu time executa sozinho, mais rápido e sem depender de terceiros.",
  },
  {
    n: "06",
    title: "Consultorias & Mentorias",
    desc: "Diagnóstico, plano de ação e acompanhamento até o resultado.",
    benefit: "Clareza para decidir onde investir e parar de queimar orçamento.",
  },
];

const steps = [
  { k: "Diagnóstico", v: "Negócio, público e números antes de qualquer pixel." },
  { k: "Estratégia", v: "Posicionamento, oferta e canais com metas definidas." },
  { k: "Execução", v: "Design, código e conteúdo entregues em ciclos curtos." },
  { k: "Otimização", v: "Medir, testar e escalar somente o que dá retorno." },
];

const metrics = [
  { v: "+137", k: "Projetos entregues" },
  { v: "+83%", k: "Aumento médio de conversão" },
  { v: "07", k: "Anos de estrada" },
  { v: "[SUBSTITUIR]", k: "Clientes ativos" },
];

const testimonials = [
  { quote: "[SUBSTITUIR — depoimento do cliente]", name: "[SUBSTITUIR — nome]", role: "[SUBSTITUIR — cargo / empresa]" },
  { quote: "[SUBSTITUIR — depoimento do cliente]", name: "[SUBSTITUIR — nome]", role: "[SUBSTITUIR — cargo / empresa]" },
  { quote: "[SUBSTITUIR — depoimento do cliente]", name: "[SUBSTITUIR — nome]", role: "[SUBSTITUIR — cargo / empresa]" },
];

const clientLogos = ["[LOGO 1]", "[LOGO 2]", "[LOGO 3]", "[LOGO 4]", "[LOGO 5]"];


function Index() {
  const revealRoot = useRevealOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#servicos", label: "Serviços" },
    { href: "#processo", label: "Processo" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <div
      ref={revealRoot}
      className="grain relative min-h-screen bg-background font-sans text-foreground antialiased"
    >
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block">
            <img src={mark.url} alt="yedweb" className="h-14 w-14 object-contain" />
          </a>
          <nav className="hidden items-center gap-10 text-xs tracking-[0.25em] text-muted-foreground uppercase md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-secondary">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="neon-btn hidden border border-primary px-5 py-2 text-xs tracking-[0.2em] text-primary uppercase md:inline-flex"
            >
              Solicitar proposta
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label="Abrir menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-border text-secondary md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="menu-mobile"
            className="border-t border-border bg-background md:hidden"
            aria-label="Navegação principal"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border px-6 py-4 text-xs tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-secondary"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="tunnel-grid scanlines relative overflow-hidden border-b border-border">
          <div className="relative z-[2] mx-auto max-w-6xl px-6 py-24 md:py-40">
            <p
              data-reveal
              className="reveal mb-8 inline-flex items-center gap-3 border border-secondary/40 px-4 py-2 text-[0.65rem] tracking-[0.35em] text-secondary uppercase glow-blue"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-secondary" aria-hidden />
              Agência digital · high tech, low bullshit
            </p>
            <img
              src={logo.url}
              alt="Logotipo yedweb"
              width={320}
              height={96}
              fetchPriority="high"
              className="mb-12 w-52 object-contain md:w-80"
            />
            <h1
              data-reveal
              className="reveal max-w-3xl font-display text-[2.1rem] leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Marca, site e mídia operando{" "}
              <span className="text-primary glow-pink">na mesma frequência</span>.
            </h1>
            <p
              data-reveal
              className="reveal mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Presença digital construída para atrair mais clientes e aumentar seu faturamento — da
              estratégia à página publicada, sem improviso e sem discurso vazio.
            </p>
            <div data-reveal className="reveal mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contato"
                className="neon-btn inline-flex items-center justify-center bg-primary px-8 py-4 text-sm font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[var(--glow-pink)]"
              >
                Solicitar proposta
              </a>
              <a
                href="#servicos"
                className="neon-btn inline-flex items-center justify-center border border-secondary px-8 py-4 text-sm font-medium tracking-[0.15em] text-secondary uppercase"
              >
                Ver serviços
              </a>
            </div>
            <div data-reveal className="reveal hand-rule mt-14 max-w-md" aria-hidden />
            <p className="mt-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Resposta em até 1 dia útil · sem compromisso
            </p>
          </div>
          <div className="circuit-line absolute bottom-0 left-0 h-px w-full" aria-hidden />
        </section>

        {/* Prova social — logos + números */}
        <section className="border-b border-border" aria-label="Prova social">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-center text-xs tracking-[0.35em] text-muted-foreground uppercase">
              Marcas que já operam na mesma frequência
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {clientLogos.map((l) => (
                <li
                  key={l}
                  data-reveal
                  className="reveal border border-dashed border-border px-6 py-4 text-xs tracking-[0.25em] text-muted-foreground uppercase"
                >
                  {l} [SUBSTITUIR]
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.k} data-reveal className="reveal bg-card px-8 py-10 text-center">
                  <p className="font-display text-2xl font-bold text-primary glow-pink md:text-3xl">
                    {m.v}
                  </p>
                  <p className="mt-3 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                    {m.k}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-28">
            <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ serviços</p>
            <h2
              data-reveal
              className="reveal mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl"
            >
              O que fazemos
            </h2>
            <p data-reveal className="reveal mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Seis frentes que se conectam. Você contrata a peça que falta ou a operação inteira.
            </p>
            <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.n}
                  data-reveal
                  className="reveal group relative overflow-hidden bg-card p-9 transition-colors hover:bg-muted"
                >
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary shadow-[var(--glow-pink)] transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                  <span className="font-display text-xs tracking-[0.3em] text-secondary">{s.n}</span>
                  <h3 className="mt-5 font-display text-xl font-bold transition-all group-hover:text-primary group-hover:[text-shadow:var(--text-glow-pink)]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <p className="mt-5 border-l-2 border-secondary pl-4 text-sm leading-relaxed text-foreground/90">
                    {s.benefit}
                  </p>
                  <span className="mt-6 inline-block text-xs tracking-[0.25em] text-secondary uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    → falar sobre isso
                  </span>
                </article>
              ))}
            </div>

            <div data-reveal className="reveal mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#contato"
                className="neon-btn inline-flex items-center justify-center bg-primary px-8 py-4 text-sm font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[var(--glow-pink)]"
              >
                Quero um plano para o meu negócio
              </a>
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Diagnóstico inicial sem custo
              </span>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="scanlines relative border-b border-border" aria-label="Depoimentos">
          <div className="relative z-[2] mx-auto max-w-6xl px-6 py-24">
            <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ depoimentos</p>
            <h2
              data-reveal
              className="reveal mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl"
            >
              Quem já trabalhou com a gente
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  data-reveal
                  className="reveal corner-frame border border-border bg-card p-8 transition-colors hover:bg-muted"
                >
                  <blockquote className="text-sm leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-5">
                    <p className="font-display text-sm font-bold text-primary">{t.name}</p>
                    <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {t.role}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="relative border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ processo</p>
              <h2
                data-reveal
                className="reveal mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl"
              >
                Como conduzimos{" "}
                <span className="text-secondary glow-blue">cada projeto</span>
              </h2>
              <div className="hand-rule mt-10 max-w-xs" aria-hidden />
              <a
                href="#contato"
                className="neon-btn mt-10 inline-flex items-center justify-center border border-primary px-7 py-4 text-sm font-medium tracking-[0.15em] text-primary uppercase"
              >
                Começar pelo diagnóstico
              </a>
            </div>
            <ol className="space-y-10">
              {steps.map((s, i) => (
                <li
                  key={s.k}
                  data-reveal
                  className="reveal flex gap-8 border-b border-border pb-10 last:border-0"
                >
                  <span className="font-display text-2xl font-bold text-primary glow-pink">
                    {`0${i + 1}`}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-wide uppercase">{s.k}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contato" className="tunnel-grid relative overflow-hidden">
          <div className="relative z-[2] mx-auto max-w-3xl px-6 py-28 md:py-32">
            <div className="text-center">
              <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ contato</p>
              <h2
                data-reveal
                className="reveal mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl"
              >
                Vamos tirar seu projeto{" "}
                <span className="text-primary glow-pink">do papel</span>
              </h2>
              <p data-reveal className="reveal mt-6 leading-relaxed text-muted-foreground">
                Cada mês sem uma operação digital afiada é faturamento indo para o concorrente.
                Abrimos poucas vagas por mês para começar projetos — conte o que você precisa e
                devolvemos um plano com escopo, prazo e investimento.
              </p>
            </div>
            <div data-reveal className="reveal mt-12">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
        <a
          href="#contato"
          className="neon-btn flex items-center justify-center bg-primary px-6 py-3.5 text-sm font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[var(--glow-pink)]"
        >
          Solicitar proposta
        </a>
      </div>


      <footer className="border-t border-border pb-20 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <Link to="/">
            <img src={mark.url} alt="yedweb" className="h-6 w-6 object-contain" />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <Link
              to="/privacidade"
              className="transition-colors hover:text-secondary"
            >
              Política de Privacidade
            </Link>
            <a
              href="https://www.instagram.com/yedwebhub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-secondary px-4 py-2 text-secondary transition-shadow hover:shadow-[var(--glow-blue)]"
              aria-label="Instagram yedweb"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>

          <span className="text-center text-xs tracking-[0.15em] text-muted-foreground">
            © {new Date().getFullYear()} yedweb · Todos os direitos reservados
          </span>
        </div>
      </footer>

    </div>
  );
}
