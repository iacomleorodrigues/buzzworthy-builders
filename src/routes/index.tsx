import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo-white.png.asset.json";
import mark from "@/assets/mark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "yed web — Agência de Marketing, Sites e Treinamentos" },
      {
        name: "description",
        content:
          "Agência yed web: criação de sites e landing pages, social media, tráfego, treinamentos, consultorias e mentorias para marcas que querem crescer.",
      },
      { property: "og:title", content: "yed web — Agência de Marketing Digital" },
      {
        property: "og:description",
        content:
          "Sites, landing pages, social media, treinamentos, consultorias e mentorias. Estratégia e design que geram resultado.",
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
    desc: "Estratégia, campanhas pagas e funis que transformam audiência em faturamento.",
  },
  {
    n: "02",
    title: "Criação de Sites",
    desc: "Sites institucionais e e-commerces rápidos, responsivos e feitos para converter.",
  },
  {
    n: "03",
    title: "Landing Pages",
    desc: "Páginas de alta conversão para lançamentos, captação e vendas diretas.",
  },
  {
    n: "04",
    title: "Social Media",
    desc: "Conteúdo, identidade visual e gestão de redes com consistência de marca.",
  },
  {
    n: "05",
    title: "Treinamentos",
    desc: "Capacitação prática para times de marketing, vendas e criação.",
  },
  {
    n: "06",
    title: "Consultorias & Mentorias",
    desc: "Diagnóstico, plano de ação e acompanhamento próximo até o resultado.",
  },
];

const steps = [
  { k: "Diagnóstico", v: "Entendemos negócio, público e números antes de qualquer pixel." },
  { k: "Estratégia", v: "Definimos posicionamento, oferta e canais com metas claras." },
  { k: "Execução", v: "Design, código e conteúdo entregues em ciclos curtos." },
  { k: "Otimização", v: "Medimos, testamos e escalamos o que dá retorno." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img src={mark.url} alt="yed web" className="h-8 w-8 object-contain" />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#servicos" className="transition-colors hover:text-foreground">
              Serviços
            </a>
            <a href="#processo" className="transition-colors hover:text-foreground">
              Processo
            </a>
            <a href="#contato" className="transition-colors hover:text-foreground">
              Contato
            </a>
          </nav>
          <a
            href="#contato"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Falar com a gente
          </a>
        </div>
      </header>

      <main>
        <section className="surface-grid relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
            <img
              src={logo.url}
              alt="Logotipo yed web"
              className="mb-12 w-64 object-contain md:w-80"
            />
            <h1 className="max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">
              Marca, site e mídia trabalhando <span className="text-gradient-brand">na mesma direção</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Somos a agência que cuida da presença digital inteira: da estratégia à página
              publicada, do conteúdo diário à mentoria do seu time.
            </p>
            <a
              href="#contato"
              className="mt-10 inline-flex rounded-sm bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-[var(--glow-pink)] transition-opacity hover:opacity-90"
            >
              Solicitar proposta
            </a>
          </div>
        </section>

        <section id="servicos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              O que fazemos
            </h2>
            <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
              {services.map((s) => (
                <article key={s.n} className="group bg-card p-8 transition-colors hover:bg-muted">
                  <span className="font-display text-sm text-accent">{s.n}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[1fr_1.3fr]">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Como conduzimos <span className="text-gradient-brand">cada projeto</span>
            </h2>
            <ol className="space-y-8">
              {steps.map((s, i) => (
                <li key={s.k} className="flex gap-6 border-b border-border pb-8 last:border-0">
                  <span className="font-display text-2xl text-primary">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{s.k}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -bottom-48 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Vamos tirar seu projeto do papel
            </h2>
            <p className="mt-5 text-muted-foreground">
              Conte o que você precisa e devolvemos um plano com escopo, prazo e investimento.
            </p>
            <form
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="seu@email.com"
                aria-label="Seu e-mail"
                className="flex-1 rounded-sm border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring"
              />
              <button
                type="submit"
                className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[var(--glow-blue)] transition-opacity hover:opacity-90"
              >
                Quero uma proposta
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <img src={mark.url} alt="yed web" className="h-6 w-6 object-contain" />
          <span>© {new Date().getFullYear()} yed web</span>
        </div>
      </footer>
    </div>
  );
}
