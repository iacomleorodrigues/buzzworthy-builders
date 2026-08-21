import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo-white.png.asset.json";
import mark from "@/assets/mark.png.asset.json";

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
  { n: "01", title: "Marketing & Tráfego", desc: "Estratégia, mídia paga e funis que convertem audiência em faturamento." },
  { n: "02", title: "Criação de Sites", desc: "Sites e e-commerces rápidos, responsivos e construídos para performance." },
  { n: "03", title: "Landing Pages", desc: "Páginas de alta conversão para lançamentos, captação e vendas diretas." },
  { n: "04", title: "Social Media", desc: "Conteúdo, direção de arte e gestão de redes com consistência de marca." },
  { n: "05", title: "Treinamentos", desc: "Capacitação prática para times de marketing, vendas e criação." },
  { n: "06", title: "Consultorias & Mentorias", desc: "Diagnóstico, plano de ação e acompanhamento até o resultado." },
];

const steps = [
  { k: "Diagnóstico", v: "Negócio, público e números antes de qualquer pixel." },
  { k: "Estratégia", v: "Posicionamento, oferta e canais com metas definidas." },
  { k: "Execução", v: "Design, código e conteúdo entregues em ciclos curtos." },
  { k: "Otimização", v: "Medir, testar e escalar somente o que dá retorno." },
];

function Index() {
  return (
    <div className="grain relative min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <img src={mark.url} alt="yedweb" className="h-7 w-7 object-contain" />
          <nav className="hidden items-center gap-10 text-xs tracking-[0.25em] text-muted-foreground uppercase md:flex">
            <a href="#servicos" className="transition-colors hover:text-secondary">Serviços</a>
            <a href="#processo" className="transition-colors hover:text-secondary">Processo</a>
            <a href="#contato" className="transition-colors hover:text-secondary">Contato</a>
          </nav>
          <a
            href="#contato"
            className="border border-primary px-5 py-2 text-xs tracking-[0.2em] text-primary uppercase transition-shadow hover:shadow-[var(--glow-pink)]"
          >
            Iniciar
          </a>
        </div>
      </header>

      <main>
        <section className="tunnel-grid scanlines relative overflow-hidden border-b border-border">
          <div className="relative z-[2] mx-auto max-w-6xl px-6 py-28 md:py-40">
            <p className="mb-10 text-xs tracking-[0.4em] text-secondary uppercase glow-blue">
              Agência digital · desde o primeiro pixel
            </p>
            <img
              src={logo.url}
              alt="Logotipo yedweb"
              className="mb-14 w-60 object-contain drop-shadow-[0_0_30px_oklch(0.717_0.134_227.9/35%)] md:w-80"
            />
            <h1 className="max-w-3xl font-display text-4xl leading-[1.03] font-bold tracking-tight md:text-6xl">
              Marca, site e mídia operando{" "}
              <span className="text-primary glow-pink">na mesma frequência</span>.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Presença digital completa: da estratégia à página publicada, do conteúdo diário à
              mentoria do seu time.
            </p>
            <a
              href="#contato"
              className="mt-12 inline-flex bg-primary px-8 py-4 text-sm font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[var(--glow-pink)] transition-opacity hover:opacity-90"
            >
              Solicitar proposta
            </a>
          </div>
          <div className="circuit-line absolute bottom-0 left-0 h-px w-full" aria-hidden />
        </section>

        <section id="servicos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-28">
            <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ serviços</p>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
              O que fazemos
            </h2>
            <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.n}
                  className="group relative bg-card p-9 transition-colors hover:bg-muted"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-secondary">{s.n}</span>
                  <h3 className="mt-5 font-display text-xl font-bold transition-all group-hover:text-primary group-hover:[text-shadow:var(--text-glow-pink)]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="scanlines relative border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ processo</p>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Como conduzimos{" "}
                <span className="text-secondary glow-blue">cada projeto</span>
              </h2>
            </div>
            <ol className="space-y-10">
              {steps.map((s, i) => (
                <li key={s.k} className="flex gap-8 border-b border-border pb-10 last:border-0">
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
          <div className="relative z-[2] mx-auto max-w-3xl px-6 py-32 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Vamos tirar seu projeto do papel
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Conte o que você precisa e devolvemos um plano com escopo, prazo e investimento.
            </p>
            <form className="mt-12 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                aria-label="Seu e-mail"
                className="flex-1 border border-input bg-card px-5 py-4 text-sm outline-none transition-shadow focus:border-secondary focus:shadow-[var(--glow-blue)]"
              />
              <button
                type="submit"
                className="bg-secondary px-8 py-4 text-sm font-medium tracking-[0.15em] text-secondary-foreground uppercase shadow-[var(--glow-blue)] transition-opacity hover:opacity-90"
              >
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <img src={mark.url} alt="yedweb" className="h-6 w-6 object-contain" />
          <span>© {new Date().getFullYear()} yedweb</span>
        </div>
      </footer>
    </div>
  );
}
