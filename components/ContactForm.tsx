"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import clsx from "clsx";
import { site } from "@/lib/site";
import { getDictionary, type Lang } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const MAX_MENSAJE = 500;

type FieldName = "nombre" | "email" | "telefono" | "servicio" | "mensaje";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";
type FormText = Dictionary["form"];

const FIELDS: readonly FieldName[] = [
  "nombre",
  "telefono",
  "servicio",
  "email",
  "mensaje",
];

const EMPTY: Values = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "",
  mensaje: "",
};

const digitsOf = (value: string) => value.replace(/\D/g, "");

function validateField(
  name: FieldName,
  values: Values,
  t: FormText,
): string | undefined {
  const value = values[name].trim();
  const e = t.errors;

  switch (name) {
    case "nombre":
      if (!value) return e.nombreRequired;
      if (value.length < 2) return e.nombreShort;
      if (value.length > 60) return e.nombreLong;
      if (!/\p{L}/u.test(value)) return e.nombreInvalid;
      if (/\d/.test(value)) return e.nombreNoDigits;
      return undefined;

    case "email":
      if (!value) return undefined; // Opcional.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return e.emailInvalid;
      return undefined;

    case "telefono": {
      const digits = digitsOf(value);
      if (!digits) return e.telefonoRequired;
      if (digits.length < 10) return e.telefonoShort;
      if (digits.length > 15) return e.telefonoLong;
      return undefined;
    }

    case "servicio":
      if (!value) return e.servicioRequired;
      return undefined;

    case "mensaje":
      if (!value) return e.mensajeRequired;
      if (value.length > MAX_MENSAJE)
        return `${e.mensajeLongPrefix} ${MAX_MENSAJE} ${e.mensajeLongSuffix}`;
      return undefined;
  }
}

const inputClass =
  "w-full border bg-transparent px-4 py-3 text-cream placeholder:text-muted focus:outline-none";

const borderClass = (invalid: boolean) =>
  invalid ? "border-crimson" : "border-crimson-light focus:border-sand";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="block text-xs uppercase tracking-[0.2em] text-muted"
        >
          {label}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).form;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const sending = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  function setField(name: FieldName, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Clear an error as soon as the user fixes it, but never introduce one
    // mid-typing — that only happens on blur or submit.
    if (errors[name])
      setErrors({ ...errors, [name]: validateField(name, next, t) });
  }

  function handleBlur(name: FieldName) {
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, values, t),
    }));
  }

  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    value: values[name],
    onBlur: () => handleBlur(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    // Honeypot: bots fill hidden fields — pretend it worked.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    const found: Errors = {};
    for (const name of FIELDS) {
      const message = validateField(name, values, t);
      if (message) found[name] = message;
    }
    setErrors(found);

    const firstInvalid = FIELDS.find((name) => found[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS no está configurado — revisa .env.local.");
      setStatus("error");
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { ...values, lang },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("success");
      setValues(EMPTY);
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col justify-center border border-crimson-light p-8 text-sand"
      >
        <p className="font-display text-3xl italic text-cream">
          {t.successTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-sand"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  const mensajeLeft = MAX_MENSAJE - values.mensaje.length;

  // Enable "Enviar mensaje" only once every required field is valid. `email`
  // is optional, and validateField returns undefined for an empty email, so
  // it only blocks submission when filled in with a malformed address.
  const isComplete = FIELDS.every((name) => !validateField(name, values, t));

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex h-full flex-col justify-start space-y-6"
    >
      <Field id="nombre" label={t.nombre} error={errors.nombre}>
        <input
          {...fieldProps("nombre")}
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder={t.nombrePlaceholder}
          onChange={(e) => setField("nombre", e.target.value)}
          className={clsx(inputClass, borderClass(Boolean(errors.nombre)))}
        />
      </Field>

      <Field id="telefono" label={t.telefono} error={errors.telefono}>
        <input
          {...fieldProps("telefono")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder={t.telefonoPlaceholder}
          onChange={(e) =>
            // Allow only digits and the usual separators.
            setField("telefono", e.target.value.replace(/[^\d+()\-\s]/g, ""))
          }
          className={clsx(inputClass, borderClass(Boolean(errors.telefono)))}
        />
      </Field>

      <Field id="servicio" label={t.servicio} error={errors.servicio}>
        <select
          {...fieldProps("servicio")}
          onChange={(e) => setField("servicio", e.target.value)}
          className={clsx(
            inputClass,
            borderClass(Boolean(errors.servicio)),
            "cursor-pointer bg-noir",
            !values.servicio && "text-muted",
          )}
        >
          <option value="" disabled>
            {t.servicioPlaceholder}
          </option>
          <option value="Faciales">{t.servicioFaciales}</option>
          <option value="Masajes">{t.servicioMasajes}</option>
          <option value="Especiales">{t.servicioEspeciales}</option>
          <option value="Otro">{t.servicioOtro}</option>
        </select>
      </Field>

      <Field
        id="email"
        label={t.email}
        error={errors.email}
        hint={
          <span className="text-[10px] uppercase tracking-widest text-muted">
            {t.optional}
          </span>
        }
      >
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          maxLength={120}
          placeholder={t.emailPlaceholder}
          onChange={(e) => setField("email", e.target.value)}
          className={clsx(inputClass, borderClass(Boolean(errors.email)))}
        />
      </Field>

      <Field
        id="mensaje"
        label={t.mensaje}
        error={errors.mensaje}
        hint={
          <span
            className={clsx(
              "text-[10px] uppercase tracking-widest",
              mensajeLeft < 50 ? "text-sand" : "text-muted",
            )}
          >
            {mensajeLeft} {t.charsLeftSuffix}
          </span>
        }
      >
        <textarea
          {...fieldProps("mensaje")}
          rows={5}
          maxLength={MAX_MENSAJE}
          placeholder={t.mensajePlaceholder}
          onChange={(e) => setField("mensaje", e.target.value)}
          className={clsx(
            inputClass,
            borderClass(Boolean(errors.mensaje)),
            "resize-y",
          )}
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">No llenar</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "error" && (
          <p className="text-crimson">
            {t.errorLead}{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sand"
            >
              {t.errorWhatsApp}
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !isComplete}
        className="inline-flex items-center justify-center bg-crimson px-7 py-3 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-crimson-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
