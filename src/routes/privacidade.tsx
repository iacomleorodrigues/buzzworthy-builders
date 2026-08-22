import { createFileRoute, Link } from "@tanstack/react-router";
import mark from "@/assets/mark.png.asset.json";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — yedweb" },
      {
        name: "description",
        content:
          "Política de Privacidade da yedweb. Entenda como coletamos, usamos e protegemos suas informações.",
      },
      { property: "og:title", content: "Política de Privacidade — yedweb" },
      {
        property: "og:description",
        content: "Como a yedweb trata dados e privacidade dos usuários.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="grain relative min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/">
            <img src={mark.url} alt="yedweb" className="h-14 w-14 object-contain" />
          </Link>
          <Link
            to="/"
            className="border border-primary px-5 py-2 text-xs tracking-[0.2em] text-primary uppercase transition-shadow hover:shadow-[var(--glow-pink)]"
          >
            Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs tracking-[0.4em] text-secondary uppercase">/ legal</p>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Política de Privacidade
        </h1>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              1. Coleta de informações
            </h2>
            <p className="mt-3">
              Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e
              detalhes sobre o seu projeto, quando preenche formulários de contato ou solicita uma
              proposta. Também coletamos dados técnicos automaticamente, como endereço IP, tipo de
              navegador e páginas visitadas, para melhorar a experiência do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              2. Uso das informações
            </h2>
            <p className="mt-3">
              Usamos seus dados para responder às suas solicitações, enviar propostas, prestar nossos
              serviços e comunicar novidades relevantes. Também utilizamos dados de navegação para
              análise de desempenho, segurança e otimização do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              3. Compartilhamento
            </h2>
            <p className="mt-3">
              Não vendemos seus dados. Podemos compartilhá-los apenas com prestadores de serviço que
              nos ajudam a operar o site e entregar projetos (hospedagem, e-mail, analytics), sempre
              sob obrigação de confidencialidade e proteção de dados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              4. Seus direitos
            </h2>
            <p className="mt-3">
              Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados a
              qualquer momento. Para isso, envie um e-mail para{" "}
              <a
                href="mailto:contato@yedweb.com.br"
                className="text-secondary underline underline-offset-4 transition-colors hover:text-primary"
              >
                contato@yedweb.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              5. Segurança
            </h2>
            <p className="mt-3">
              Adotamos medidas técnicas e organizacionais para proteger suas informações contra
              acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema é
              totalmente seguro, e não podemos garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
              6. Alterações nesta política
            </h2>
            <p className="mt-3">
              Podemos atualizar esta política periodicamente. A data da última revisão será sempre
              indicada ao final desta página. Recomendamos que você a consulte regularmente.
            </p>
          </section>

          <p className="pt-4 text-xs text-muted-foreground">
            Última atualização: agosto de 2026.
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <Link to="/">
            <img src={mark.url} alt="yedweb" className="h-14 w-14 object-contain" />
          </Link>
          <span>© {new Date().getFullYear()} yedweb · Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
}
