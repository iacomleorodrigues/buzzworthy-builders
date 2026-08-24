import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome." })
    .max(100, { message: "Máximo de 100 caracteres." }),
  contato: z
    .string()
    .trim()
    .min(8, { message: "Informe um WhatsApp ou e-mail válido." })
    .max(120, { message: "Máximo de 120 caracteres." })
    .refine(
      (v) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v) || v.replace(/\D/g, "").length >= 10,
      { message: "Informe um WhatsApp (com DDD) ou e-mail válido." },
    ),
  projeto: z.string().min(1, { message: "Selecione o tipo de projeto." }),
  mensagem: z
    .string()
    .trim()
    .min(10, { message: "Conte em uma frase o que você precisa." })
    .max(1000, { message: "Máximo de 1000 caracteres." }),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

const projetos = [
  "Marketing & Tráfego",
  "Criação de Sites",
  "Landing Pages",
  "Social Media",
  "Treinamentos",
  "Consultorias & Mentorias",
  "Ainda não sei",
];

const fieldClass =
  "w-full border border-input bg-card px-5 py-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-secondary focus:shadow-[var(--glow-blue)]";

const WHATSAPP_NUMBER = "5511987983553";

function buildWhatsAppMessage(data: Fields) {
  return encodeURIComponent(
    `Olá! Meu nome é ${data.nome}.\n` +
      `Contato: ${data.contato}\n` +
      `Tipo de projeto: ${data.projeto}\n\n` +
      `Mensagem:\n${data.mensagem}\n\n` +
      `Gostaria de solicitar uma proposta.`
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const result = schema.safeParse(data);

    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSent(true);

    const message = buildWhatsAppMessage(result.data);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  if (sent) {
    return (
      <div
        role="status"
        className="corner-frame border border-secondary bg-card p-10 text-left"
      >
        <p className="text-xs tracking-[0.35em] text-secondary uppercase glow-blue">
          / mensagem recebida
        </p>
        <h3 className="mt-5 font-display text-2xl font-bold">Sinal captado.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Retornamos em até 1 dia útil com os próximos passos. Se preferir acelerar, chame no
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="neon-btn mt-8 border border-primary px-6 py-3 text-xs tracking-[0.2em] text-primary uppercase"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="corner-frame grid gap-5 border border-border bg-card/60 p-6 text-left backdrop-blur-sm sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-xs tracking-[0.25em] text-secondary uppercase">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            maxLength={100}
            placeholder="Como te chamamos"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "erro-nome" : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          {errors.nome && (
            <p id="erro-nome" className="mt-2 text-xs text-destructive">
              {errors.nome}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contato" className="text-xs tracking-[0.25em] text-secondary uppercase">
            WhatsApp ou e-mail
          </label>
          <input
            id="contato"
            name="contato"
            maxLength={120}
            placeholder="(00) 00000-0000"
            aria-invalid={!!errors.contato}
            aria-describedby={errors.contato ? "erro-contato" : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          {errors.contato && (
            <p id="erro-contato" className="mt-2 text-xs text-destructive">
              {errors.contato}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projeto" className="text-xs tracking-[0.25em] text-secondary uppercase">
          Tipo de projeto
        </label>
        <select
          id="projeto"
          name="projeto"
          defaultValue=""
          aria-invalid={!!errors.projeto}
          aria-describedby={errors.projeto ? "erro-projeto" : undefined}
          className={`mt-3 ${fieldClass}`}
        >
          <option value="" disabled>
            Selecione
          </option>
          {projetos.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.projeto && (
          <p id="erro-projeto" className="mt-2 text-xs text-destructive">
            {errors.projeto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensagem" className="text-xs tracking-[0.25em] text-secondary uppercase">
          O que você precisa
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          maxLength={1000}
          placeholder="Contexto do negócio, objetivo e prazo."
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
          className={`mt-3 resize-y ${fieldClass}`}
        />
        {errors.mensagem && (
          <p id="erro-mensagem" className="mt-2 text-xs text-destructive">
            {errors.mensagem}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="neon-btn inline-flex flex-1 items-center justify-center bg-primary px-8 py-4 text-sm font-medium tracking-[0.15em] text-primary-foreground uppercase shadow-[var(--glow-pink)]"
        >
          Solicitar proposta
        </button>
        <a
          href="https://wa.me/5511987983553"
          target="_blank"
          rel="noopener noreferrer"
          className="neon-btn inline-flex items-center justify-center border border-secondary px-8 py-4 text-sm font-medium tracking-[0.15em] text-secondary uppercase"
        >
          Falar no WhatsApp
        </a>
      </div>

      <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
        Resposta em até 1 dia útil · sem compromisso · seus dados não são compartilhados
      </p>
    </form>
  );
}
