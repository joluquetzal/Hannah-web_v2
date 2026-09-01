"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import clsx from "clsx";
import { DatePicker } from "@/components/DatePicker";
import { servicioOptions } from "@/lib/servicioOptions";
import { fromISODate, todayISO } from "@/lib/date";
import { site } from "@/lib/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const MAX_MENSAJE = 500;

type FieldName =
  | "nombre"
  | "email"
  | "servicio"
  | "fecha"
  | "telefono"
  | "mensaje";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const FIELDS: readonly FieldName[] = [
  "nombre",
  "email",
  "servicio",
  "fecha",
  "telefono",
  "mensaje",
];

const EMPTY: Values = {
  nombre: "",
  email: "",
  servicio: "",
  fecha: "",
  telefono: "",
  mensaje: "",
};

const digitsOf = (value: string) => value.replace(/\D/g, "");

function validateField(name: FieldName, values: Values): string | undefined {
  const value = values[name].trim();

  switch (name) {
    case "nombre":
      if (!value) return "Escribe tu nombre.";
      if (value.length < 2) return "El nombre es demasiado corto.";
      if (value.length > 60) return "El nombre es demasiado largo.";
      if (!/\p{L}/u.test(value)) return "Escribe un nombre válido.";
      if (/\d/.test(value)) return "El nombre no debe llevar números.";
      return undefined;

    case "email":
      if (!value) return undefined; // Opcional.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
        return "Revisa tu correo electrónico.";
      return undefined;

    case "servicio":
      if (!value) return "Elige un servicio.";
      return undefined;

    case "fecha":
      if (!value) return "Elige una fecha.";
      if (value < todayISO()) return "La fecha no puede ser en el pasado.";
      if (fromISODate(value).getDay() === 0)
        return "Los domingos no abrimos. Elige otro día.";
      return undefined;

    case "telefono": {
      const digits = digitsOf(value);
      if (!digits) return "Escribe tu teléfono.";
      if (digits.length < 10) return "Debe tener al menos 10 dígitos.";
      if (digits.length > 15) return "Tiene demasiados dígitos.";
      return undefined;
    }

    case "mensaje":
      if (value.length > MAX_MENSAJE)
        return `Máximo ${MAX_MENSAJE} caracteres.`;
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

export function ReservationForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Resolved after mount: this is a static export, so calling todayISO()
  // during render would bake the build date into the HTML.
  const [minDate, setMinDate] = useState("");

  const sending = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMinDate(todayISO()), []);

  function setField(name: FieldName, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Clear an error as soon as the user fixes it, but never introduce one
    // mid-typing — that only happens on blur or submit.
    if (errors[name]) setErrors({ ...errors, [name]: validateField(name, next) });
  }

  function handleBlur(name: FieldName) {
    setErrors((current) => ({ ...current, [name]: validateField(name, values) }));
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
      const message = validateField(name, values);
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
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...values }, {
        publicKey: PUBLIC_KEY,
      });
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
      <div role="status" className="border border-crimson-light p-8 text-sand">
        <p className="font-display text-3xl italic text-cream">Gracias.</p>
        <p className="mt-3 text-sm leading-relaxed">
          Recibimos tu solicitud y te contactaremos pronto para confirmar tu
          cita.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-sand"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const mensajeLeft = MAX_MENSAJE - values.mensaje.length;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field id="nombre" label="Nombre" error={errors.nombre}>
        <input
          {...fieldProps("nombre")}
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder="Tu nombre completo"
          onChange={(e) => setField("nombre", e.target.value)}
          className={clsx(inputClass, borderClass(Boolean(errors.nombre)))}
        />
      </Field>

      <Field id="telefono" label="Teléfono" error={errors.telefono}>
        <input
          {...fieldProps("telefono")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder="55 1234 5678"
          onChange={(e) =>
            // Allow only digits and the usual separators.
            setField("telefono", e.target.value.replace(/[^\d+()\-\s]/g, ""))
          }
          className={clsx(inputClass, borderClass(Boolean(errors.telefono)))}
        />
      </Field>

      <Field
        id="email"
        label="Correo electrónico"
        error={errors.email}
        hint={<span className="text-[10px] uppercase tracking-widest text-muted">Opcional</span>}
      >
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          maxLength={120}
          placeholder="tu@correo.com"
          onChange={(e) => setField("email", e.target.value)}
          className={clsx(inputClass, borderClass(Boolean(errors.email)))}
        />
      </Field>

      <Field id="servicio" label="Servicio" error={errors.servicio}>
        <div className="relative">
          <select
            {...fieldProps("servicio")}
            onChange={(e) => setField("servicio", e.target.value)}
            className={clsx(
              inputClass,
              borderClass(Boolean(errors.servicio)),
              "cursor-pointer appearance-none pr-11",
              // Native dropdown lists ignore the control's colours, so the
              // options need their own or they render light-on-light.
              "[&_optgroup]:bg-noir [&_optgroup]:text-muted",
              "[&_option]:bg-noir [&_option]:text-cream",
              values.servicio ? "text-cream" : "text-muted",
            )}
          >
            <option value="">Elige un servicio</option>
            {servicioOptions.map((group) => (
              <optgroup key={group.grupo} label={group.grupo}>
                {group.opciones.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 10 6"
            className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-sand"
          >
            <path
              d="M1 1l4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Field>

      <Field
        id="fecha"
        label="Fecha preferida"
        error={errors.fecha}
        hint={
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Lun a Sáb
          </span>
        }
      >
        <DatePicker
          id="fecha"
          name="fecha"
          value={values.fecha}
          onChange={(iso) => {
            const next = { ...values, fecha: iso };
            setValues(next);
            setErrors({ ...errors, fecha: validateField("fecha", next) });
          }}
          min={minDate}
          invalid={Boolean(errors.fecha)}
          describedBy={errors.fecha ? "fecha-error" : undefined}
        />
      </Field>

      <Field
        id="mensaje"
        label="Mensaje (opcional)"
        error={errors.mensaje}
        hint={
          <span
            className={clsx(
              "text-[10px] uppercase tracking-widest",
              mensajeLeft < 50 ? "text-sand" : "text-muted",
            )}
          >
            {mensajeLeft} restantes
          </span>
        }
      >
        <textarea
          {...fieldProps("mensaje")}
          rows={4}
          maxLength={MAX_MENSAJE}
          placeholder="¿Algo que debamos saber antes de tu cita?"
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
            No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sand"
            >
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center bg-crimson px-7 py-3 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-crimson-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
